const vertex = `#version 300 es
void main(){
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2))*2.0-1.0;
  gl_Position = vec4(p,0,1);
}`;
const fragment = `#version 300 es
precision highp float;
uniform vec2 resolution;
uniform float time, seed, darkMode;
uniform vec2 pointer, pointerVelocity;
uniform float pointerEnergy;
out vec4 colour;
const vec3 bone = vec3(235,231,224)/255.0;
const vec3 ink = vec3(24,23,21)/255.0;
const vec3 red = vec3(205,71,76)/255.0;

float surface(vec2 p){
  // Broad folded sheets, with slow domain deformation rather than water rings.
  float t = time*0.075 + seed*0.09;
  p += vec2(sin(p.y*1.8+t),cos(p.x*1.4-t))*0.6;
  float fold = p.x*2.7 + p.y*1.5 + sin(p.y*2.0-p.x*0.65+t)*1.9;
  return sin(fold)*0.62 + sin(fold*1.72 + p.y*1.3)*0.22 + cos(p.y*2.8-p.x+t)*0.20;
}
float jelly(vec2 uv){
  float aspect = resolution.x/resolution.y;
  vec2 q = (uv-pointer)*vec2(aspect,1.0);
  vec2 motion = pointerVelocity*vec2(aspect,1.0);
  float speed = clamp(length(motion)*10.0,0.0,1.0);
  vec2 direction = normalize(motion+vec2(0.0001,0.0));
  vec2 side = vec2(-direction.y,direction.x);
  vec2 local = vec2(dot(q,direction),dot(q,side));
  local.x *= mix(1.0,0.58,speed);
  float d = dot(local,local);
  float core = exp(-d*54.0);
  float shoulder = exp(-d*18.0);
  return pointerEnergy*(shoulder*0.105-core*0.205);
}
float heightAt(vec2 uv){
  vec2 p = (uv-vec2(0.73,0.49))*vec2(resolution.x/resolution.y,1.0)*3.3;
  return surface(p)+jelly(uv);
}
void main(){
  vec2 uv = gl_FragCoord.xy/resolution;
  // Screen-space derivatives keep interaction continuous at every canvas size.
  float stepY = 1.5/resolution.y;
  vec2 e = vec2(stepY*resolution.y/resolution.x,stepY);
  vec2 slope = vec2(heightAt(uv+vec2(e.x,0))-heightAt(uv-vec2(e.x,0)),
                    heightAt(uv+vec2(0,e.y))-heightAt(uv-vec2(0,e.y)))/(2.0*stepY*3.3);
  vec3 normal = normalize(vec3(-slope*0.9,1.0));
  vec3 reflection = reflect(vec3(0,0,-1),normal);
  // A warm studio environment: broad light card, thin softbox, dark flags.
  float card = smoothstep(-0.2,0.5,reflection.y+reflection.x*0.32);
  float strip = exp(-pow((reflection.x+reflection.y*0.48-0.15)*9.0,2.0));
  float rim = pow(1.0-max(normal.z,0.0),3.0);
  float tone = clamp(0.04 + card*0.64 + strip*0.72 + rim*0.20,0.0,1.0);
  tone = mix(tone,pow(tone,1.35)*0.68,darkMode);
  vec3 metal = mix(ink,bone,tone);
  float redCard = exp(-pow((reflection.x-reflection.y*0.25+0.64)*5.5,2.0));
  metal = mix(metal,red,redCard*0.58);
  colour = vec4(metal,1.0);
}`;

