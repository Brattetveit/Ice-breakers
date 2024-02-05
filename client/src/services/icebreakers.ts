export const fetchIcebreakers = async () => {
  const response = await fetch("/api/icebreakers");
  return await response.json();
};
