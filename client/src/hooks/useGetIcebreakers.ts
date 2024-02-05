import { useState } from "react";
import { fetchIcebreakers } from "@/api/fetchIcebreakers";

type Icebreaker = {
  name: string;
};

export const useGetIcebreakers = () => {
  const [iceBreakers, setIceBreakers] = useState<Icebreaker[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getIcebreakers = () => {
    setIsLoading(true);

    fetchIcebreakers()
      .then(setIceBreakers)
      .then(() => setIsLoading(false));
  };

  return { isLoading, iceBreakers, getIcebreakers };
};
