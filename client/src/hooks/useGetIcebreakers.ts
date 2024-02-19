import { Icebreaker } from "@/types";
import { useState } from "react";
import { fetchIcebreakers } from "@/services/icebreakers";

export const useGetIcebreakers = () => {
  const [icebreakers, setIcebreakers] = useState<Icebreaker[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getIcebreakers = (searchQuery: string) => {
    setIsLoading(false);

    fetchIcebreakers(searchQuery)
      .then((response) => {
        if (response && Array.isArray(response.data)) {
          setIcebreakers(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching icebreakers:", error);
      })
      .finally(() => setIsLoading(false));
  };

  return { isLoading, icebreakers, getIcebreakers };
};
