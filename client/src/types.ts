export type Icebreaker = {
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
  username: string;
  password: string;
};

export type Category = "Drikkelek" | "Barnelek" | "Navnelek";
