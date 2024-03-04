export const fetchIcebreakers = async () => {
  const response = await fetch("api/icebreakers");
  const { data } = await response.json();
  return data;
};

export const addRating = async (name: string, rating: number) => {
  const response = await fetch("/api/icebreakers/rating/" + name, {
    method: "POST",
    body: JSON.stringify({ rating }),
  });
  const { ratings } = await response.json();
  return ratings as number[];
};
