/**
 * Gets all the initials of a name.
 */
export default function getInitials(name: string, separator = " "): string {
  const splitName = name.split(separator).slice(0, 2);
  const splitInitials = splitName.map((n) => n.charAt(0));
  return splitInitials.join("");
}
