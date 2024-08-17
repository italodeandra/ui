// noinspection JSUnusedGlobalSymbols
export function stripHtml(input?: string) {
  return input?.replace(/<\/?[^>]+(>|$)/g, "");
}

// noinspection JSUnusedGlobalSymbols
export function stripLineBreak(input?: string) {
  return input?.trim().replaceAll("\r", "").replaceAll("\n", "");
}
