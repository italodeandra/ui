import { ComponentProps } from "react";
import Input, { InputProps } from "./Input";
import { NumericFormat, NumericFormatProps } from "react-number-format";

function NumericInput(
  props: Omit<NumericFormatProps, "customInput"> & InputProps<undefined>,
) {
  return <NumericFormat customInput={Input} {...props} />;
}

// noinspection JSUnusedGlobalSymbols
export type NumericInputProps = ComponentProps<typeof NumericInput>;

export default NumericInput;
