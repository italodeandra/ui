import Input, { InputProps } from "../Input/Input";
import TextareaAutosize from "react-textarea-autosize";
import { TextareaAutosizeProps } from "react-textarea-autosize/dist/declarations/src";
import { ForwardedRef, forwardRef } from "react";

export type TextareaProps = InputProps<false> &
  Partial<
    Pick<
      TextareaAutosizeProps,
      "maxRows" | "minRows" | "onHeightChange" | "cacheMeasurements"
    >
  >;

function Textarea(
  props: TextareaProps,
  ref: ForwardedRef<HTMLTextAreaElement>
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <Input as={TextareaAutosize} {...(props as any)} ref={ref} />;
}

export default forwardRef(Textarea);
