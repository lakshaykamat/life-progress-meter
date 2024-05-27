const MonthHandler = {
  calculate: (): number => {
    const currentDate = new Date();

    // Get the current day of the month (1 to 31)
    const currentDayOfMonth = currentDate.getDate();

    // Get the total number of days in the current month
    const totalDaysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();

    // Calculate the percentage completion
    const percentCompletion = (currentDayOfMonth / totalDaysInMonth) * 100;

    return percentCompletion;
  },
  currentMonth: (): string => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth();
    return months[currentMonthIndex];
  },
};

export default MonthHandler;
