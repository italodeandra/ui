import type {
  ComponentsOverrides,
  ComponentsProps,
} from "@mui/material/styles";

const MuiLinkOverride: {
  defaultProps?: ComponentsProps["MuiLink"];
  styleOverrides?: ComponentsOverrides["MuiLink"];
} = {
  styleOverrides: {
    root: {
      "&:focus-visible": {
        outline: "none",
        position: "relative",
        "&:before": {
          content: '""',
          backgroundColor: "currentColor",
          position: "absolute",
          left: -4,
          top: -2,
          bottom: -2,
          right: -4,
          opacity: 0.2,
          borderRadius: 4,
        },
      },
    },
  },
};

export default MuiLinkOverride;
