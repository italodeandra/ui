import {
  ChangeEventHandler,
  ForwardedRef,
  forwardRef,
  ReactNode,
  useEffect,
  useId,
} from "react";
import clsx from "clsx";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend, NativeTypes } from "react-dnd-html5-backend";
import numeral from "numeral";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";

const translateAllowedType = (type: string) =>
  ({
    "image/png": "PNG",
    ".png": "PNG",
    "image/jpeg": "JPG",
    ".jpg": "JPG",
    ".jpeg": "JPG",
    ".gif": "GIF",
    "image/gif": "GIF",
    image: "GIF",
  }[type]);

export interface FileSelectProps {
  uploadAFileText?: string;
  orDragAndDropText?: string;
  upToText?: string;
  anyFileText?: string;
  dropFilesHereText?: string;
  maxFileSize?: number | string;
  allowedFileTypes?: string[];
  id?: string;
  limit?: number;
  onAcceptFiles: (files: File[]) => void;
  helperText?: string;
  className?: string;
  error?: boolean;
}

function FileSelect(
  {
    maxFileSize,
    allowedFileTypes,
    id,
    limit,
    onAcceptFiles,
    className,
    uploadAFileText = "Upload a file",
    orDragAndDropText = "or drag and drop",
    upToText = "up to",
    anyFileText = "Any file",
    dropFilesHereText = "Drop files here",
  }: FileSelectProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const innerId = useId();
  id = id || innerId;
  maxFileSize =
    typeof maxFileSize === "string"
      ? numeral(maxFileSize).value() || undefined
      : maxFileSize;
  maxFileSize = maxFileSize || numeral("10MB").value() || undefined;

  const handleFileBrowse: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!event.target.files) {
      throw Error("Files is falsy");
    }
    let files = Array.from(event.target.files);
    files = files.filter(
      (file) => !allowedFileTypes || allowedFileTypes.includes(file.type)
    );
    onAcceptFiles(files);
    event.target.value = "";
  };

  useOnPasteFiles(onAcceptFiles, allowedFileTypes);

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: [NativeTypes.FILE],
    drop(item: { files: File[] }) {
      let files = item.files;
      files = files.filter(
        (file) => !allowedFileTypes || allowedFileTypes.includes(file.type)
      );
      onAcceptFiles(files);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={clsx(
        "flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6 dark:border-gray-700",
        className,
        {
          "border-primary-300 dark:border-primary-700": isOver,
        }
      )}
    >
      {!canDrop ? (
        <div className="relative flex flex-col items-center justify-center space-y-1 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="text-sm">
            <label
              htmlFor={id}
              className="dark:ring-offset-darkBackground relative cursor-pointer rounded-md font-medium text-primary-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 hover:text-primary-500"
            >
              <span>{uploadAFileText}</span>
              <input
                id={id}
                name={id}
                type="file"
                className="sr-only"
                accept={allowedFileTypes?.join(",")}
                onChange={handleFileBrowse}
                multiple={limit !== 1}
                ref={ref}
              />
            </label>
            <span className="pl-1">{orDragAndDropText}</span>
          </div>
          <p className="text-xs text-gray-500">
            {allowedFileTypes
              ? allowedFileTypes.map(translateAllowedType).join(", ")
              : anyFileText}{" "}
            {upToText} {numeral(maxFileSize).format("0b")}
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center">
          <ArrowUpTrayIcon
            className={clsx("mb-2 w-10 text-7xl", {
              "text-primary-500": isOver,
            })}
          />
          <div>{dropFilesHereText}</div>
        </div>
      )}
    </div>
  );
}

export default forwardRef(FileSelect);

const useOnPasteFiles = (
  onAcceptFiles: (files: File[]) => void,
  allowedFileTypes?: string[]
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
          if (!allowedFileTypes || allowedFileTypes.includes(file.type)) {
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

export function FileSelectProvider({ children }: { children: ReactNode }) {
  return <DndProvider backend={HTML5Backend}>{children}</DndProvider>;
}
