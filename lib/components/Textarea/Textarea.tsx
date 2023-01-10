import Input, { InputProps } from "../Input/Input";
import TextareaAutosize from "react-textarea-autosize";
import { TextareaAutosizeProps } from "react-textarea-autosize/dist/declarations/src";

export type TextareaProps = InputProps<false> &
  Partial<
    Pick<
      TextareaAutosizeProps,
      "maxRows" | "minRows" | "onHeightChange" | "cacheMeasurements"
    >
  >;

export default function Textarea(props: TextareaProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <Input as={TextareaAutosize} {...(props as any)} />;
}
