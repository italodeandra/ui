export default function filterBoolean<T>(array: (T | null | undefined)[]): T[] {
  return array.filter(Boolean) as T[];
}
