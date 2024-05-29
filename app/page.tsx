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
import COLLEGE_HANDLER from "@/util/CollegeHandler";

type AgeProps = {
  week: number;
  ageInPercen: number | null;
  day: number;
  year: number;
  month: number;
  age: string | null;
  life: number | null;
};

export default function Home() {
  const [STATE, SET_STATE] = useState<AgeProps>({
    week: WeekHandler.calculate(),
    ageInPercen: null,
    day: DayHandler.calculate(),
    month: MonthHandler.calculate(),
    year: YearHandler.calculate(),
    age: null,
    life: null,
  });

  useEffect(() => {
    const updateState = () => {
      const savedDOB = LocalStorageHandler.getDOB();
      if (savedDOB) {
        SET_STATE({
          ...STATE,
          age: calculateAgeInDecimals(savedDOB).toFixed(8),
          ageInPercen: AgeHandler.percen(new Date(savedDOB)),
          day: DayHandler.calculate(),
          month: MonthHandler.calculate(),
          year: YearHandler.calculate(),
          week: WeekHandler.calculate(),
          life: AgeHandler.life(new Date(savedDOB), 75),
        });
      } else {
        SET_STATE({
          ...STATE,
          age: null,
          ageInPercen: null,
          day: DayHandler.calculate(),
          month: MonthHandler.calculate(),
          year: YearHandler.calculate(),
          week: WeekHandler.calculate(),
          life: null,
        });
      }
    };

    const intervalId = setInterval(() => {
      updateState();
    }, 4000);

    return () => {
      clearInterval(intervalId);
    };
  }, [STATE]);
  console.log(STATE);

  const editDOB = () => {
    const dob = prompt("Date of birth in format (YYYY-MM-DD)");
    if (!dob) return;
    if (LocalStorageHandler.isValidDOBFormat(dob)) {
      LocalStorageHandler.setDOB(dob);
    } else {
      alert(`${dob} is not in the YYYY-MM-DD format`);
    }
  };

  const showInfo = () => {
    const savedDOB = LocalStorageHandler.getDOB();
    if (savedDOB) {
      alert(savedDOB);
    } else {
      alert("Enter DOB");
    }
  };

  return (
    <main className="bg-gray-950 p-7 sm:p-24 min-h-screen text-white">
      <div className="flex flex-col md:flex-row xl:items-start items-center gap-12">
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
          {STATE.life && STATE.ageInPercen && (
            <>
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
            </>
          )}
          <VerticalProgessCard
            label="College"
            decimalPlaces={4}
            value={COLLEGE_HANDLER.percentComplete()}
            valueAsString={`${COLLEGE_HANDLER.timeRemainingInMonth()} Months Left`}
          />
        </div>
      </div>
      <div className="flex items-center gap-2 fixed bottom-5 right-5">
        <BiSolidMessageSquareEdit
          onClick={editDOB}
          className="cursor-pointer text-5xl text-gray-200"
        />
        <BiSolidInfoSquare
          onClick={showInfo}
          className="cursor-pointer text-5xl text-gray-200"
        />
      </div>
    </main>
  );
}
