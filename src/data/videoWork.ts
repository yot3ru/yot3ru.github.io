export interface VideoWork {
  id: string;
  driveId: string;
  indexLabel: string;
  title: string;
  category: string;
  shareUrl: string;
  /** Custom thumbnail image path inside public/ (e.g. '/img/video-01.webp'). */
  poster?: string;
  aspectRatio?: string;
}

export const videoWorks: VideoWork[] = [
  {
    id: 'film-01',
    driveId: '1quG_j_0v03WwZILPrykimz3aSu3JG_sE',
    indexLabel: '01',
    title: 'Film study 01',
    category: 'Film & Motion',
    shareUrl: 'https://drive.google.com/file/d/1quG_j_0v03WwZILPrykimz3aSu3JG_sE/view?usp=sharing',
    poster: '/img/studio-launch-film.webp',
    aspectRatio: '16/9',
  },
  {
    id: 'film-02',
    driveId: '1ad6eMKvH7QZPrKfCBc0AQnkQEufhCQJl',
    indexLabel: '02',
    title: 'Film study 02',
    category: 'Film & Motion',
    shareUrl: 'https://drive.google.com/file/d/1ad6eMKvH7QZPrKfCBc0AQnkQEufhCQJl/view?usp=sharing',
    poster: '/img/lufi-material-hero.webp',
    aspectRatio: '16/9',
  },
];
