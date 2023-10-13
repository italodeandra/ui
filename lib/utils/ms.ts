import vms from "ms";

const locale: Record<string, Record<string, string>> = {
  ["en"]: {
    days: "days",
    hours: "hours",
    minutes: "minutes",
    seconds: "seconds",
  },
  ["pt-BR"]: {
    days: "dias",
    hours: "horas",
    minutes: "minutos",
    seconds: "segundos",
  },
  ["undefined"]: {
    days: "days",
    hours: "hours",
    seconds: "seconds",
    minutes: "minutes",
  },
};

export function ms(
  value: number,
  options?: { long: boolean; locale?: string }
): string;
export function ms(value: string): number;
export function ms(
  value: number | string,
  options?: { long: boolean; locale?: string }
) {
  if (typeof value === "number") {
    return vms(value, options)
      .replace("days", locale[String(options?.locale)].days)
      .replace("hours", locale[String(options?.locale)].hours)
      .replace("minutes", locale[String(options?.locale)].minutes)
      .replace("seconds", locale[String(options?.locale)].seconds);
  }
  return vms(value);
}
