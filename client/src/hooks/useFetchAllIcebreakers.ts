import { type Icebreaker } from "@/types";
import { useState } from "react";

export const useFetchAllIcebreakers = () => {
  const [icebreakers, setIcebreakers] = useState<Icebreaker[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getIcebreakers = () => {
    setIsLoading(false);

    fetch("/api/icebreakers")
      .then((response) => response.json())
      .then(setIcebreakers)
      .then(() => setIsLoading(false));
  };

  return { isLoading, icebreakers, getIcebreakers };
};
