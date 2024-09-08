export const formattedDate = (isoDate: string | number | Date) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
