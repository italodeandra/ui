import { ComponentProps, ForwardedRef, forwardRef } from "react";
import Input, { InputProps } from "./Input";
import { NumericFormat, NumericFormatProps } from "react-number-format";

function NumericInput(
  props: Omit<NumericFormatProps, "customInput"> & InputProps<undefined>,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return <NumericFormat getInputRef={ref} customInput={Input} {...props} />;
}

// noinspection JSUnusedGlobalSymbols
export type NumericInputProps = ComponentProps<typeof NumericInput>;

export default forwardRef(NumericInput);
