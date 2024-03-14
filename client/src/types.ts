export type Icebreaker = {
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
  username: string;
  password: string;
  favorites: Icebreaker[];
};

export type Category = "Drikkelek" | "Barnelek" | "Navnelek";
