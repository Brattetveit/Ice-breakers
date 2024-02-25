export type Icebreaker = {
  _id: string;
  name: string;
  fullDescription: string;
  shortDescription: string;
  author?: User;
  category?: Category;
  feedback?: string[];
  rating?: number;
  visibleToOthers?: boolean;
  imageName?: string;
};

export type User = {
  _id: string;
  username: string;
  password: string;
};

export type Category = "Drikkelek" | "Barnelek" | "Navnelek";
