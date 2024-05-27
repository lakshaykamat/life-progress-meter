const WeekHandler = {
  calculate: (): number => {
    // Get the current date and time
    const currentDate = new Date();

    // Get the current day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
    let currentDayOfWeek = currentDate.getDay();
    // Adjust currentDayOfWeek to start from Monday (0 for Monday, ..., 6 for Sunday)
    currentDayOfWeek = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;

    // Get the current hour of the day
    const currentHour = currentDate.getHours();

    // Calculate the total number of hours in a week
    const totalHoursInWeek = 7 * 24;

    // Calculate the number of hours elapsed since the beginning of the week
    const hoursElapsed = currentDayOfWeek * 24 + currentHour;

    // Calculate the percentage completion
    const percentCompletion = (hoursElapsed / totalHoursInWeek) * 100;

    return percentCompletion;
  },
  currentWeek: (): string => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const currentDate = new Date();
    const currentDayIndex = currentDate.getDay();
    return days[currentDayIndex];
  },
};
export default WeekHandler;
