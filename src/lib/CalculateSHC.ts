interface CalculatorParameters {
  flour?: number;
  butter?: number;
  water?: number;
  sugar?: number;
  oil?: number;
}

export default function CalculateSHC({
  flour,
  butter,
  water,
  sugar,
  oil,
}: CalculatorParameters) {
  const FLOUR_SHC = 1.59;
  const WATER_SHC = 4.18;
  const BUTTER_SHC = 2.72;
  const SUGAR_SHC = 1.24;
  const OIL_SHC = 1.75;

  flour = !flour ? 0 : flour;
  butter = !butter ? 0 : butter;
  water = !water ? 0 : water;
  sugar = !sugar ? 0 : sugar;
  oil = !oil ? 0 : oil;

  const totalParts = flour + butter + water + sugar + oil;
  const flourShc = flour * FLOUR_SHC;
  const butterShc = butter * BUTTER_SHC;
  const waterShc = water * WATER_SHC;
  const sugarShc = sugar * SUGAR_SHC;
  const oilShc = oil * OIL_SHC;

  return (
    (flourShc + butterShc + waterShc + sugarShc + oilShc) /
    totalParts
  ).toPrecision(3);
}
