import clsx from "clsx";
import {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAsync, useDeepCompareEffect, useUpdateEffect } from "react-use";
import {
  defaultHelpTextClassName,
  defaultLabelClassName,
  InputProps,
} from "../Input";
import Button from "../Button";
import FileSelect, { FileSelectProps } from "../FileSelect";
import isomorphicObjectId from "@italodeandra/next/utils/isomorphicObjectId";
import { TrashIcon } from "@heroicons/react/20/solid";
import { isEqual } from "lodash";
import Text from "../Text/Text";
import { blobUrlToObject } from "@italodeandra/next/fileStorage/converters";
import Stack from "../Stack";
import { ArrowDownTrayIcon, DocumentIcon } from "@heroicons/react/24/outline";
import Group from "../Group";

export type FileFile = {
  file: File;
  description?: string;
  name: string;
};

export type FileUrl = {
  url: string;
  description?: string;
  name: string;
};

export type FileInputFile = FileFile | FileUrl;

function PreviewFile({
  file,
  readOnly,
  handleDeleteClick,
  downloadText,
}: {
  file: FileInputFile;
  readOnly?: boolean;
  handleDeleteClick: () => void;
  downloadText: string;
}) {
  let url = (file as FileFile).file
    ? URL.createObjectURL((file as FileFile).file)
    : (file as FileUrl).url;
  let { value: fileFromFileOrUrl } = useAsync(
    async () => (file as FileFile).file || (await blobUrlToObject(url))
  );

  if (!fileFromFileOrUrl) {
    return null;
  }

  return (
    <div className="group relative flex items-center justify-center rounded-md bg-zinc-200 dark:bg-zinc-800">
      {fileFromFileOrUrl?.type.startsWith("video") ? (
        <video className="max-h-96 rounded-md" src={url} controls />
      ) : fileFromFileOrUrl?.type.startsWith("image") ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt={file.description} className="max-h-96 rounded-md" />
      ) : (
        <Group className="items-center gap-4 p-3">
          <div className="rounded-lg bg-zinc-300 p-2 dark:bg-zinc-800">
            <DocumentIcon className="h-5 w-5" />
          </div>
          <Stack className="gap-1">
            <div>{file.name}</div>
            {file.description && <div>{file.description}</div>}
            <Text size="sm">{fileFromFileOrUrl.type}</Text>
            <Button leading={<ArrowDownTrayIcon />} className="mr-auto">
              {downloadText}
            </Button>
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
    Omit<FileSelectProps, "onAcceptFiles"> & {
      readOnly?: boolean;
      defaultValue?: FileInputFile[];
      onChange?: (event: { target: { value: FileInputFile[] } }) => void;
      emptyText?: string;
      downloadText?: string;
    },
  ref: ForwardedRef<HTMLInputElement>
) {
  const [value, setValue] = useState<FileInputFile[]>(defaultValue || []);

  useDeepCompareEffect(() => {
    if (defaultValue && !isEqual(defaultValue, value)) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

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

  const handleAcceptFiles = (files: File[]) => {
    setValue((value) => [
      ...value,
      ...files
        .filter((_file, index) => !limit || index <= limit - value.length - 1)
        .map((file) => ({
          _id: isomorphicObjectId(),
          name: file.name,
          file,
        })),
    ]);
  };

  useUpdateEffect(() => {
    if (onChange) {
      onChange({
        target: {
          name,
          value: value.map((image) => ({
            url: (image as FileFile).file
              ? URL.createObjectURL((image as FileFile).file)
              : (image as FileUrl).url,
            description: image.description,
            name: (image as FileUrl).name,
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
    []
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
          {required && " *"}
        </label>
      )}
      <div
        className={clsx("grid grid-cols-1 gap-4", {
          "md:grid-cols-2": !!value.length,
        })}
      >
        {value.map((image, i) => (
          <PreviewFile
            key={i}
            file={image}
            readOnly={readOnly}
            handleDeleteClick={handleDeleteClick(image)}
            downloadText={downloadText}
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
          />
        )}
      </div>
      {helpText && <div className={defaultHelpTextClassName}>{helpText}</div>}
    </div>
  );
}

export default forwardRef(FileInput);
