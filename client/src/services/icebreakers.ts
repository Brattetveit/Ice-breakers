export const fetchIcebreakers = async () => {
  const { data } = await (await fetch("api/icebreakers")).json();
  return data;
};
