const YearHandler = {
  calculate: (): number => {
    const currentDate = new Date();

    // Get the current day of the year (1 to 365 or 366 for leap years)
    const startOfYear = new Date(currentDate.getFullYear(), 0, 0); // Start of the current year
    const diff = currentDate.getTime() - startOfYear.getTime(); // Difference in milliseconds
    const oneDay = 1000 * 60 * 60 * 24; // Number of milliseconds in a day
    const currentDayOfYear = Math.floor(diff / oneDay) + 1;

    // Get the total number of days in the current year (365 or 366 for leap years)
    const totalDaysInYear =
      (new Date(currentDate.getFullYear() + 1, 0, 0) - startOfYear) / oneDay;

    // Calculate the percentage completion
    const percentCompletion = (currentDayOfYear / totalDaysInYear) * 100;

    return percentCompletion;
  },
  currentYear: (): string => new Date().getUTCFullYear().toString(),
};
export default YearHandler;
