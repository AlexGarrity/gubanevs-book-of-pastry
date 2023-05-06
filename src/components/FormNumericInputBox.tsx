import React from "react";

interface NumericInputProps {
  label: string;
  id: string;
  max: number;
  min: number;
  step: number;
  defaultValue: number;
  initialValue?: number;
}

export default function FormNumericInputBox({ label, id, max, min, step, defaultValue, initialValue = defaultValue }: NumericInputProps) {
  return (
    <span className="flex flex-row items-center justify-between">
      <p>{label}</p>
      <span>
        <input
          id={id}
          type="number"
          max={max}
          min={min}
          step={step}
          title={label}
          defaultValue={defaultValue}
          value={initialValue}
          className="border p-1 text-center m-0 border-slate-400 rounded-lg font-bold float-right w-1/2"
        ></input>
      </span>

    </span>
  );
}