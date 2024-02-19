export const fetchIcebreakers = async () => {
  const response = await fetch("api/icebreakers");
  const { data } = await response.json();
  return data;
};
