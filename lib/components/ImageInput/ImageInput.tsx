import { ComponentProps, ForwardedRef, forwardRef } from "react";
import FileInput from "../FileInput";

const defaultIcon = (
  <svg stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
    <path
      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function ImageInput(
  {
    icon = defaultIcon,
    uploadAFileText = "Upload an image",
    allowedFileTypes = [".png", ".jpg", ".jpeg", ".webp"],
    preview = true,
    ...props
  }: ComponentProps<typeof FileInput>,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <FileInput
      ref={ref}
      {...props}
      icon={icon}
      uploadAFileText={uploadAFileText}
      allowedFileTypes={allowedFileTypes}
      preview={preview}
    />
  );
}

export default forwardRef(ImageInput);
