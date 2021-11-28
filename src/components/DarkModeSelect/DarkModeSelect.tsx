import moonIcon from "@iconify/icons-heroicons-outline/moon";
import sunIcon from "@iconify/icons-heroicons-outline/sun";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuItem from "@mui/material/MenuItem";
import { VFC } from "react";
import { useSnapshot } from "valtio";
import Icon from "../../../lib/components/Icon";
import TextField from "../../../lib/components/TextField";
import themeState, { ThemeMode } from "../../theme.state";

const DarkModeSelect: VFC = () => {
  const { mode, setMode } = useSnapshot(themeState);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    <TextField
      select
      value={mode}
      onChange={({ target: { value } }) => setMode(value as ThemeMode)}
      size={"small"}
    >
      <MenuItem value={"device"}>
        <Icon
          icon={prefersDarkMode ? moonIcon : sunIcon}
          fontSize={"small"}
          sx={{ mr: 1, ".MuiSelect-select &": { mb: -0.6 } }}
        />{" "}
        Device
      </MenuItem>
      <MenuItem value={"light"}>
        <Icon
          icon={sunIcon}
          fontSize={"small"}
          sx={{ mr: 1, ".MuiSelect-select &": { mb: -0.6 } }}
        />{" "}
        Light
      </MenuItem>
      <MenuItem value={"dark"}>
        <Icon
          icon={moonIcon}
          fontSize={"small"}
          sx={{ mr: 1, ".MuiSelect-select &": { mb: -0.6 } }}
        />{" "}
        Dark
      </MenuItem>
    </TextField>
  );
};

export default DarkModeSelect;
