import { Icebreaker } from "@/types";
import { useState } from "react";
import { fetchIcebreakers } from "@/services/icebreakers";

export const useGetIcebreakers = () => {
  const [icebreakers, setIcebreakers] = useState<Icebreaker[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getIcebreakers = () => {
    setIsLoading(true);

    fetchIcebreakers()
      .then((array) => array.sort(() => Math.random() - 0.5))
      .then(setIcebreakers)
      .then(() => setIsLoading(false));
  };

  const getIcebreakersByCategory = (category: string) => {
    setIsLoading(true);

    fetchIcebreakers()
      .then((array: Icebreaker[]) =>
        array.filter((icebreaker) => icebreaker.category === category),
      )
      .then((array) => array.sort(() => Math.random() - 0.5))
      .then(setIcebreakers)
      .then(() => setIsLoading(false));
  };

  return { isLoading, icebreakers, getIcebreakers, getIcebreakersByCategory };
};
