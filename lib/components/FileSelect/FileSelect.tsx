import {
  ChangeEventHandler,
  cloneElement,
  ForwardedRef,
  forwardRef,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useId,
  useState,
} from "react";
import clsx from "../../utils/clsx";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend, NativeTypes } from "react-dnd-html5-backend";
import numeral from "numeral";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { DocumentIcon } from "@heroicons/react/24/outline";
import Loading from "../Loading";

const translateAllowedType = (type: string) =>
  ({
    "image/png": "PNG",
    ".png": "PNG",
    "image/jpeg": "JPG",
    ".jpg": "JPG",
    ".jpeg": "JPG",
    ".gif": "GIF",
    "image/gif": "GIF",
    "video/mp4": "MP4",
    ".mp4": "MP4",
    ".csv": "CSV",
    "audio/mpeg": "MP3",
    "application/pdf": "PDF",
    "text/csv": "CSV",
    "application/msword": "DOC",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "DOCX",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      "PPTX",
    ".webp": "WEBP",
    "image/webp": "WEBP",
  })[type];

export interface FileSelectProps {
  uploadAFileText?: string;
  orDragAndDropText?: string;
  upToText?: string;
  anyFileText?: string;
  dropFilesHereText?: string;
  uploadingText?: string;
  maxFileSize?: number | string;
  allowedFileTypes?: string[];
  id?: string;
  limit?: number;
  onAcceptFiles: (files: File[]) => void;
  onRejectFiles?: (files: File[], reason: "type" | "size") => void;
  helperText?: string;
  className?: string;
  error?: boolean;
  icon?: ReactElement;
  uploading?: boolean;
  disabled?: boolean;
  additionalBottomInfo?: ReactNode;
}

const defaultIcon = <DocumentIcon />;

function checkAllowedFileTypesFn(file: File, allowedFileTypes?: string[]) {
  return (
    !allowedFileTypes ||
    allowedFileTypes.includes(file.type) ||
    allowedFileTypes.some((t) => file.name.endsWith(t))
  );
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
    uploadingText = "Uploading...",
    icon = defaultIcon,
    uploading,
    disabled,
    additionalBottomInfo,
    onRejectFiles,
    error,
  }: FileSelectProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const innerId = useId();
  id = id || innerId;
  maxFileSize =
    typeof maxFileSize === "string"
      ? numeral(maxFileSize).value() || undefined
      : maxFileSize;
  maxFileSize = maxFileSize || numeral("10MB").value() || undefined;

  const checkAllowedFileTypes = useCallback(
    (file: File) => checkAllowedFileTypesFn(file, allowedFileTypes),
    [allowedFileTypes],
  );

  const handleFileBrowse: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!event.target.files) {
      throw Error("Files is falsy");
    }
    const files = Array.from(event.target.files);
    const acceptedFiles = files.filter(
      (file) =>
        checkAllowedFileTypes(file) && file.size <= (maxFileSize as number),
    );
    if (onRejectFiles) {
      const rejectedFilesType = files.filter(
        (file) => !checkAllowedFileTypes(file),
      );
      if (rejectedFilesType.length) {
        onRejectFiles(rejectedFilesType, "type");
      }
      const rejectedFilesSize = files.filter(
        (file) => file.size > (maxFileSize as number),
      );
      if (rejectedFilesSize.length) {
        onRejectFiles(rejectedFilesSize, "size");
      }
    }
    onAcceptFiles(acceptedFiles);
    event.target.value = "";
  };

  const [pasteEnabled, setPasteEnabled] = useState(false);
  useOnPasteFiles(pasteEnabled, onAcceptFiles, allowedFileTypes);

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: [NativeTypes.FILE],
    drop(item: { files: File[] }) {
      if (!disabled) {
        let files = item.files;
        files = files.filter(checkAllowedFileTypes);
        onAcceptFiles(files);
      }
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
        "flex justify-center rounded-md border-2 border-dashed px-6 pb-6 pt-5",
        className,
        {
          "border-primary-300 dark:border-primary-700": isOver,
          "border-zinc-300 hover:border-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-600":
            !disabled && !error,
          "cursor-not-allowed border-zinc-200 dark:border-zinc-800": disabled,
          "border-error-500": error,
        },
      )}
      onMouseMove={!disabled ? () => setPasteEnabled(true) : undefined}
      onMouseOut={!disabled ? () => setPasteEnabled(false) : undefined}
    >
      {uploading ? (
        <div className="flex flex-col items-center justify-center text-center">
          <Loading
            className={clsx("mb-2 h-10 w-10", {
              "text-primary-500": isOver,
            })}
          />
          <div>{uploadingText}</div>
        </div>
      ) : !canDrop || disabled ? (
        <div className="relative flex flex-col items-center justify-center space-y-1 text-center">
          {cloneElement(icon, {
            className: clsx(
              "mx-auto h-12 w-12 text-zinc-400",
              icon.props.className,
            ),
          })}
          <div className="text-sm">
            <label
              htmlFor={id}
              className={clsx(
                "relative rounded-md font-medium text-primary-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 hover:text-primary-500 dark:ring-offset-slate-900",
                {
                  "cursor-pointer": !disabled,
                  "cursor-not-allowed": disabled,
                },
              )}
            >
              <span>{uploadAFileText}</span>
              {!disabled && (
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
              )}
            </label>
            <span className="pl-1">{orDragAndDropText}</span>
          </div>
          <p className="text-xs text-zinc-500">
            {allowedFileTypes
              ? allowedFileTypes.map(translateAllowedType).join(", ")
              : anyFileText}{" "}
            {upToText} {numeral(maxFileSize).format("0b")}
          </p>
          {additionalBottomInfo}
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
  enabled: boolean,
  onAcceptFiles: (files: File[]) => void,
  allowedFileTypes?: string[],
): void => {
  useEffect(() => {
    if (enabled) {
      document.onpaste = function (event) {
        const items =
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (event.clipboardData || (event as any).originalEvent.clipboardData)
            .items;
        for (const index in items) {
          const item = items[index];
          if (item.kind === "file") {
            const file = item.getAsFile();
            if (checkAllowedFileTypesFn(file, allowedFileTypes)) {
              onAcceptFiles([file]);
            }
          }
        }
      };

      return () => {
        document.onpaste = null;
      };
    }
  }, [allowedFileTypes, enabled, onAcceptFiles]);
};

export function FileSelectProvider({ children }: { children: ReactNode }) {
  return <DndProvider backend={HTML5Backend}>{children}</DndProvider>;
}
