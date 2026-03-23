export const daysAgo = (time: Date) => {
  const createdAt = new Date(time);
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - createdAt.getTime();
  return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
};
