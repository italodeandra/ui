import { useEffect } from "react";

export const useOnPasteFiles = (
  allowedFileTypes: string[],
  onAcceptFiles: (files: File[]) => void
): void => {
  useEffect(() => {
    document.onpaste = function (event) {
      const items =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (event.clipboardData || (event as any).originalEvent.clipboardData)
          .items;
      for (const index in items) {
        const item = items[index];
        if (item.kind === "file") {
          const file = item.getAsFile();
          if (allowedFileTypes.includes(file.type)) {
            onAcceptFiles([file]);
          }
        }
      }
    };

    return () => {
      document.onpaste = null;
    };
  }, [allowedFileTypes, onAcceptFiles]);
};
