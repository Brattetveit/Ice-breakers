export const fetchIcebreakers = async (userId?: string) => {
  const response = await fetch(`api/icebreakers/${userId ?? ""}`);
  const { data } = await response.json();
  return data;
};
