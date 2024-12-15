// noinspection JSUnusedGlobalSymbols
export function stripLineBreak(input?: string) {
  return input?.trim().replaceAll("\r", "").replaceAll("\n", "");
}
