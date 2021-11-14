import { createTheme } from "../lib";

export const lightTheme = createTheme();

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
