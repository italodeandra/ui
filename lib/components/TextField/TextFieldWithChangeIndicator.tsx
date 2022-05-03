import { forwardRef } from "react";
import Badge, { badgeClasses } from "@mui/material/Badge";
import TextField, { TextFieldProps } from "./TextField";

export interface TextFieldWithChangeIndicatorProps extends TextFieldProps {
  changed?: boolean;
}

const TextFieldWithChangeIndicator = forwardRef(
  ({ changed, ...props }: TextFieldWithChangeIndicatorProps, ref) => (
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
      }}
    >
      <TextField inputRef={ref} {...props} />
    </Badge>
  )
);

export default TextFieldWithChangeIndicator;
