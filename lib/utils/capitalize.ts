export default function capitalize<T extends string | undefined>(text: T) {
  return text
    ?.split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ") as T;
}
