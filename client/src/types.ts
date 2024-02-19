export type Icebreaker = {
  name: string;
  fullDescription: string;
  shortDescription: string;
  author?: User;
  category?: string[];
  feedback?: string[];
  rating?: number;
  visableToOthers?: boolean;
  imageName?: string;
};

export type User = {
  username: string;
  password: string;
};
