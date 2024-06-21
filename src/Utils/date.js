const getWeekByDate = (date) => {
  const target = new Date(date);

  const dayNr = (target.getDay() + 6) % 7;

  target.setDate(target.getDate() - dayNr + 3);

  const firstThursday = target.valueOf();

  target.setMonth(0, 1);

  if (target.getDay() !== 4) {
    // eslint-disable-next-line no-mixed-operators
    target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
  }

  return 1 + Math.ceil((firstThursday - target) / 604800000);
};

// eslint-disable-next-line import/prefer-default-export
export { getWeekByDate };
