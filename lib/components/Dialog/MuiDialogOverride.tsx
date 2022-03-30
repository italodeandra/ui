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
      elevation: 4,
    },
  },
};

export default MuiDialogOverride;
