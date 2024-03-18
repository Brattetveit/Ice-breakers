export const addToFavorites = async (userId: string, icebreakerId: string) => {
  const response = await fetch(`/api/users/${userId}/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ icebreakerId }),
  });

  if (!response.ok) {
    throw new Error("Failed to add icebreaker to favorites");
  }

  const contentType = response.headers.get("Content-Type");
  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  } else {
    return await response.text();
  }
};
export const fetchFavorites = async (userId: string) => {
  const response = await fetch(`/api/users/${userId}/favorites`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch favorites");
  }
  return await response.json();
};

export const fetchCreatedIcebreakers = async (userId: string) => {
  const response = await fetch(`/api/icebreakers/createdby/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch created icebreakers");
  }
  return await response.json();
};
