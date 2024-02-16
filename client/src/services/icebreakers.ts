export const fetchIcebreakers = async (searchQuery?: string) => {
  let url = "/api/icebreakers";
  if (searchQuery) {
    url += `?name=${encodeURIComponent(searchQuery)}`;
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    throw new Error(
      `Failed to fetch icebreakers: ${data.message || "server error"}`,
    );
  }
};
