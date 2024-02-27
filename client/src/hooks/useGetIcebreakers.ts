import { Icebreaker, User } from "@/types";
import { useState } from "react";
import { fetchIcebreakers } from "@/services/icebreakers";

export const useGetIcebreakers = () => {
  const [icebreakers, setIcebreakers] = useState<Icebreaker[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getIcebreakers = (author?: User) => {
    setIsLoading(true);

    fetchIcebreakers(author)
      .then(setIcebreakers)
      .then(() => setIsLoading(false));
  };

  return { isLoading, icebreakers, getIcebreakers };
};