export async function mount(canvas, options = {}) {
  const gl = canvas.getContext('webgl2',{alpha:false,antialias:false,powerPreference:'high-performance'});
  if (!gl) return null;
  const shaders = [], programs = [];
  function compile(type, source) {
    const shader = gl.createShader(type); shaders.push(shader);
    gl.shaderSource(shader,source); gl.compileShader(shader);
    if (!gl.getShaderParameter(shader,gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader));
    return shader;
  }
  let program;
  try {
    program = gl.createProgram(); programs.push(program);
    gl.attachShader(program,compile(gl.VERTEX_SHADER,vertex));
    gl.attachShader(program,compile(gl.FRAGMENT_SHADER,fragment)); gl.linkProgram(program);
    if (!gl.getProgramParameter(program,gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
  } catch (error) {
    shaders.forEach(s=>gl.deleteShader(s)); programs.forEach(p=>gl.deleteProgram(p));
    console.warn('LUFI material unavailable:',error.message); return null;
  }
  shaders.forEach(s=>gl.deleteShader(s));
  const vao = gl.createVertexArray(); gl.bindVertexArray(vao); gl.useProgram(program);
  const uniforms = Object.fromEntries(['resolution','time','seed','darkMode','pointer','pointerVelocity','pointerEnergy'].map(n=>[n,gl.getUniformLocation(program,n)]));
  let running = false, destroyed = false, raf = 0, last = 0, time = 0;
  let rect, previousX = null, previousY = null;
  let targetX = 2, targetY = 2, pointerX = 2, pointerY = 2;
  let velocityX = 0, velocityY = 0, pointerEnergy = 0, inside = false;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  function draw() {
    if (destroyed || gl.isContextLost()) return;
    gl.viewport(0,0,canvas.width,canvas.height);
    gl.uniform2f(uniforms.resolution,canvas.width,canvas.height);
    gl.uniform1f(uniforms.time,time);
    gl.uniform1f(uniforms.seed,options.seed || 12);
    gl.uniform1f(uniforms.darkMode,options.dark ? 1 : 0);
    gl.uniform2f(uniforms.pointer,pointerX,pointerY);
    gl.uniform2f(uniforms.pointerVelocity,velocityX,velocityY);
    gl.uniform1f(uniforms.pointerEnergy,pointerEnergy);
    gl.drawArrays(gl.TRIANGLES,0,3);
  }
  function measure() {
    rect = canvas.getBoundingClientRect();
    const scale = Math.min(devicePixelRatio || 1,options.cap || 1.5,1920/Math.max(1,rect.width));
    canvas.width = Math.max(1,Math.round(rect.width*scale));
    canvas.height = Math.max(1,Math.round(rect.height*scale)); draw();
  }
  function loop(now) {
    if (!running) return;
    raf = requestAnimationFrame(loop);
    const frameInterval = 1000 / (options.fps || 60);
    if (now-last<frameInterval-1) return;
    const dt = Math.min((now-last)/1000,1/30); last = now;
    if (!motion.matches) {
      const follow = 1-Math.exp(-dt*13);
      const settle = 1-Math.exp(-dt*8);
      pointerX += (targetX-pointerX)*follow;
      pointerY += (targetY-pointerY)*follow;
      pointerEnergy += ((inside ? 1 : 0)-pointerEnergy)*settle;
      velocityX *= Math.exp(-dt*7);
      velocityY *= Math.exp(-dt*7);
      time+=dt; draw();
    }
  }
  function move(event) {
    if (!running || motion.matches || event.pointerType!=='mouse') return;
    const x=(event.clientX-rect.left)/rect.width, y=1-(event.clientY-rect.top)/rect.height;
    if (x<0 || x>1 || y<0 || y>1) { inside=false; previousX=null; return; }
    if (previousX!==null) {
      velocityX += Math.max(-0.08,Math.min(0.08,x-previousX));
      velocityY += Math.max(-0.08,Math.min(0.08,y-previousY));
    }
    targetX=x; targetY=y; inside=true;
    previousX=x; previousY=y;
  }
  function leave() { inside=false; previousX=null; }
  const scroller = document.querySelector('.reel');
  function position() { rect=canvas.getBoundingClientRect(); inside=false; previousX=null; }
  function stop() { running=false; cancelAnimationFrame(raf); inside=false; previousX=null; }
  function lost(event) { event.preventDefault(); stop(); canvas.parentElement.classList.remove('is-live'); }
  const resize = new ResizeObserver(measure); resize.observe(canvas); measure();
  if (options.pointer) {
    addEventListener('pointermove',move,{passive:true});
    document.documentElement.addEventListener('pointerleave',leave,{passive:true});
  }
  scroller?.addEventListener('scroll',position,{passive:true});
  canvas.addEventListener('webglcontextlost',lost);
  return {
    once:draw,
    start() { if (!running && !destroyed) { position(); running=true; last=performance.now(); raf=requestAnimationFrame(loop); } },
    stop,
    destroy() {
      stop(); destroyed=true; resize.disconnect(); removeEventListener('pointermove',move);
      document.documentElement.removeEventListener('pointerleave',leave);
      scroller?.removeEventListener('scroll',position); canvas.removeEventListener('webglcontextlost',lost);
      gl.deleteVertexArray(vao); gl.deleteProgram(program);
    },
  };
}
