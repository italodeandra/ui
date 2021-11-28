/* istanbul ignore file */

import { paperClasses } from "@mui/material/Paper";
import { styled, useTheme } from "@mui/material/styles";
import SwipeableDrawer, {
  SwipeableDrawerProps,
} from "@mui/material/SwipeableDrawer";
import useMediaQuery from "@mui/material/useMediaQuery";
import type { VFC } from "react";
import Gray from "../../styles/colors/Gray";
import { is_iOS } from "../../utils/isBrowser";

export type DrawerProps = SwipeableDrawerProps;

/**
 * Navigation drawers provide access to destinations in your app. Side sheets are surfaces containing supplementary content that are anchored to the left or right edge of the screen.
 */
const Drawer = styled<VFC<DrawerProps>>((props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));
  return (
    <SwipeableDrawer
      disableBackdropTransition={!is_iOS}
      disableDiscovery={is_iOS}
      variant={!isMobile ? "persistent" : "temporary"}
      {...props}
    />
  );
})(({ theme }) => ({
  [`& .${paperClasses.root}`]: {
    backgroundColor: theme.palette.mode === "light" ? Gray.N50 : Gray.N900,
    borderRight: "none",
  },
}));

export default Drawer;
