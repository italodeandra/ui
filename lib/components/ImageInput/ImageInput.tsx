import clsx from "clsx";
import {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useUpdateEffect } from "react-use";
import {
  defaultHelpTextClassName,
  defaultLabelClassName,
  InputProps,
} from "../Input/Input";
import Button from "../Button/Button";
import FileSelect, { FileSelectProps } from "../FileSelect/FileSelect";
import isomorphicObjectId from "@italodeandra/next/utils/isomorphicObjectId";
import { TrashIcon } from "@heroicons/react/20/solid";

export type ImageFile = {
  file: File;
  description?: string;
};

export type ImageUrl = {
  url: string;
  description?: string;
};

export type Image = ImageFile | ImageUrl;

function ImageInput(
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
    ...props
  }: Pick<
    InputProps<false>,
    | "error"
    | "className"
    | "helpText"
    | "onChange"
    | "name"
    | "label"
    | "id"
    | "required"
    | "onMouseOver"
    | "onMouseOut"
  > &
    Omit<FileSelectProps, "onAcceptFiles">,
  ref: ForwardedRef<HTMLInputElement>
) {
  const [value, setValue] = useState<Image[]>([]);

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
        .filter((file, index) => !limit || index <= limit - value.length - 1)
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
            url: (image as ImageFile).file
              ? URL.createObjectURL((image as ImageFile).file)
              : (image as ImageUrl).url,
            description: image.description,
          })),
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleDeleteClick = useCallback(
    (clickedFile: Image) => () => {
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
          <div
            key={i}
            className="relative flex items-center justify-center rounded-md bg-gray-200 dark:bg-zinc-800"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                (image as ImageFile).file
                  ? URL.createObjectURL((image as ImageFile).file)
                  : (image as ImageUrl).url
              }
              alt={image.description}
              className="max-h-96 rounded-md"
            />
            <Button
              icon
              variant="light"
              color="white"
              className="absolute right-2 top-2"
              onClick={handleDeleteClick(image)}
            >
              <TrashIcon />
            </Button>
          </div>
        ))}
        {(!limit || value.length < limit) && (
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

export default forwardRef(ImageInput);
