import clsx from "clsx";
import {
  ComponentPropsWithRef,
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDeepCompareEffect, useUpdateEffect } from "react-use";
import {
  defaultHelpTextClassName,
  defaultLabelClassName,
  InputProps,
} from "../Input";
import Button from "../Button";
import FileSelect, { FileSelectProps } from "../FileSelect";
import isomorphicObjectId from "@italodeandra/next/utils/isomorphicObjectId";
import {
  ArrowTopRightOnSquareIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { isEqual } from "lodash";
import Text from "../Text/Text";
import Stack from "../Stack";
import { ArrowDownTrayIcon, DocumentIcon } from "@heroicons/react/24/outline";
import Group from "../Group";
import numeral from "numeral";

export type FileFile = {
  _id: string;
  file: File;
  description?: string;
  name: string;
  type: string;
  size: number;
};

export type FileUrl = {
  _id: string;
  url: string;
  description?: string;
  name: string;
  type: string;
  size: number;
};

export type FileInputFile = FileFile | FileUrl;

const videoExtensions = [".mp4"];
const imageExtensions = [".png", ".jpg", ".jpeg"];

function PreviewFile({
  file,
  readOnly,
  handleDeleteClick,
  downloadText,
  openText,
  preview,
}: {
  file: FileInputFile;
  readOnly?: boolean;
  handleDeleteClick: () => void;
  downloadText: string;
  openText: string;
  preview?: boolean;
}) {
  let url = (file as FileFile).file
    ? URL.createObjectURL((file as FileFile).file)
    : (file as FileUrl).url;

  return (
    <div className="group relative flex items-center justify-center rounded-md bg-zinc-200 dark:bg-zinc-800">
      {preview &&
      (file.type?.startsWith("video") ||
        videoExtensions.some((e) => url.endsWith(e))) ? (
        <video className="max-h-96 rounded-md" src={url} controls />
      ) : preview &&
        (file.type?.startsWith("image") ||
          imageExtensions.some((e) => url.endsWith(e))) ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt={file.description} className="max-h-96 rounded-md" />
      ) : (
        <Group className="max-w-full items-center gap-4 p-3">
          <div className="rounded-lg bg-zinc-300 p-2 dark:bg-zinc-800">
            <DocumentIcon className="h-5 w-5" />
          </div>
          <Stack className="flex-1 gap-1 overflow-hidden">
            <div className="flex-1 truncate" title={file.name}>
              {file.name}
            </div>
            {file.description && <div>{file.description}</div>}
            <Text size="sm">{file.type}</Text>
            {file.size && (
              <Text size="sm">{numeral(file.size).format("0b")}</Text>
            )}
            {!url.startsWith("blob") && (
              <Group className="mr-auto">
                <Button
                  leading={<ArrowTopRightOnSquareIcon />}
                  href={url}
                  target="_blank"
                >
                  {openText}
                </Button>
                <Button
                  leading={<ArrowDownTrayIcon />}
                  href={url}
                  download={file.name}
                >
                  {downloadText}
                </Button>
              </Group>
            )}
          </Stack>
        </Group>
      )}
      {!readOnly && (
        <Button
          icon
          variant="filled"
          color="default"
          className="absolute right-2 top-2 group-hover:opacity-100 sm:opacity-0"
          onClick={handleDeleteClick}
        >
          <TrashIcon />
        </Button>
      )}
    </div>
  );
}

