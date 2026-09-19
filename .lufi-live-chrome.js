async function e(e,t={}){let n=e.getContext(`webgl2`,{alpha:!1,antialias:!1,powerPreference:`high-performance`});if(!n)return null;let r=[],i=[];function a(e,t){let i=n.createShader(e);if(r.push(i),n.shaderSource(i,t),n.compileShader(i),!n.getShaderParameter(i,n.COMPILE_STATUS))throw Error(n.getShaderInfoLog(i));return i}let o;try{if(o=n.createProgram(),i.push(o),n.attachShader(o,a(n.VERTEX_SHADER,`#version 300 es
void main(){
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2))*2.0-1.0;
  gl_Position = vec4(p,0,1);
}`)),n.attachShader(o,a(n.FRAGMENT_SHADER,`#version 300 es
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
}`)),n.linkProgram(o),!n.getProgramParameter(o,n.LINK_STATUS))throw Error(n.getProgramInfoLog(o))}catch(e){return r.forEach(e=>n.deleteShader(e)),i.forEach(e=>n.deleteProgram(e)),console.warn(`LUFI material unavailable:`,e.message),null}r.forEach(e=>n.deleteShader(e));let s=n.createVertexArray();n.bindVertexArray(s),n.useProgram(o);let c=Object.fromEntries([`resolution`,`time`,`seed`,`darkMode`,`pointer`,`pointerVelocity`,`pointerEnergy`].map(e=>[e,n.getUniformLocation(o,e)])),l=!1,u=!1,d=0,f=0,p=0,m,h=null,g=null,_=2,v=2,y=2,b=2,x=0,S=0,C=0,w=!1,T=matchMedia(`(prefers-reduced-motion: reduce)`);function E(){u||n.isContextLost()||(n.viewport(0,0,e.width,e.height),n.uniform2f(c.resolution,e.width,e.height),n.uniform1f(c.time,p),n.uniform1f(c.seed,t.seed||12),n.uniform1f(c.darkMode,+!!t.dark),n.uniform2f(c.pointer,y,b),n.uniform2f(c.pointerVelocity,x,S),n.uniform1f(c.pointerEnergy,C),n.drawArrays(n.TRIANGLES,0,3))}function D(){m=e.getBoundingClientRect();let n=Math.min(devicePixelRatio||1,t.cap||1.5,1920/Math.max(1,m.width));e.width=Math.max(1,Math.round(m.width*n)),e.height=Math.max(1,Math.round(m.height*n)),E()}function O(e){if(!l)return;d=requestAnimationFrame(O);let n=1e3/(t.fps||60);if(e-f<n-1)return;let r=Math.min((e-f)/1e3,1/30);if(f=e,!T.matches){let e=1-Math.exp(-r*13),t=1-Math.exp(-r*8);y+=(_-y)*e,b+=(v-b)*e,C+=(+!!w-C)*t,x*=Math.exp(-r*7),S*=Math.exp(-r*7),p+=r,E()}}function k(e){if(!l||T.matches||e.pointerType!==`mouse`)return;let t=(e.clientX-m.left)/m.width,n=1-(e.clientY-m.top)/m.height;if(t<0||t>1||n<0||n>1){w=!1,h=null;return}h!==null&&(x+=Math.max(-.08,Math.min(.08,t-h)),S+=Math.max(-.08,Math.min(.08,n-g))),_=t,v=n,w=!0,h=t,g=n}function A(){w=!1,h=null}let j=document.querySelector(`.reel`);function M(){m=e.getBoundingClientRect(),w=!1,h=null}function N(){l=!1,cancelAnimationFrame(d),w=!1,h=null}function P(t){t.preventDefault(),N(),e.parentElement.classList.remove(`is-live`)}let F=new ResizeObserver(D);return F.observe(e),D(),t.pointer&&(addEventListener(`pointermove`,k,{passive:!0}),document.documentElement.addEventListener(`pointerleave`,A,{passive:!0})),j?.addEventListener(`scroll`,M,{passive:!0}),e.addEventListener(`webglcontextlost`,P),{once:E,start(){!l&&!u&&(M(),l=!0,f=performance.now(),d=requestAnimationFrame(O))},stop:N,destroy(){N(),u=!0,F.disconnect(),removeEventListener(`pointermove`,k),document.documentElement.removeEventListener(`pointerleave`,A),j?.removeEventListener(`scroll`,M),e.removeEventListener(`webglcontextlost`,P),n.deleteVertexArray(s),n.deleteProgram(o)}}}export{e as mount};