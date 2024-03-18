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
};

export type User = {
  _id: string;
  username: string;
  password: string;
};

export type Category = "Drikkelek" | "Barnelek" | "Navnelek";

export type Rating = {
  rating: number;
  author?: User;
}