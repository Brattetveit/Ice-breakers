import { Icebreaker } from "@/types";
import { useEffect, useState } from "react";
import { useGetRatings } from "@/hooks/useGetRatings";
import { addRating } from "@/services/icebreakers";

export const useRating = (icebreaker: Icebreaker) => {
  const { ratings, getRatings } = useGetRatings(icebreaker.name);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getRatings(), []);

  const [meanRating, setMeanRating] = useState<number>(0);

  useEffect(() => {
    if (ratings && ratings.length > 0) {
      const calculateMean = () => {
        const ratingValues = ratings.map((r) => r.rating);
        const total = ratingValues.reduce((acc, value) => acc + value, 0);
        return total / ratingValues.length;
      };
      setMeanRating(calculateMean());
    }
  }, [ratings]);

  const submitRating = async (username: string, rating: number) => {
    const newRatings = await addRating(icebreaker.name, username, rating);
    if (newRatings && newRatings.length > 0) {
      const ratingValues = newRatings.map((r) => r.rating);
      const total = ratingValues.reduce((acc, value) => acc + value, 0);
      setMeanRating(total / ratingValues.length);
    }
  };

  return { meanRating, submitRating };
};
