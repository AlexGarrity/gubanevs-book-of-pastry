import React, { useEffect } from "react";
import FormNumericInputBox from '../components/FormNumericInputBox'
import FormCluster from '../components/FormCluster'

import { useSearchParams } from "react-router-dom";

export default function Calculator() {

  const [searchParams, setSearchParams] = useSearchParams();

  function displayCookTime() {
    const rollElement = document.getElementById("roll") as HTMLInputElement;
    const roll = (rollElement.valueAsNumber != 0) ? rollElement.valueAsNumber : 0.00000001;

    const foodMassElement = document.getElementById("mass-food") as HTMLInputElement;
    const foodMass = (foodMassElement.valueAsNumber != 0) ? foodMassElement.valueAsNumber : 0.00000001;

    const potMassElement = document.getElementById("mass-cookware") as HTMLInputElement;
    const potMass = (potMassElement.valueAsNumber != 0) ? potMassElement.valueAsNumber : 0.00000001;

    const rangeElement = document.getElementById("range") as HTMLInputElement;
    const range = (rangeElement.valueAsNumber != 0) ? rangeElement.valueAsNumber : 1;

    const ambientElement = document.getElementById("temperature-ambient") as HTMLInputElement;
    const ambient = ambientElement.valueAsNumber;

    const targetElement = document.getElementById("temperature-target") as HTMLInputElement;
    const target = targetElement.valueAsNumber;

    const foodShcElement = document.getElementById("shc-food") as HTMLInputElement;
    const foodShc = (foodShcElement.valueAsNumber > 0) ? foodShcElement.valueAsNumber : 1;

    const potShcElement = document.getElementById("shc-cookware") as HTMLInputElement;
    const potShc = (potShcElement.valueAsNumber > 0) ? potShcElement.valueAsNumber : 1;

    const outputElement = document.getElementById("time-output") as HTMLParagraphElement;
    const ratingElement = document.getElementById("pastry-rating") as HTMLParagraphElement;

    const QUALITY_TIERS = [
      "Terrible",
      "Poor",
      "Average",
      "Good",
      "Great",
      "Fantastic",
      "Masterwork",
      "Legendary",
    ];

    const FT_IN_A_M = 0.3048;
    // Math.PI * (15 * FT_IN_A_M) * (15 * FT_IN_A_M);
    const POT_AREA = 0.25; // m^2
    const MAX_ROLL = 40;

    const MAX_ENERGY_OUTPUT = 1.175E6;

    // Calculate blast area
    const coneAreaAtGivenRange = Math.PI * (range * FT_IN_A_M) * (range * FT_IN_A_M) * 0.25;
    const potExposurePercentage = (coneAreaAtGivenRange < 0.25) ? 1.0 : POT_AREA / coneAreaAtGivenRange;

    const temperatureDelta = (target - ambient != 0) ? target - ambient : 0.001;

    const potEnergyInput = MAX_ENERGY_OUTPUT * (roll / MAX_ROLL) * potExposurePercentage;
    let cookingTime = (temperatureDelta * ((foodMass * foodShc) + (potMass * potShc))) / potEnergyInput;

    const PREFIXES = ["seconds", "milliseconds", "microseconds", "nanoseconds"];
    let prefixIndex = 0;
    while (Math.abs(cookingTime) < 1) {
      cookingTime *= 1000;
      ++prefixIndex;
    }

    const timeDelta = 6 - cookingTime;
    const timeDeltaPercentage = Math.max(0.0, Math.min(1.0, Math.abs(timeDelta) / 6));
    const x = (19 / 12) * timeDeltaPercentage - 0.8;
    const adjustedPercentage = -(x * x * x) + 0.5;

    // https://www.desmos.com/calculator/jgxvwpfrda

    console.log(timeDelta);
    console.log(timeDeltaPercentage);
    console.log(adjustedPercentage);
    outputElement.innerText = cookingTime.toPrecision(3) + " " + PREFIXES[prefixIndex];
    ratingElement.innerText = QUALITY_TIERS[Math.floor(adjustedPercentage * QUALITY_TIERS.length)];
  }

  useEffect(() => {
    displayCookTime();
  })

  return (
    <div className="flex flex-col w-1/2 mx-auto">
      <div className="flex flex-row flex-grow justify-between mt-8 mb-2 font-bold text-lg text-center">
        <p className="flex-grow">Time to cook pastry: </p>
        <p className="flex-grow" id="time-output"></p>
      </div>
      <div className="flex flex-row flex-grow justify-between mb-8 font-bold text-lg text-center">
        <p className="flex-grow">Pastry quality: </p>
        <p className="flex-grow" id="pastry-rating"></p>
      </div>
      <form onChange={() => { displayCookTime() }} className="flex flex-1 flex-col mt-8 space-y-8">
        <FormCluster title="Game parameters">
          <FormNumericInputBox label="Damage roll" id="roll" max={40} min={1} step={1} defaultValue={20}></FormNumericInputBox>
          <FormNumericInputBox label="Range from pot (in ft)" id="range" max={15} min={1} step={1} defaultValue={5}></FormNumericInputBox>
        </FormCluster>
        <FormCluster title="Mass parameters">
          <FormNumericInputBox label="Mass of food (in g)" id="mass-food" max={50000} min={0} step={1} defaultValue={searchParams.get("mass") ? Number.parseFloat(searchParams.get("mass")) : 107}></FormNumericInputBox>
          <FormNumericInputBox label="Mass of cookware (in g)" id="mass-cookware" max={100000} min={0} step={1} defaultValue={4500}></FormNumericInputBox>
        </FormCluster>
        <FormCluster title="Temperature parameters">
          <FormNumericInputBox label="Ambient temperature (in C)" id="temperature-ambient" max={100} min={-273} step={1} defaultValue={20}></FormNumericInputBox>
          <FormNumericInputBox label="Target temperature (in C)" id="temperature-target" max={200} min={-273} step={1} defaultValue={searchParams.get("target_temperature") ? Number.parseFloat(searchParams.get("target_temperature")) : 80}></FormNumericInputBox>
        </FormCluster>
        <FormCluster title="Physics parameters">
          <FormNumericInputBox label="Specific Heat Capacity of food (in J/gK)" id="shc-food" max={4.5} min={1.0} step={0.05} defaultValue={searchParams.get("shc_food") ? Number.parseFloat(searchParams.get("shc_food")) : 2.7}></FormNumericInputBox>
          <FormNumericInputBox label="Specific Heat Capacity of cookware (in J/gK)" id="shc-cookware" max={1.0} min={0.1} step={0.05} defaultValue={0.5}></FormNumericInputBox>
        </FormCluster>
      </form >
    </div >
  );
}
