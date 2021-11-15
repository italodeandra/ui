/* istanbul ignore file */

import {
  alpha,
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  styled,
} from "@mui/material";
import { forwardRef, VFC } from "react";

export interface AppBarProps extends MuiAppBarProps {}

const AppBar = styled<VFC<AppBarProps>>(
  forwardRef(
    ({ elevation = 0, color = "default", square = true, ...props }, ref) => (
      <MuiAppBar
        color={color}
        elevation={elevation}
        ref={ref}
        square={square}
        {...props}
      />
    )
  )
)(({ theme, color = "default" }) => ({
  transition: theme.transitions.create([
    "backdrop-filter",
    "background-color",
    "box-shadow",
  ]),
  backgroundImage: "none",
  backdropFilter: color === "default" ? "saturate(180%) blur(5px)" : undefined,
  backgroundColor:
    color === "default"
      ? alpha(theme.palette.background.paper, 0.5)
      : undefined,
  color: theme.palette.text.primary,
  display: "flex",
}));

export default AppBar;
