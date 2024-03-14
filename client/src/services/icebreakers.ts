export const fetchIcebreakers = async () => {
  const response = await fetch("api/icebreakers");
  const { data } = await response.json();
  return data;
};

export const addRating = async (name: string, rating: number) => {
  const response = await fetch("/api/icebreakers/rating/" + name, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ rating }),
  });
  const { ratings } = await response.json();
  return ratings as number[];
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