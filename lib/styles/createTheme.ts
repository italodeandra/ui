import "./muiOverrides";
import { createTheme as muiCreateTheme } from "@mui/material/styles";
import merge from "lodash/merge";
import defaultThemeOptions from "./defaultTheme/defaultThemeOptions";
import cloneDeep from "lodash/cloneDeep";

const createTheme: typeof muiCreateTheme = (theme) =>
  muiCreateTheme(merge(cloneDeep(defaultThemeOptions), theme));

export default createTheme;
