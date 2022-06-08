import type {
  ComponentsOverrides,
  ComponentsProps,
} from "@mui/material/styles";

const MuiDatePickerOverride: {
  defaultProps?: ComponentsProps["MuiDialog"];
  styleOverrides?: ComponentsOverrides["MuiDialog"];
} = {
  defaultProps: {
    PaperProps: {
      elevation: 3,
    },
  },
};

export default MuiDatePickerOverride;
