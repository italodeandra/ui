import { ComponentProps } from "react";
import Input, { InputProps } from "./Input";
import { PatternFormat, PatternFormatProps } from "react-number-format";

function PatternInput(
  props: Omit<PatternFormatProps, "customInput"> & InputProps<undefined>,
) {
  return <PatternFormat customInput={Input} {...props} />;
}

// noinspection JSUnusedGlobalSymbols
export type PatternInputProps = ComponentProps<typeof PatternInput>;

export default PatternInput;
