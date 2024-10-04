import { proxy } from "valtio";
import createStateHydration from "../../utils/createStateHydration";

const navigationDrawerState = proxy({
  isOpen: false,
  open() {
    navigationDrawerState.isOpen = true;
  },
  close() {
    navigationDrawerState.isOpen = false;
  },
  setOpen(open: boolean) {
    navigationDrawerState.isOpen = open;
  },
  toggle() {
    navigationDrawerState.isOpen = !navigationDrawerState.isOpen;
  },
});

export const hydrateNavigationDrawerState = createStateHydration(
  "navigationDrawerState",
  navigationDrawerState,
  ["isOpen"],
);

export default navigationDrawerState;
