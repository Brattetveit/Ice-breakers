export const fetchFeedback = async () => {
  const response = await fetch("api/feedback");
  const { data } = await response.json();
  return data;
};



export const handleCreateFeedback =  async (
  comment: string,
  user: string
) => {
  const feedback = {
    feedback: comment,
    author: user
  };

  try {
    const response = await fetch("api/feedback/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(feedback)
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