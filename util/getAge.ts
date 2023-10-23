export default function calculateAgeInDecimals(birthdate: string): number {
    const today: Date = new Date();
    const birthdateDate: Date = new Date(birthdate);
  
    const ageInMilliseconds: number = today.getTime() - birthdateDate.getTime();
    const ageInSeconds: number = ageInMilliseconds / 1000;
    const ageInMinutes: number = ageInSeconds / 60;
    const ageInHours: number = ageInMinutes / 60;
    const ageInDays: number = ageInHours / 24;
    const ageInYears: number = ageInDays / 365.25; // Consider leap years
  
    return ageInYears;
}