import { fetchFeedback } from "@/services/feedbackService";
import { Feedback } from "@/types";
import { useState } from "react"


export const useGetFeedback = (name: string) => {
  const [comments, setComments] = useState<Feedback[]>([]);

  const getComments = () => {
    fetchFeedback(name).then(setComments);
  }

  return { comments, getComments };
}