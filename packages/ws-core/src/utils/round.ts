const round = (value: number, places: number): number => {
  const multiplier = Math.pow(10, places);
  return Math.round(value * multiplier) / multiplier;
};

export default round;
