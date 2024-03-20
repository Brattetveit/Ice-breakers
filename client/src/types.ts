export type Icebreaker = {
  _id: string;
  name: string;
  fullDescription: string;
  shortDescription: string;
  author?: User;
  category?: Category;
  feedback?: string[];
  ratings: Rating[];
  visibleToOthers?: boolean;
  imageName?: string;
  defaultTime?: number;
};

export type User = {
  _id: string;
  username: string;
  password: string;
  favorites: Icebreaker[];
  createdIcebreakers: Icebreaker[];
  queue: Icebreaker[];
  role: string;
};

export type Category = "Drikkelek" | "Barnelek" | "Navnelek";

export type Rating = {
  rating: number;
  author?: User;
};

export type Feedback = {
  _id: string;
  comment: string;
  author?: User;
};
