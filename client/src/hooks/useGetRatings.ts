import { fetchRatings } from "@/services/icebreakers";
import { Rating } from "@/types"
import { useState } from "react"


export const useGetRatings = (name: string) => {
  const [ratings, setRatings] = useState<Rating[]>([]);

  const getRatings = () => {
    fetchRatings(name).then(setRatings);
  }

  return {ratings, getRatings};
}