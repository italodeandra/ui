import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Fade from "@mui/material/Fade";
import { forwardRef, VFC } from "react";
import nProgressState from "../NProgress/nProgressState";

export type CircularLoadingProps = CircularProgressProps;

const CircularLoading: VFC<CircularLoadingProps> = forwardRef((props, ref) => (
  <Fade
    in
    style={{
      transitionDelay: `${nProgressState.initialDelay}ms`,
    }}
    unmountOnExit
  >
    <CircularProgress {...props} ref={ref} />
  </Fade>
));

export default CircularLoading;