function FileInput(
  {
    error,
    className,
    helpText,
    onChange,
    name,
    limit,
    label,
    id,
    required,
    onMouseOver,
    onMouseOut,
    readOnly,
    defaultValue,
    emptyText = "No files",
    downloadText = "Download",
    openText = "Open",
    preview,
    asyncUpload,
    onRejectFiles,
    ...props
  }: Pick<
    InputProps<false>,
    | "error"
    | "className"
    | "helpText"
    | "name"
    | "label"
    | "id"
    | "required"
    | "onMouseOver"
    | "onMouseOut"
  > &
    Omit<FileSelectProps, "onAcceptFiles" | "onRejectFiles"> & {
      readOnly?: boolean;
      defaultValue?: FileInputFile[];
      onChange?: (event: { target: { value: FileInputFile[] } }) => void;
      emptyText?: string;
      downloadText?: string;
      openText?: string;
      preview?: boolean;
      asyncUpload?: (
        file: FileFile & { _id: string },
      ) => Promise<FileUrl & { _id: string }>;
      onRejectFiles?: (
        files: File[],
        reason: "type" | "size" | "limit" | "upload-error",
      ) => void;
    },
  ref: ForwardedRef<HTMLInputElement>,
) {
  let [uploading, setUploading] = useState(false);
  const [value, setValue] = useState<FileInputFile[]>(defaultValue || []);

  useDeepCompareEffect(() => {
    if (defaultValue && !isEqual(defaultValue, value)) {
      setValue(defaultValue);
    }
  }, [{ defaultValue }]);

  const innerRef = useRef<HTMLInputElement>({
    get value() {
      return value;
    },
    set value(value) {
      setValue(value || []);
    },
  } as unknown as HTMLInputElement);

  useEffect(() => {
    if (ref) {
      if (typeof ref === "function") {
        ref(innerRef.current);
      } else {
        try {
          ref.current = innerRef.current;
        } catch (e) {
          // do nothing
        }
      }
    }
  }, [ref]);

  const handleAcceptFiles = async (files: File[]) => {
    if (!asyncUpload) {
      setValue((value) => [
        ...value,
        ...files
          .filter((_file, index) => !limit || index <= limit - value.length - 1)
          .map((file) => ({
            _id: isomorphicObjectId().toString(),
            name: file.name,
            file,
            type: file.type,
            size: file.size,
          })),
      ]);
    } else {
      setUploading(true);
      if (onRejectFiles) {
        let rejectedFilesLimit = files.filter(
          (_file, index) => !(!limit || index <= limit - value.length - 1),
        );
        if (rejectedFilesLimit.length) {
          onRejectFiles(rejectedFilesLimit, "limit");
        }
      }
      let acceptedFiles = files.filter(
        (_file, index) => !limit || index <= limit - value.length - 1,
      );
      let filesNotUploaded: typeof acceptedFiles = [];
      for (let file of acceptedFiles) {
        try {
          let uploadedFile = await asyncUpload({
            _id: isomorphicObjectId().toString(),
            name: file.name,
            file,
            type: file.type,
            size: file.size,
          });
          setValue((value) => [...value, uploadedFile]);
        } catch (e) {
          filesNotUploaded.push(file);
        }
      }
      if (onRejectFiles && filesNotUploaded.length) {
        onRejectFiles(filesNotUploaded, "upload-error");
      }
      setUploading(false);
    }
  };

  useUpdateEffect(() => {
    if (onChange) {
      onChange({
        target: {
          name,
          value: value.map((file) => ({
            _id: file._id,
            url: (file as FileFile).file
              ? URL.createObjectURL((file as FileFile).file)
              : (file as FileUrl).url,
            description: file.description,
            name: (file as FileUrl).name,
            type: file.type,
            size: file.size,
          })),
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleDeleteClick = useCallback(
    (clickedFile: FileInputFile) => () => {
      setValue((value) => [...value.filter((file) => file !== clickedFile)]);
    },
    [],
  );

  return (
    <div
      className={clsx("relative", className, {
        ["error"]: error,
      })}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      {label && (
        <label htmlFor={id} className={defaultLabelClassName}>
          {label}
          {required && (
            <>
              {" "}
              <span className="text-red-500">*</span>
            </>
          )}
        </label>
      )}
      <div
        className={clsx("grid grid-cols-1 gap-4", {
          "md:grid-cols-2": !!value.length,
          "min-h-[140px]": !!value.length || !readOnly,
        })}
      >
        {value.map((file, i) => (
          <PreviewFile
            key={i}
            file={file}
            readOnly={readOnly}
            handleDeleteClick={handleDeleteClick(file)}
            downloadText={downloadText}
            preview={preview}
            openText={openText}
          />
        ))}
        {readOnly && !value.length && (
          <Text variant="secondary">{emptyText}</Text>
        )}
        {!readOnly && (!limit || value.length < limit) && (
          <FileSelect
            {...props}
            id={id}
            onAcceptFiles={handleAcceptFiles}
            limit={limit ? limit - value.length : undefined}
            uploading={uploading}
            onRejectFiles={onRejectFiles}
          />
        )}
      </div>
      {helpText && <div className={defaultHelpTextClassName}>{helpText}</div>}
    </div>
  );
}

export type FileInputProps = ComponentPropsWithRef<typeof FileInput>;

export default forwardRef(FileInput);
