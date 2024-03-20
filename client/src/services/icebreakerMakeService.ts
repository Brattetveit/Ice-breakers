

export const handleCreateIcebreaker =  async (
    user: string,
    nameText: string,
    ruleText: string, 
    summaryText: string,
    category: string,
    visibility: boolean,
    defaultTime: number
  ) => {
    const icebreaker = {
      author: user,
      name: nameText,
      fullDescription: ruleText,
      shortDescription: summaryText,
      category: category,
      visibility: visibility,
      defaultTime: defaultTime
    };

    try {
      const response = await fetch("api/icebreakers/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(icebreaker)
      });

      if (response.ok) {
        const NewIcebreaker = await response.json();
        console.log("Icebreaker created", NewIcebreaker);
      } else {
        console.log("Icebreaker creation faild", response.statusText); 
      }
    } catch (error) {
      console.error("error submiting new Icebreaker data", error);
    }
  };