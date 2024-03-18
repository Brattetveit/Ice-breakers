import { Rating } from "@/types";

export const fetchIcebreakers = async () => {
  const response = await fetch("api/icebreakers");
  const { data } = await response.json();
  return data;
};

// export const addRating = async (name: string, username: string, rating: number) => {
//   const response = await fetch("/api/icebreakers/rating/" + name, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ username, rating }),
//   });
//   const { ratings } = await response.json();
//   return ratings as Record<string, number>;
// };

export const fetchRatings = async (name: string) => {
  const response = await fetch("/api/rating/" + name);
  const { data } = await response.json();
  return data;
}


export const deleteRating = async (name: string, username: string) => {
  try {
    const response = await fetch(`/api/rating/` + name + '/' + username, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete rating');
    }

    console.log('Rating deleted successfully');
  } catch (error) {
    console.error('Error deleting rating:', (error as Error).message);
    throw error;
  }
};


export const addRating = async (name: string, username: string, rating: number) => {
    const newRating = {
      rating: rating,
      author: username
    }
    const response = await fetch("/api/rating/" + name, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRating),
      });
      const { ratings } = await response.json();
      console.log(ratings);
      return ratings as Rating[];
};

export const addComment = async (name: string, comment: string) => {
  const response = await fetch("/api/feedback" + name, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({comment})
  });
  const { feedback } = await response.json();
  return feedback
}

// export const deleteComment 