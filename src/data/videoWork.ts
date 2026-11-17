export interface VideoWork {
  id: string;
  vimeoId?: string;
  driveId?: string;
  indexLabel: string;
  title: string;
  category: string;
  shareUrl?: string;
  poster?: string;
  aspectRatio?: string;
}

export const videoWorks: VideoWork[] = [
  {
    id: 'film-01',
    vimeoId: '1247513133',
    indexLabel: '01',
    title: 'Nipuna & Sandunila Wedding Shoot',
    category: 'Film & Motion',
    shareUrl: 'https://vimeo.com/1247513133',
    aspectRatio: '16/9',
  },
];
