export const addressSplitter = (address: string) => {
  const start = address?.slice(0, 4);
  const middle = "....";
  const end = address?.slice(-4);
  return start?.concat(middle, end);
};
