"use client";
import { useEffect, useState } from "react";
import calculateAgeInDecimals from "@/util/getAge";
import trimNumberBeforeDecimal from "@/util/trimDecimal";
import { BiSolidMessageSquareEdit,BiSolidInfoSquare} from "react-icons/bi";

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
      const savedDOB = localStorage.getItem("dob")
      let DOB = age.birthdate.toString();
      if(savedDOB !==null){
        DOB = savedDOB
      }
      const calculatedAge = calculateAgeInDecimals(DOB).toFixed(8);
      const output = trimNumberBeforeDecimal(calculatedAge);
      setAgeText({ number: output[0], decimal: output[1] });
      setAge({...age,age:calculatedAge});
    };

    const intervalId = setInterval(updateAge, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [age]);

  const editDOB = ()=>{
    const dob = prompt("Date of birth YYYY-MM-DD")
    if(!dob) return
    const pattern = /^\d{4}-\d{2}-\d{2}$/;
    if(pattern.test(dob)){
      setAge({...age,birthdate:dob.toString()})
      localStorage.setItem("dob", dob);
    }else{
      alert(`${dob} is not in the YYYY-MM-DD format`)
    }
  }

  const showInfo = ()=>{
    const savedDOB = localStorage.getItem("dob")
    let DOB = age.birthdate.toString();
    if(savedDOB !==null){
      DOB = savedDOB
    }
    alert(DOB)
  }

  return (
    <main className="min-h-screen bg-black">
      <p className="flex justify-center items-center outline min-h-screen">
        <span className="text-white">
          {
            age.age ?
            <>
            <span className="text-[20rem]">{ageText.number ? ageText.number : "Loading"}</span>
            <sup className="text-[10rem]">{ageText.decimal ? "." + ageText.decimal: "Loading"}</sup>
            </>
            :
            "Calulating..."
          }
         
        </span>
      </p>
      <div className="flex items-center gap-2 absolute bottom-5 right-5">
      <BiSolidMessageSquareEdit onClick={editDOB} className="cursor-pointer  text-4xl text-white"/>
      <BiSolidInfoSquare onClick={showInfo} className="cursor-pointer bottom-5 text-4xl text-white"/>
      </div>
    </main>
  );
}
