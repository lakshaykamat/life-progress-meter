const DayHandler = {
  calculate: (): number => {
    const currentDate = new Date();

    // Get the current hour of the day
    const currentHour = currentDate.getHours();

    // Calculate the total number of hours in a day
    const totalHoursInDay = 24;

    // Calculate the percentage completion
    const percentCompletion = (currentHour / totalHoursInDay) * 100;

    return percentCompletion;
  },
  currentDay: (): string => {
    return new Date().getUTCDate().toString();
  },
};
export default DayHandler;
