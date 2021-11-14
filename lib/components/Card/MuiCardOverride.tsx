import type { ComponentsOverrides, ComponentsProps } from "@mui/material";

const MuiCardOverride: {
  defaultProps?: ComponentsProps["MuiCard"];
  styleOverrides?: ComponentsOverrides["MuiCard"];
} = {
  defaultProps: {
    elevation: 2,
  },
};

export default MuiCardOverride;
