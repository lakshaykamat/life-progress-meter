"use client"
import { useEffect, useState } from "react";
import calculateAgeInDecimals from "@/util/getAge"; // Replace with the correct import path
import trimNumberBeforeDecimal from "@/util/trimDecimal";
type Props = {
  number:string | null,
  decimal:string | null
}
export default function Home() {
  const birthdate = "2004-10-02";
  const [age, setAge] = useState<string|null>(null);
  const [ageText, setAgeText] = useState<Props>({number:null,decimal:null});

  useEffect(() => {
    const updateAge = () => {
      const calculatedAge = calculateAgeInDecimals(birthdate).toFixed(8);
     const output = trimNumberBeforeDecimal(calculatedAge)
      setAgeText({number:output[0],decimal:output[1]})
      setAge(calculatedAge);
    };

    const intervalId = setInterval(updateAge, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <main className="min-h-screen">
      <p className="flex justify-center items-center outline min-h-screen">
          <span className="text-[10rem]">{ageText.number}<sup>{ageText.decimal && "."+ageText.decimal}</sup></span>
       
      </p>
    </main>
  );
}

