/* istanbul ignore file */

import { formHelperTextClasses } from "@mui/material/FormHelperText";
import { inputAdornmentClasses } from "@mui/material/InputAdornment";
import { inputBaseClasses } from "@mui/material/InputBase";
import { inputLabelClasses } from "@mui/material/InputLabel";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { alpha, styled } from "@mui/material/styles";
import MuiTextField, { OutlinedTextFieldProps } from "@mui/material/TextField";
import { forwardRef, VFC } from "react";
import { formLabelStyles } from "../FormLabel";

export interface TextFieldProps
  extends Omit<OutlinedTextFieldProps, "variant" | "hiddenLabel"> {
  alwaysShowPlaceholder?: boolean;
}

const TextField = styled<VFC<TextFieldProps>>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  forwardRef(({ alwaysShowPlaceholder, ...props }, ref) => (
    <MuiTextField inputRef={ref} {...props} />
  ))
)(({ error, theme, color = "primary", alwaysShowPlaceholder }) => {
  const ringColor = alpha(theme.palette[error ? "error" : color].main, 0.3);
  return {
    [`& .${inputLabelClasses.outlined}`]: formLabelStyles(theme),
    [`& .${inputLabelClasses.sizeSmall}`]: {
      fontSize: theme.typography.pxToRem(12),
    },
    [`& .${outlinedInputClasses.root}`]: {
      [`&.${outlinedInputClasses.focused}`]: {
        "&::after": {
          boxShadow: `0 0 0 3px ${ringColor}`,
        },
      },
      "&::after": {
        borderRadius: "inherit",
        bottom: 0,
        content: '""',
        left: 0,
        pointerEvents: "none",
        position: "absolute",
        right: 0,
        top: 0,
        transition: theme.transitions.create(["box-shadow"]),
      },
      boxShadow:
        "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
      padding: 0,
    },
    [`& .${outlinedInputClasses.notchedOutline} legend`]: {
      maxWidth: "0.01px",
    },
    [`& .${outlinedInputClasses.notchedOutline}`]: {
      transition: theme.transitions.create(["border"]),
    },
    [`& .${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]:
      {
        borderWidth: "1px !important",
      },
    [`& .${formHelperTextClasses.root}`]: {
      marginLeft: 0,
      marginRight: 0,
      marginTop: theme.spacing(0.5),
    },
    [`& .${outlinedInputClasses.input}`]: {
      "&::placeholder": {
        opacity: alwaysShowPlaceholder ? 0.5 : 0,
      },
      "&:focus::placeholder": {
        opacity: 0.5,
      },
      fontSize: theme.typography.pxToRem(14),
      padding: "10px 12px",
    },
    [`& .${inputBaseClasses.inputSizeSmall}`]: {
      padding: "6px 8px",
    },
    [`& .${inputAdornmentClasses.root}`]: {
      marginLeft: 0,
      marginRight: 0,
    },
    [`& .${inputAdornmentClasses.positionEnd}`]: {
      marginRight: "6px",
    },
    [`& .${inputAdornmentClasses.positionStart}`]: {
      marginLeft: "6px",
    },
  };
});

export default TextField;
