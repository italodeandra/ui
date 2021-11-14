import type {
  ComponentsOverrides,
  ComponentsProps,
} from "@mui/material/styles";

const MuiToolbarOverride: {
  defaultProps?: ComponentsProps["MuiToolbar"];
  styleOverrides?: ComponentsOverrides["MuiToolbar"];
} = {
  defaultProps: {
    variant: "dense",
  },
};

export default MuiToolbarOverride;
