// lib/constants.ts
export const DIMENSION_UNITS = [
  { value: 'in', label: 'Inches (in)' },
  { value: 'cm', label: 'Centimeters (cm)' },
  { value: 'mm', label: 'Millimeters (mm)' },
] as const

export type DimensionUnit = (typeof DIMENSION_UNITS)[number]['value']

/** Pretty-print dimensions like "12 × 8 × 4 in" — omits missing values. */
export function formatDimensions(
  length?: number | string | null,
  width?: number | string | null,
  depth?: number | string | null,
  unit: DimensionUnit = 'in'
): string {
  const parts = [length, width, depth]
    .map((v) => (v === null || v === undefined || v === '' ? null : Number(v)))
    .filter((v): v is number => v !== null && !Number.isNaN(v))

  if (parts.length === 0) return ''
  return `${parts.join(' × ')} ${unit}`
}