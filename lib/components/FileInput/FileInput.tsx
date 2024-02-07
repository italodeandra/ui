import clsx from "../../utils/clsx";
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
import FileSelect, { FileSelectProps } from "../FileSelect";
import isomorphicObjectId from "@italodeandra/next/utils/isomorphicObjectId";
import { isEqual } from "lodash";
import Text from "../Text/Text";
import { PreviewFile } from "./PreviewFile";

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
    value,
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
      value?: FileInputFile[];
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
  const [innerValue, setInnerValue] = useState<FileInputFile[]>(value || []);

  useDeepCompareEffect(() => {
    if (value && !isEqual(value, innerValue)) {
      setInnerValue(value);
    }
  }, [{ value: value }]);

  const innerRef = useRef<HTMLInputElement>({
    get value() {
      return innerValue;
    },
    set value(value) {
      setInnerValue(value || []);
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
      setInnerValue((value) => [
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
          (_file, index) => !(!limit || index <= limit - innerValue.length - 1),
        );
        if (rejectedFilesLimit.length) {
          onRejectFiles(rejectedFilesLimit, "limit");
        }
      }
      let acceptedFiles = files.filter(
        (_file, index) => !limit || index <= limit - innerValue.length - 1,
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
          setInnerValue((value) => [...value, uploadedFile]);
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
          value: innerValue.map((file) => ({
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
  }, [innerValue]);

  const handleDeleteClick = useCallback(
    (clickedFile: FileInputFile) => () => {
      setInnerValue((value) => [
        ...value.filter((file) => file !== clickedFile),
      ]);
    },
    [],
  );

  return (
    <div
      data-input-name={name}
      data-error={error}
      className={clsx("relative", className)}
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
          "md:grid-cols-2": !!innerValue.length,
          "min-h-[140px]": !!innerValue.length || !readOnly,
        })}
      >
        {innerValue.map((file, i) => (
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
        {readOnly && !innerValue.length && (
          <Text variant="secondary">{emptyText}</Text>
        )}
        {!readOnly && (!limit || innerValue.length < limit) && (
          <FileSelect
            {...props}
            id={id}
            onAcceptFiles={handleAcceptFiles}
            limit={limit ? limit - innerValue.length : undefined}
            uploading={uploading}
            onRejectFiles={onRejectFiles}
            error={error}
          />
        )}
      </div>
      {helpText && (
        <div
          className={clsx(
            defaultHelpTextClassName,
            "[[data-error]_&]:text-error-500",
          )}
        >
          {helpText}
        </div>
      )}
    </div>
  );
}

// noinspection JSUnusedGlobalSymbols
export type FileInputProps = ComponentPropsWithRef<typeof FileInput>;

export default forwardRef(FileInput);
