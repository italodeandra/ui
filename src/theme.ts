import createTheme from "../lib/styles/createTheme";

export const lightTheme = createTheme();

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
