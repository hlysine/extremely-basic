export type PressureUnit = 'kPa' | 'mmHg';

export const PressureUnits: PressureUnit[] = ['kPa', 'mmHg'];

type ToNumber<T, Arr extends number[] = []> = T extends [unknown, ...infer Rest]
  ? ToNumber<Rest, [number, ...Arr]>
  : Arr;

export function safeCompute<const T extends unknown[]>(
  operation: (...args: ToNumber<T>) => number,
  args: T
) {
  for (const arg of args) {
    if (typeof arg !== 'number' || Number.isNaN(arg)) {
      return '-';
    }
  }
  const result = operation(...(args as unknown as ToNumber<T>));
  return Number.isNaN(result) ? '-' : result;
}

export function format(value: React.ReactNode) {
  if (typeof value === 'number') {
    return value.toLocaleString(undefined, {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    });
  }
  return value;
}

export interface WikiMeta {
  title: string;
  section: string;
  keywords: string[];
}

export interface WikiPage extends WikiMeta {
  key: string;
}
