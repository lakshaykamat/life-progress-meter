"use client";
import { useEffect, useState } from "react";
import calculateAgeInDecimals from "@/util/getAge";
import trimNumberBeforeDecimal from "@/util/trimDecimal";
import { BiSolidMessageSquareEdit } from "react-icons/bi";

type AgeTextProps = {
  number: String | null;
  decimal: String | null;
};

type AgeProps = {
  birthdate: String;
  age: String | null;
};

export default function Home() {
  const [age, setAge] = useState<AgeProps>({birthdate:"2004-10-02",age:null});
  const [ageText, setAgeText] = useState<AgeTextProps>({
    number: null,
    decimal: null,
  });

  useEffect(() => {
    const updateAge = () => {
      const calculatedAge = calculateAgeInDecimals(age.birthdate.toString()).toFixed(8);
      const output = trimNumberBeforeDecimal(calculatedAge);
      setAgeText({ number: output[0], decimal: output[1] });
      setAge({...age,age:calculatedAge});
    };

    const intervalId = setInterval(updateAge, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const editDOB = ()=>{
    const dob = prompt("Date of birth")
    alert("Comming soon.")
  }

  return (
    <main className="min-h-screen bg-black">
      <p className="flex justify-center items-center outline min-h-screen">
        <span className="text-white text-[10rem]">
          {ageText.number}
          <sup>{ageText.decimal && "." + ageText.decimal}</sup>
        </span>
      </p>
      <BiSolidMessageSquareEdit onClick={editDOB} className="absolute right-5 bottom-5 text-4xl text-white"/>
    </main>
  );
}
