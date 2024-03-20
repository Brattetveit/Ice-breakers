export const fetchReportedIcebreakers = async (role: string) => {
  const response = await fetch("api/icebreakers/reported", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-user-role": role,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch reported icebreakers");
  }
  return await response.json();
};

export const fetchReportedFeedback = async (role: string) => {
  const response = await fetch("api/feedback/reported", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-user-role": role,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch reported feedback");
  }
  return await response.json();
};

export const deleteIcebreaker = async (icebreakerId: string, role: string) => {
  const response = await fetch(`api/icebreakers/${icebreakerId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-user-role": role,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete icebreaker");
  }
  return response.text();
};

export const deleteFeedback = async (feedbackId: string, role: string) => {
  const response = await fetch(`api/feedback/${feedbackId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-user-role": role,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete feedback");
  }
  return response.text();
};

export const clearIcebreakerReports = async (icebreakerId: string, role: string) => {
  const response = await fetch(
    `api/icebreakers/${icebreakerId}/clear-reports`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-user-role": role,
      },
    },
  );
  if (!response.ok) {
    throw new Error("Failed to clear icebreaker reports");
  }
  return response.text();
};

export const clearFeedbackReports = async (feedbackId: string, role: string) => {
  const response = await fetch(
    `api/feedback/${feedbackId}/clear-reports`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-user-role": role,
      },
    },
  );
  if (!response.ok) {
    throw new Error("Failed to clear feedback reports");
  }
  return response.text();
};

