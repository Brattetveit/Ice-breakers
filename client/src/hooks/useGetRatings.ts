import { fetchRatings } from "@/services/icebreakers";
import { Rating } from "@/types"
import { useCallback, useState } from "react"

export const useGetRatings = (name: string) => {
  const [ratings, setRatings] = useState<Rating[]>([]);

  const getRatings:() => void = useCallback(() => {
    fetchRatings(name).then(setRatings);
  }, [name])

  return {ratings, getRatings};
}