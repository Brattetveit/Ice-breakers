export const fetchFeedback = async (name: string) => {
  const response = await fetch("api/feedback/getByName/" + name);
  const { data } = await response.json();
  return data;
};

export const handleCreateFeedback = async (icebreaker: string, comment: string, user: string) => {
  const feedback = {
    feedback: comment,
    author: user,
    name: icebreaker
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

export function reportFeedback(feedbackId: string) {
  fetch(`api/feedback/${feedbackId}/report`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.text();
      }
      throw new Error("Failed to report feedback");
    })
    .then((message) => {
      console.log("Server response: ", message);
      alert("Feedback reported successfully");
    })
    .catch((error) => {
      console.error("Error reporting feedback:", error);
      alert("Error reporting feedback");
    });
}


export function reportIcebreaker(icebreakerId: string) {
  fetch(`api/icebreakers/${icebreakerId}/report`, {
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
