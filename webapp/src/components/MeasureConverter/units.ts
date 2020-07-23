export const LENGTH = 'LENGTH'
export const MASS = 'MASS'
export const TEMPERATURE = 'TEMPERATURE'
export const WEIGHT = 'WEIGHT'

export type Unit = {
  id: string
  labels: string[]
  kind: typeof LENGTH | typeof MASS | typeof TEMPERATURE | typeof WEIGHT
  toSI:
    | number
    | { to: (original: number) => number; from: (si: number) => number }
}

const units: Unit[] = [
  // Length
  { id: 'meter', labels: ['Meters', 'm', 'Meter'], kind: LENGTH, toSI: 1.0 },
  {
    id: 'centimeter',
    labels: ['Centimeters', 'cm', 'Centimeter'],
    kind: LENGTH,
    toSI: 0.01,
  },
  { id: 'foot', labels: ['Feet', 'ft', 'Foot'], kind: LENGTH, toSI: 0.3048 },
  { id: 'inch', labels: ['Inches', 'in', 'Inch'], kind: LENGTH, toSI: 0.0254 },
  { id: 'yard', labels: ['Yards', 'yd', 'Yard'], kind: LENGTH, toSI: 0.9144 },

  // Mass
  { id: 'gram', labels: ['Grams', 'g', 'Gram'], kind: MASS, toSI: 1.0 },
  {
    id: 'kilogram',
    labels: ['Kilograms', 'kg', 'Kilogram'],
    kind: MASS,
    toSI: 1000.0,
  },
  {
    id: 'pound',
    labels: ['Pounds', 'lbs', 'Pound', 'lb'],
    kind: MASS,
    toSI: 453.592,
  },
  {
    id: 'ounce',
    labels: ['Ounces', 'oz', 'Ounce'],
    kind: MASS,
    toSI: 28.349500000294,
  },

  // Temperature
  {
    id: 'celsius',
    labels: ['Degrees Celcius', 'C', 'Celcius'],
    kind: TEMPERATURE,
    toSI: 1,
  },
  {
    id: 'fahrenheit',
    labels: ['Degrees Fahrenheit', 'F', 'Fahrenheit'],
    kind: TEMPERATURE,
    toSI: {
      to: (f: number) => (f - 32) * (5 / 9),
      from: (c: number) => c * (9 / 5) + 32,
    },
  },
]

const Units: Map<string, Unit> = new Map()
units.forEach((u) => Units.set(u.id, u))

export default Units
