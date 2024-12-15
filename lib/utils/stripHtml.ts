// noinspection JSUnusedGlobalSymbols
export function stripHtml(input?: string) {
  return input?.replace(/<\/?[^>]+(>|$)/g, "");
}
