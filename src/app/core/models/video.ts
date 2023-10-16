export interface Video {
  id: string;
  title: string;
  createdDate: string;
  author: Author;
  previewUrl: string;
  description?: string;
  url?: string;
}

export interface Author {
  id: string;
  name: string;
  pictureUrl: string;
}

export interface Reaction {
  id: string;
  videoId: string;
  author: Author;
  imageUrl?: string;
  postedDate: string;
  timeframe: string;
  type: ReactionType;
}

export enum ReactionType {
  STAR = 'star',
  SNAP = 'snapshot',
}
