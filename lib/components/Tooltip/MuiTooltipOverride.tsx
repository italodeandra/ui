import type {
  ComponentsOverrides,
  ComponentsProps,
} from "@mui/material/styles";
import CoolGray from "../../styles/colors/CoolGray";
import shadows from "../../styles/shadows";

const MuiTooltipOverride: {
  defaultProps?: ComponentsProps["MuiTooltip"];
  styleOverrides?: ComponentsOverrides["MuiTooltip"];
} = {
  defaultProps: {
    arrow: true,
  },
  styleOverrides: {
    arrow: {
      color: CoolGray.N900,
    },
    tooltip: {
      backgroundColor: CoolGray.N900,
      boxShadow: shadows[2],
      fontWeight: 500,
      textAlign: "center",
    },
  },
};

export default MuiTooltipOverride;
