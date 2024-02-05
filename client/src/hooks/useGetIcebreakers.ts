import { useState } from "react";
import { fetchIcebreakers } from "@/api/fetchIcebreakers";

export type Icebreaker = {
  name: string;
};

export const useGetIcebreakers = () => {
  const [icebreakers, setIcebreakers] = useState<Icebreaker[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getIcebreakers = () => {
    setIsLoading(false);

    fetchIcebreakers()
      .then(setIcebreakers)
      .then(() => setIsLoading(false));
  };

  return { isLoading, icebreakers, getIcebreakers };
};
