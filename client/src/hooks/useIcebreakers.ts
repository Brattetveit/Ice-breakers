import { Icebreaker } from "@/types";
import { useEffect, useState } from "react";
import { fetchIcebreakers } from "@/services/icebreakers";

export const useIcebreakers = () => {
  const [icebreakers, setIcebreakers] = useState<Icebreaker[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getIcebreakers();
  }, []);

  const getIcebreakers = () => {
    setIsLoading(true);

    fetchIcebreakers()
      .then((array) => array.sort(() => Math.random() - 0.5))
      .then(setIcebreakers)
      .then(() => setIsLoading(false));
  };

  return { isLoading, icebreakers, getIcebreakers };
};
