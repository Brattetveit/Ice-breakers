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
  try {
    const response = await fetch('/api/icebreakers/rating/' + name);
    console.log(response);
    if (!response.ok) {
      throw new Error('Failed to fetch ratings');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching ratings:', (error as Error).message);
    throw error;
  }
}

export const deleteRating = async (name: string) => {
  try {
    const response = await fetch(`/api/icebreakers/rating/` + name, {
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
  const ratings = fetchRatings(name);
  if (Object.values(ratings).includes(username)){
    await deleteRating(name);
  }
  const response = await fetch("/api/icebreakers/rating/" + name, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, rating }),
      });
      const { updatedRatings } = await response.json();
      return updatedRatings.data as number[];
};
