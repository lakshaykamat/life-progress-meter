const COLLEGE_HANDLER = {
  percentComplete: () =>
    calculateTimePercentageBetweenDates(
      new Date("2022-06-15"),
      new Date("2025-05-17")
    ),
  timeRemainingInMonth: () => calculateMonthsLeft(new Date("2025-05-17")),
};

function calculateMonthsLeft(targetDate: Date): number {
  const currentDate = new Date();
  const monthsLeft =
    (targetDate.getFullYear() - currentDate.getFullYear()) * 12;
  const monthDifference = targetDate.getMonth() - currentDate.getMonth();
  return monthsLeft + monthDifference;
}

function calculateTimePercentageBetweenDates(
  startDate: Date,
  endDate: Date
): number {
  const totalTime = endDate.getTime() - startDate.getTime();
  const elapsedTime = new Date().getTime() - startDate.getTime();

  // Ensure the start date is not after the end date
  if (totalTime < 0) {
    throw new Error("Start date cannot be after end date.");
  }

  // Ensure the current date is not before the start date
  if (elapsedTime < 0) {
    throw new Error("Current date cannot be before start date.");
  }

  // Calculate the percentage completion
  const percentCompletion = (elapsedTime / totalTime) * 100;
  return percentCompletion;
}
export default COLLEGE_HANDLER;
