import { useMediaQuery } from "@mui/material";
import { useMount } from "react-use";
import { proxy, subscribe, useSnapshot } from "valtio";
import packageJson from "../package.json";

const key = `${packageJson.name}/state`;

export type ThemeMode = "light" | "dark" | "device";

const themeState = proxy({
  mode: "device" as ThemeMode,
  setMode(mode: ThemeMode) {
    themeState.mode = mode;
  },
  parseLocalStorage() {
    Object.assign(themeState, JSON.parse(localStorage.getItem(key)));
  },
});

export default themeState;

subscribe(themeState, () => {
  localStorage.setItem(key, JSON.stringify(themeState));
});

export const useThemeModeOnApp = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const themeStateSnapshot = useSnapshot(themeState);
  const mode =
    themeStateSnapshot.mode === "device"
      ? prefersDarkMode
        ? "dark"
        : "light"
      : themeStateSnapshot.mode === "dark"
      ? "dark"
      : "light";
  useMount(() => {
    themeStateSnapshot.parseLocalStorage();
  });
  return mode;
};
