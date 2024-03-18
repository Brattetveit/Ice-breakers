export const fetchFeedback = async () => {
  const response = await fetch("api/feedback");
  const { data } = await response.json();
  return data;
};

export const handleCreateFeedback = async (comment: string, user: string) => {
  const feedback = {
    feedback: comment,
    author: user,
  };

  try {
    const response = await fetch("api/feedback/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(feedback),
    });

    if (response.ok) {
      const NewFeedback = await response.json();
      console.log("Feedback created", NewFeedback);
    } else {
      console.log("Feedback failed", response.statusText);
    }
  } catch (error) {
    console.error("error submiting new Feedback", error);
  }
};

export function reportIcebreaker(icebreakerId: string) {
  fetch(`http://localhost:5173/api/icebreakers/${icebreakerId}/report`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.text();
      }
      throw new Error("Failed to report icebreaker");
    })
    .then((message) => {
      console.log("Server response: ", message);
      alert("Icebreaker reported successfully");
    })
    .catch((error) => {
      console.error("Error reporting icebreaker:", error);
      alert("Error reporting icebreaker");
    });
}
