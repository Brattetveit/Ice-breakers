import { Icebreaker } from "@/types";
import { useState } from "react";
import { fetchIcebreakers } from "@/services/icebreakers";

export const useGetIcebreakers = () => {
  const [icebreakers, setIcebreakers] = useState<Icebreaker[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getIcebreakers = (userId?: string) => {
    setIsLoading(true);

    fetchIcebreakers(userId)
      .then(setIcebreakers)
      .then(() => setIsLoading(false));
  };

  return { isLoading, icebreakers, getIcebreakers };
};
