/* istanbul ignore file */

import { styled, Theme, TypographyStyle } from "@mui/material/styles";
import MuiTypography, {
  TypographyProps as MuiTypographyProps,
} from "@mui/material/Typography";
import * as React from "react";
import { ElementType, forwardRef, VFC } from "react";
import Gray from "../../styles/colors/Gray";
import { OverridableStringUnion } from "@mui/types";
// eslint-disable-next-line no-restricted-imports
import { Variant } from "@mui/material/styles/createTypography";
import { TypographyPropsVariantOverrides } from "@mui/material/Typography";

export interface TypographyProps extends MuiTypographyProps {
  component?: ElementType;
  variant?: OverridableStringUnion<
    Variant | "inherit",
    TypographyPropsVariantOverrides
  >;
}

const codeBlock = (theme: Theme): TypographyStyle => ({
  backgroundColor: theme.palette.mode === "light" ? Gray.N100 : Gray.N800,
  borderRadius: theme.spacing(0.5),
  color: theme.palette.mode === "light" ? Gray.N600 : Gray.N300,
  display: "block",
  fontFamily:
    'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
  fontSize: theme.typography.pxToRem(12),
  overflow: "auto",
  padding: theme.spacing(0.75, 1),
  whiteSpace: "pre",
  width: "100%",
});

const code = (theme: Theme): TypographyStyle => ({
  ...codeBlock(theme),
  display: "inline",
  padding: theme.spacing(0.5, 0.75),
  userSelect: "all",
});

const Typography = styled<VFC<TypographyProps>>(
  forwardRef(({ ...props }, ref) => <MuiTypography ref={ref} {...props} />)
)(({ theme }) => ({
  fontFamily: `"Inter", ${theme.typography.fontFamily}`,
  "&.MuiTypography-codeBlock": codeBlock(theme),
  "&.MuiTypography-code": code(theme),
}));

export default Typography;
