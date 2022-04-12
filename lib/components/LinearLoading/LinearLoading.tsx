import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import LinearProgress from "@mui/material/LinearProgress";
import { BoxProps } from "@mui/material/Box";
import { VFC } from "react";
import nProgressState from "../NProgress/nProgressState";

export interface LinearLoadingProps extends BoxProps {
  zIndex?: number;
}

const LinearLoading: VFC<LinearLoadingProps> = ({ zIndex, sx, ...props }) => (
  <Fade
    in
    style={{
      transitionDelay: `${nProgressState.initialDelay}ms`,
    }}
    unmountOnExit
  >
    <Box {...props} sx={{ position: "relative", ...sx }}>
      <LinearProgress
        variant={"indeterminate"}
        sx={{ position: "absolute", left: 0, right: 0, zIndex }}
      />
    </Box>
  </Fade>
);

export default LinearLoading;
