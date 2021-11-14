import { createTheme as muiCreateTheme } from "@mui/material";
import { merge } from "lodash";
import { defaultThemeOptions } from "./defaultTheme";

const createTheme: typeof muiCreateTheme = (theme) =>
  muiCreateTheme(merge(defaultThemeOptions, theme));

export default createTheme;

declare module "@mui/material/Button/Button" {
  // noinspection JSUnusedGlobalSymbols
  interface ButtonPropsColorOverrides {
    coolGray: true;
    lightGray: true;
    gray: true;
  }
}

declare module "@mui/material/IconButton/IconButton" {
  // noinspection JSUnusedGlobalSymbols
  interface IconButtonPropsColorOverrides {
    coolGray: true;
    lightGray: true;
    gray: true;
  }
}

declare module "@mui/material/styles" {
  // noinspection JSUnusedGlobalSymbols
  interface Palette {
    coolGray: Palette["primary"];
    lightGray: Palette["primary"];
    gray: Palette["primary"];
  }

  // noinspection JSUnusedGlobalSymbols
  interface PaletteOptions {
    coolGray?: PaletteOptions["primary"];
    lightGray?: PaletteOptions["primary"];
    gray?: PaletteOptions["primary"];
  }
}
