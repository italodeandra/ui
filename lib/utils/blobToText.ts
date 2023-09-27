export default function blobToText(file: Blob, encoding?: string) {
  const reader = new FileReader();

  return new Promise<string>((resolve, reject) => {
    reader.onload = function (e) {
      const contents = e.target?.result as string;

      resolve(contents);
    };

    reader.onerror = function (e) {
      reject(e.target?.error);
    };

    reader.readAsText(file, encoding);
  });
}
