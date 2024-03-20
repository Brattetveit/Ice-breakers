import { fetchFeedback } from "@/services/feedbackService";
import { Feedback } from "@/types";
import { useCallback, useState } from "react"


export const useGetFeedback = (name: string) => {
  const [comments, setComments] = useState<Feedback[]>([]);

  const getComments: () => void = useCallback(() =>{
    fetchFeedback(name).then(setComments);
  }, [name]) 

  return { comments, getComments };
}