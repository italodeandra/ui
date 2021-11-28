import MuiFormLabel, { FormLabelProps } from "@mui/material/FormLabel";
import { styled, CSSObject, Theme } from "@mui/material/styles";
import { VFC } from "react";

export type { FormLabelProps };

export const formLabelStyles = (theme: Theme): CSSObject => ({
  fontSize: theme.typography.pxToRem(14),
  fontWeight: 500,
  marginBottom: theme.spacing(0.5),
  maxWidth: "100%",
  padding: 0,
  position: "relative",
  transform: "none",
});

const FormLabel = styled<VFC<FormLabelProps>>(MuiFormLabel)(({ theme }) =>
  formLabelStyles(theme)
);

export default FormLabel;
