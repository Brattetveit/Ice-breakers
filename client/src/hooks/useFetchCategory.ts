import { type Icebreaker } from "@/types";
import { useState } from "react";

export const useFetchCategories = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Icebreaker[][]>([]);

  const getCategories = (categories: string[]) => {
    setIsLoading(true);

    categories.forEach((category) => {
      fetch(`/api/icebreakers/${category}`)
        .then((response) => response.json())
        .then((data) => setCategories([...categories, data]))
        .catch((error) => console.error(error));
    });

    setIsLoading(false);
  };

  return { isLoading, categories, getCategories };
};
