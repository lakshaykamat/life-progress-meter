const YearHandler = {
  calculate: (): number => {
    const currentDate = new Date();

    // Get the current year
    const currentYear = currentDate.getFullYear();

    // Get the start of the current year
    const startOfYear = new Date(currentYear, 0, 0);

    // Get the difference in milliseconds between the current date and the start of the year
    const diff = currentDate.getTime() - startOfYear.getTime();

    // Calculate the number of milliseconds in a day
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculate the current day of the year
    const currentDayOfYear = Math.floor(diff / oneDay) + 1;

    // Determine if the current year is a leap year
    const isLeapYear = (year: number) =>
      (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

    // Calculate the total number of days in the current year
    const totalDaysInYear = isLeapYear(currentYear) ? 366 : 365;

    // Calculate the percentage completion
    const percentCompletion = (currentDayOfYear / totalDaysInYear) * 100;

    return percentCompletion;
  },
  currentYear: (): string => new Date().getFullYear().toString(),
};
export default YearHandler;
