import UTIL from "@/util";
import React from "react";

type Props = {
  label: string;
  value: number;
  decimalPlaces: number;
  valueAsString: string;
};

const ProgessCard = (props: Props) => {
  return (
    <section className="bg-gray-800 flex flex-col w-full drop-shadow rounded-lg p-4">
      <p className="text-white text-xl mb-5 font-semibold">{props.label}</p>
      <div className="flex items-center justify-between mb-4">
        <p className="text-white text-lg">
          {UTIL.limitDecimalPlaces(props.value, props.decimalPlaces)}%
        </p>
        <p className="text-white font-thin text-md">{props.valueAsString}</p>
      </div>
      <ProgessBar size={10} value={props.value} />
    </section>
  );
};
export const VerticalProgessCard = (props: Props) => {
  return (
    <section className="bg-gray-800 flex flex-col w-full drop-shadow rounded-lg p-4">
      <p className="text-white text-2xl mb-7 font-semibold">{props.label}</p>
      <div className="flex items-center justify-between mb-6">
        <p className="text-white text-3xl">
          {UTIL.limitDecimalPlaces(props.value, props.decimalPlaces)}%
        </p>
        <p className="text-white font-thin text-lg">{props.valueAsString}</p>
      </div>
      <ProgessBar size={15} value={props.value} />
    </section>
  );
};
const ProgessBar = ({ value, size }: { value: number; size: number }) => {
  const height = `${size}px`;
  return (
    <div
      style={{ height: height }}
      className={` bg-gray-600 rounded-full overflow-hidden`}
    >
      <div
        className="h-full bg-white"
        style={{ width: `${value.toString()}%` }}
        // role="progressbar"
        // aria-valuemin="0"
        // aria-valuemax="100"
        // aria-valuenow={value.toString()}
      ></div>
    </div>
  );
};
export default ProgessCard;
