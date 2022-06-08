import { createTheme } from "@mui/material/styles";
import MuiCardOverride from "../../components/Card/MuiCardOverride";
import MuiPopoverOverride from "../../components/Popover/MuiPopoverOverride";
import MuiTableOverride from "../../components/Table/MuiTableOverride";
import MuiToolbarOverride from "../../components/Toolbar/MuiToolbarOverride";
import MuiTooltipOverride from "../../components/Tooltip/MuiTooltipOverride";
import CoolGray from "../colors/CoolGray";
import Gray from "../colors/Gray";
import LightBlue from "../colors/LightBlue";
import Pink from "../colors/Pink";
import Red from "../colors/Red";
import shadows from "../shadows";
import MuiDialogOverride from "../../components/Dialog/MuiDialogOverride";
import MuiLinkOverride from "../../components/Link/MuiLinkOverride";
import MuiDatePickerOverride from "../../components/DatePicker/MuiDatePickerOverride";

const theme = createTheme();

const defaultThemeOptions = {
  components: {
    MuiTable: MuiTableOverride,
    MuiToolbar: MuiToolbarOverride,
    MuiTooltip: MuiTooltipOverride,
    MuiCard: MuiCardOverride,
    MuiPopover: MuiPopoverOverride,
    MuiDialog: MuiDialogOverride,
    MuiLink: MuiLinkOverride,
    MuiDatePicker: MuiDatePickerOverride,
  },
  palette: {
    error: {
      main: Red.N500,
    },
    primary: {
      main: LightBlue.N500,
      contrastText: Gray.N50,
    },
    secondary: {
      main: Pink.N400,
      contrastText: Gray.N50,
    },
    gray: {
      main: Gray.N500,
      dark: Gray.N600,
      contrastText: Gray.N50,
    },
    lightGray: {
      main: Gray.N100,
      dark: Gray.N300,
      contrastText: Gray.N900,
    },
    coolGray: {
      main: CoolGray.N300,
      dark: CoolGray.N400,
      contrastText: CoolGray.N900,
    },
  },
  shadows,
  typography: {
    fontFamily: `"Inter", ${theme.typography.fontFamily}`,
  },
};

export default defaultThemeOptions;
