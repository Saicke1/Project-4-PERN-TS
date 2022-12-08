export const showDate = (data) => {
  const getDate = data.slice(0, 10);
  let date = new Date(getDate);
  let finalDate = date.toLocaleDateString("de", {day: "numeric", month:"short", year: "numeric"});
  return finalDate;
};