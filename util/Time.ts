const DayHandler = {
    calculate: (): number => {
        // Get the current date
        const currentDate = new Date();

        // Calculate the current time in seconds since the start of the day
        const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        const millisecondsSinceStartOfDay = currentDate.getTime() - startOfDay.getTime();
        const secondsSinceStartOfDay = millisecondsSinceStartOfDay / 1000;

        // Calculate the total number of seconds in a day
        const totalSecondsInDay = 24 * 60 * 60;

        // Calculate the percentage of the day that has passed
        const percentageOfDayComplete = (secondsSinceStartOfDay / totalSecondsInDay) * 100;

        return percentageOfDayComplete;
    },
    currentDay: (): string => {
        // Get the current date
        const currentDate = new Date();

        // Get the day of the month
        const dayOfMonth = currentDate.getDate();

        // Determine the suffix based on the day of the month
        let suffix = "";
        if (dayOfMonth === 1 || dayOfMonth === 21 || dayOfMonth === 31) {
            suffix = "st";
        } else if (dayOfMonth === 2 || dayOfMonth === 22) {
            suffix = "nd";
        } else if (dayOfMonth === 3 || dayOfMonth === 23) {
            suffix = "rd";
        } else {
            suffix = "th";
        }

        // Format the date with the appropriate suffix
        const formattedDate = `${dayOfMonth}${suffix}`;

        return formattedDate;
    },
};
const WeekHandler = {
    calculate: (): number => {
        // Get the current date
        const currentDate = new Date();

        // Calculate the start of the week (Monday)
        const startOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() + (currentDate.getDay() === 0 ? -6 : 1));

        // Calculate the current time in seconds since the start of the week
        const millisecondsSinceStartOfWeek = currentDate.getTime() - startOfWeek.getTime();
        const secondsSinceStartOfWeek = millisecondsSinceStartOfWeek / 1000;

        // Calculate the total number of seconds in a week
        const totalSecondsInWeek = 7 * 24 * 60 * 60;

        // Calculate the percentage of the week that has passed
        const percentageOfWeekComplete = (secondsSinceStartOfWeek / totalSecondsInWeek) * 100;

        return percentageOfWeekComplete;
    },
    currentWeek: (): string => {
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const currentDate = new Date();
        const currentDayIndex = currentDate.getDay();
        return days[currentDayIndex];
    },
};
const MonthHandler = {
    calculate: (): number => {
        // Get the current date
        const currentDate = new Date();

        // Calculate the start of the month
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

        // Calculate the current time in seconds since the start of the month
        const millisecondsSinceStartOfMonth = currentDate.getTime() - startOfMonth.getTime();
        const secondsSinceStartOfMonth = millisecondsSinceStartOfMonth / 1000;

        // Calculate the total number of seconds in the month
        const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
        const totalSecondsInMonth = daysInMonth * 24 * 60 * 60;

        // Calculate the percentage of the month that has passed
        const percentageOfMonthComplete = (secondsSinceStartOfMonth / totalSecondsInMonth) * 100;

        return percentageOfMonthComplete;
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
const YearHandler = {
    calculate: (): number => {
        // Get the current date
        const currentDate = new Date();

        // Calculate the start of the year
        const startOfYear = new Date(currentDate.getFullYear(), 0, 1);

        // Calculate the current time in seconds since the start of the year
        const millisecondsSinceStartOfYear = currentDate.getTime() - startOfYear.getTime();
        const secondsSinceStartOfYear = millisecondsSinceStartOfYear / 1000;

        // Calculate the total number of seconds in the year
        const isLeapYear = (year: number) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
        const totalSecondsInYear = (isLeapYear(currentDate.getFullYear()) ? 366 : 365) * 24 * 60 * 60;

        // Calculate the percentage of the year that has passed
        const percentageOfYearComplete = (secondsSinceStartOfYear / totalSecondsInYear) * 100;

        return percentageOfYearComplete;
    },
    currentYear: (): string => new Date().getFullYear().toString(),
};


const Time = {
    Day: DayHandler,
    Week: WeekHandler,
    Month: MonthHandler,
    Year: YearHandler,
    show: (): string => {
        const currentDate = new Date();

        // Format time (HH:mm:ss)
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const seconds = String(currentDate.getSeconds()).padStart(2, '0');
        const timeString = `${hours}:${minutes}:${seconds}`;

        // Format date (EEEE, dd MMM yyyy)
        const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: '2-digit', month: 'short', year: 'numeric' };
        const dateFormatter = new Intl.DateTimeFormat('en-US', options);
        const dateString = dateFormatter.format(currentDate);

        // Combine time and date
        const formattedDateTime = `${timeString} ${dateString}`;

        return formattedDateTime;
    }
}

export default Time