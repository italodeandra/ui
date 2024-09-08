export default function formatTime(time: number) {
  const totalSeconds = Math.floor(time / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const remainingSeconds = totalSeconds % 60;

  let formattedTime = "";

  if (hours > 0) {
    formattedTime += `${hours}h `;
  }
  if (minutes > 0) {
    formattedTime += `${minutes}m `;
  }
  if (remainingSeconds > 0) {
    formattedTime += `${remainingSeconds}s`;
  }

  return formattedTime.trim();
}

export function parseFormattedTime(formattedTime: string) {
  const timeParts = formattedTime.split(" ");
  let totalMilliseconds = 0;

  timeParts.forEach((part) => {
    const unit = part.slice(-1); // Get the last character (h, m, or s)
    const value = parseFloat(part.slice(0, -1)); // Get the numeric value

    if (!isNaN(value)) {
      if (unit === "h") {
        totalMilliseconds += value * 3600000; // Convert hours to milliseconds
      } else if (unit === "m") {
        totalMilliseconds += value * 60000; // Convert minutes to milliseconds
      } else if (unit === "s") {
        totalMilliseconds += value * 1000; // Convert seconds to milliseconds
      }
    }
  });

  return totalMilliseconds;
}
