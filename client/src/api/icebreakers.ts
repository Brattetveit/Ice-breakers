export const fetchIcebreakers = async () => {
  const response = await fetch("api/icebreakers");
  return response.json();
};
