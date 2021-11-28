import "./muiOverrides";
import { createTheme as muiCreateTheme } from "@mui/material/styles";
import merge from "lodash/merge";
import defaultThemeOptions from "./defaultTheme/defaultThemeOptions";

const createTheme: typeof muiCreateTheme = (theme) =>
  muiCreateTheme(merge(defaultThemeOptions, theme));

export default createTheme;
