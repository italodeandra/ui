// noinspection SpellCheckingInspection

const from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
const to = "aaaaaeeeeeiiiiooooouuuunc------";

export default function slugify(text?: string): string | undefined {
  if (!text) return text;

  text = text.replace(/^\s+|\s+$/g, ""); // trim
  text = text.toLowerCase();

  // remove accents, swap ñ for n, etc
  for (let i = 0, l = from.length; i < l; i++) {
    text = text.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  text = text
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return text;
}
