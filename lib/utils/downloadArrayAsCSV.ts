export default function downloadArrayAsCSV(
  data: Array<Array<unknown>>,
  filename = "data.csv",
) {
  // Step 1: Convert the array to a CSV string
  const csvContent: string = data.map((row) => row.join(",")).join("\n");

  // Add BOM for UTF-8 encoding
  const bom = "\uFEFF";

  // Step 2: Create a Blob object from the CSV string with BOM
  const blob: Blob = new Blob([bom + csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  // Step 3: Create a download link for the Blob and trigger a click event on the link
  const link: HTMLAnchorElement = document.createElement("a");
  if (link.download !== undefined) {
    // feature detection
    const url: string = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
