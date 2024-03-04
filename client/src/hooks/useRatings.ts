import { Icebreaker } from "@/types";
import { useState } from "react";

import { addRating } from "@/services/icebreakers";

export const useRatings = (icebreaker: Icebreaker) => {
  const calculateMean = (ratings: number[]) =>
    ratings.reduce((acc: number, value: number) => acc + value, 0) /
    ratings.length;

  const [meanRating, setMeanRating] = useState<number>(
    calculateMean(icebreaker.ratings),
  );

  const submitRating = async (rating: number) => {
    const newRatings = await addRating(icebreaker.name, rating);
    setMeanRating(calculateMean(newRatings));
  };

  return { meanRating, submitRating };
};
