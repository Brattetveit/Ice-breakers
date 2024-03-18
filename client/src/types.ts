export type Icebreaker = {
  _id: string;
  name: string;
  fullDescription: string;
  shortDescription: string;
  author?: User;
  category?: Category;
  feedback?: string[];
  ratings: number[];
  visibleToOthers?: boolean;
  imageName?: string;
};

export type User = {
  _id: string;
  username: string;
  password: string;
  favorites: Icebreaker[];
  createdIcebreakers: Icebreaker[];
  queue: Icebreaker[];
};

export type Category = "Drikkelek" | "Barnelek" | "Navnelek";
