const AgeHandler = {
  percen: (DOB: Date): number => {
    const startDate = convertDateToYear(DOB, new Date().getFullYear() - 1);
    const endDate = convertDateToCurrentYear(startDate);
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

    const percentCompletion = (elapsedTime / totalTime) * 100;
    return percentCompletion;
  },
  life: (birthDate: Date, assumedLifespan: number): number => {
    const currentDate = new Date();

    // Calculate the total time in milliseconds from birth to current date
    const totalTime = currentDate.getTime() - birthDate.getTime();

    // Calculate the total time in milliseconds for the assumed lifespan
    const assumedLifespanMilliseconds =
      assumedLifespan * 365.25 * 24 * 60 * 60 * 1000; // Assuming an average lifespan of 75 years

    // Ensure the birth date is not in the future
    if (totalTime < 0) {
      throw new Error("Birth date cannot be in the future.");
    }
    // Calculate the life completion percentage
    const lifeCompletionPercentage =
      (totalTime / assumedLifespanMilliseconds) * 100;

    return lifeCompletionPercentage;
  },
};

export function convertDateToCurrentYear(originalDate: Date): Date {
  const currentYear = new Date().getFullYear();
  const day = originalDate.getDate();
  const month = originalDate.getMonth();
  return new Date(currentYear, month, day);
}
export function convertDateToYear(
  originalDate: Date,
  targetYear: number
): Date {
  const day = originalDate.getDate();
  const month = originalDate.getMonth();
  return new Date(targetYear, month, day);
}

export default AgeHandler;
