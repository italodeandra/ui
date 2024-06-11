export function stripHtml(input?: string) {
  return input?.replace(/<\/?[^>]+(>|$)/g, "");
}

export function stripLineBreak(input?: string) {
  return input?.trim().replaceAll("\r", "").replaceAll("\n", "");
}
