export const addToFavorites = async (userId: string, icebreakerId: string) => {
  const response = await fetch(`/api/users/${userId}/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ icebreakerId }),
  });

  if (!response.ok) {
    throw new Error("failed to add icebreaker");
  }

  return await response.json();
};
