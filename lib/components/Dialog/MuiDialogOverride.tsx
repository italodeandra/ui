import type {
  ComponentsOverrides,
  ComponentsProps,
} from "@mui/material/styles";

const MuiDialogOverride: {
  defaultProps?: ComponentsProps["MuiDialog"];
  styleOverrides?: ComponentsOverrides["MuiDialog"];
} = {
  defaultProps: {
    PaperProps: {
      variant: "outlined",
      elevation: 0,
    },
  },
};

export default MuiDialogOverride;
