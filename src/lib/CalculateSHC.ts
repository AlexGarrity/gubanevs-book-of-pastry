interface CalculatorParameters {
  flour?: number
  butter?: number
  water?: number
  sugar?: number
  oil?: number
}

function validateNumber (value: null | undefined | number): number {
  if (value == null) {
    return 0
  }

  if (value === undefined) {
    return 0
  }

  return value
}

export default function CalculateSHC ({
  flour,
  butter,
  water,
  sugar,
  oil
}: CalculatorParameters): string {
  const FLOUR_SHC = 1.59
  const WATER_SHC = 4.18
  const BUTTER_SHC = 2.72
  const SUGAR_SHC = 1.24
  const OIL_SHC = 1.75

  flour = validateNumber(flour)
  butter = validateNumber(butter)
  water = validateNumber(water)
  sugar = validateNumber(sugar)
  oil = validateNumber(oil)

  const totalParts = flour + butter + water + sugar + oil
  const flourShc = flour * FLOUR_SHC
  const butterShc = butter * BUTTER_SHC
  const waterShc = water * WATER_SHC
  const sugarShc = sugar * SUGAR_SHC
  const oilShc = oil * OIL_SHC

  return (
    (flourShc + butterShc + waterShc + sugarShc + oilShc) /
    totalParts
  ).toPrecision(3)
}
