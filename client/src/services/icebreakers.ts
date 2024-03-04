import { type User } from "@/types";

export const fetchIcebreakers = async (author: User | null) => {
  const response = await fetch("api/icebreakers", {
    body: JSON.stringify(author?.username),
  });
  const { data } = await response.json();
  return data;
};
