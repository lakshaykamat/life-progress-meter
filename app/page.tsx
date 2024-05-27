"use client";
import { useEffect, useState } from "react";
import calculateAgeInDecimals from "@/util/calculateAgeInDecimals";
import { BiSolidMessageSquareEdit, BiSolidInfoSquare } from "react-icons/bi";
import LocalStorageHandler from "@/util/LocalStorageHander";
import DayHandler from "@/util/DayHandler";
import WeekHandler from "@/util/WeekHandler";
import MonthHandler from "@/util/MonthHandler";
import YearHandler from "@/util/YearHandler";
import UTIL from "@/util";
import ProgessCard, { VerticalProgessCard } from "@/components/ProgessCard";
import AgeHandler from "@/util/AgeHandler";
import { DialogHeader } from "@/components/ui/dialog";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@radix-ui/react-dialog";

type AgeProps = {
  birthdate: string;
  week: number;
  ageInPercen: number;
  day: number;
  year: number;
  month: number;
  age: string | null;
  life: number;
};

export default function Home() {
  // const dob =
  //   LocalStorageHandler.getDOB() !== null
  //     ? new Date(LocalStorageHandler.getDOB())
  //     : new Date("2004-10-02");
  // const age = AgeHandler.life(dob, 75);
  const dobString = LocalStorageHandler.getDOB();
  const dob = dobString !== null ? new Date(dobString) : new Date("2004-10-02");
  const age = AgeHandler.life(dob, 75);

  const [STATE, SET_STATE] = useState<AgeProps>({
    birthdate: "2004-10-02",
    week: WeekHandler.calculate(),
    ageInPercen: AgeHandler.percen(new Date("2004-10-02")),
    day: DayHandler.calculate(),
    month: MonthHandler.calculate(),
    year: YearHandler.calculate(),
    age: null,
    life: AgeHandler.life(dob, 75),
  });

  useEffect(() => {
    const updateAge = () => {
      const savedDOB = LocalStorageHandler.getDOB();
      let DOB = STATE.birthdate.toString();
      if (savedDOB !== null) {
        DOB = savedDOB;
      }
      SET_STATE({
        ...STATE,
        age: calculateAgeInDecimals(DOB).toFixed(8),
        ageInPern: AgeHandler.percen(new Date(DOB)),
        day: DayHandler.calculate(),
        month: MonthHandler.calculate(),
        year: YearHandler.calculate(),
        week: WeekHandler.calculate(),
        life: AgeHandler.life(new Date(DOB), 75),
      });
    };

    const intervalId = setInterval(() => {
      updateAge();
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [STATE]);
  console.log(STATE);

  const editDOB = () => {
    const dob = prompt("Date of birth in format (YYYY-MM-DD)");
    if (!dob) return;
    if (LocalStorageHandler.isValidDOBFormat(dob)) {
      SET_STATE({ ...STATE, birthdate: dob.toString() });
      LocalStorageHandler.setDOB(dob);
    } else {
      alert(`${dob} is not in the YYYY-MM-DD format`);
    }
  };
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
  function calculateMonthsLeft(targetDate: Date): number {
    const currentDate = new Date();
    const monthsLeft =
      (targetDate.getFullYear() - currentDate.getFullYear()) * 12;
    const monthDifference = targetDate.getMonth() - currentDate.getMonth();
    return monthsLeft + monthDifference;
  }

  const showInfo = () => {
    const savedDOB = LocalStorageHandler.getDOB();
    let DOB = STATE.birthdate.toString();
    if (savedDOB !== null) {
      DOB = savedDOB;
    }
    alert(DOB);
  };

  return (
    <main className="bg-gray-950 p-24 min-h-screen text-white">
      <div className="flex items-start gap-12">
        <div className="flex flex-col min-w-[20rem] gap-6">
          <ProgessCard
            label="Day"
            decimalPlaces={3}
            value={STATE.day}
            valueAsString={DayHandler.currentDay()}
          />

          <ProgessCard
            label="Week"
            decimalPlaces={3}
            value={STATE.week}
            valueAsString={WeekHandler.currentWeek()}
          />
          <ProgessCard
            label="Month"
            decimalPlaces={3}
            value={STATE.month}
            valueAsString={MonthHandler.currentMonth()}
          />
          <ProgessCard
            label="Year"
            decimalPlaces={3}
            value={STATE.year}
            valueAsString={YearHandler.currentYear()}
          />
        </div>
        <div className="flex flex-col items-start gap-6 w-full">
          <VerticalProgessCard
            label="Life"
            decimalPlaces={4}
            value={STATE.life}
            valueAsString={
              STATE.age
                ? UTIL.splitNumberByDecimal(STATE.age.toString())[0]
                : ""
            }
          />
          <VerticalProgessCard
            label="Age"
            decimalPlaces={4}
            value={STATE.ageInPercen}
            valueAsString={STATE.age ? STATE.age.toString() : ""}
          />
          <VerticalProgessCard
            label="College"
            decimalPlaces={4}
            value={calculateTimePercentageBetweenDates(
              new Date("2022-06-15"),
              new Date("2025-05-17")
            )}
            valueAsString={
              calculateMonthsLeft(new Date("2025-05-17")).toString() +
              " Months Left"
            }
          />
        </div>
      </div>
      <div className="flex items-center gap-2 absolute bottom-5 right-5">
        <BiSolidMessageSquareEdit
          onClick={editDOB}
          className="cursor-pointer  text-4xl text-white"
        />
        <BiSolidInfoSquare
          onClick={showInfo}
          className="cursor-pointer bottom-5 text-4xl text-white"
        />
      </div>
    </main>
  );
}
