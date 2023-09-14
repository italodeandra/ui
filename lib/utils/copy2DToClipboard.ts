// copied from https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
function fallbackCopyTextToClipboard(text: string) {
  const textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    // noinspection JSDeprecatedSymbols
    document.execCommand("copy");
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
  }

  document.body.removeChild(textArea);
}

function copyTextToClipboard(text: string) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(
    function () {
      // console.log('Async: Copying to clipboard was successful!');
    },
    function (err) {
      console.error("Async: Could not copy text: ", err);
    }
  );
}

export default function copy2DToClipboard(array: (string | number)[][]) {
  let csv = "",
    row,
    cell;
  for (row = 0; row < array.length; row++) {
    for (cell = 0; cell < array[row].length; cell++) {
      csv += (array[row][cell] + "").replace(/[\n\t]+/g, " ");
      if (cell + 1 < array[row].length) csv += "\t";
    }
    if (row + 1 < array.length) csv += "\n";
  }
  copyTextToClipboard(csv);
}
