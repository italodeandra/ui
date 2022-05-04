import { forwardRef } from "react";
import Badge, { badgeClasses } from "@mui/material/Badge";
import TextField, { TextFieldProps } from "./TextField";

export interface TextFieldWithChangeIndicatorProps extends TextFieldProps {
  changed?: boolean;
}

const TextFieldWithChangeIndicator = forwardRef(
  (
    { changed, fullWidth, ...props }: TextFieldWithChangeIndicatorProps,
    ref
  ) => (
    <Badge
      color="secondary"
      variant="dot"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      invisible={!changed}
      sx={{
        [`.${badgeClasses.badge}`]: {
          mr: "6px",
          mb: "6px",
        },
        width: fullWidth && "100%",
      }}
    >
      <TextField inputRef={ref} {...props} fullWidth={fullWidth} />
    </Badge>
  )
);

export default TextFieldWithChangeIndicator;
