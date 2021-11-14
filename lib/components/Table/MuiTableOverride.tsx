import { ComponentsOverrides, ComponentsProps } from "@mui/material/styles";

const MuiTableOverride: {
  defaultProps?: ComponentsProps["MuiTable"];
  styleOverrides?: ComponentsOverrides["MuiTable"];
} = {
  defaultProps: {
    size: "small",
  },
};

export default MuiTableOverride;
