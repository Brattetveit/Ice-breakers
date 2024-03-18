export const fetchReportedIcebreakers = async () => {
  const response = await fetch("api/icebreakers/reported", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch reported icebreakers");
  }
  return await response.json();
};

export const deleteIcebreaker = async (icebreakerId: string) => {
  const response = await fetch(`api/icebreakers/${icebreakerId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete icebreaker");
  }
  return response.text();
};

export const clearIcebreakerReports = async (icebreakerId: string) => {
  const response = await fetch(
    `api/icebreakers/${icebreakerId}/clear-reports`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  if (!response.ok) {
    throw new Error("Failed to clear icebreaker reports");
  }
  return response.text();
};
