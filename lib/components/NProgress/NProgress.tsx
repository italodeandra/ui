import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import { useSnapshot } from "valtio";
import nProgressState, {
  finishProgress,
  startProgress,
} from "./nProgressState";
import * as React from "react";
import { useEffect, VFC } from "react";
import router from "next/router";

router.events.on("routeChangeStart", startProgress);
router.events.on("routeChangeComplete", finishProgress);
router.events.on("routeChangeError", finishProgress);

const NProgress: VFC = () => {
  const { value, set } = useSnapshot(nProgressState);

  useEffect(() => {
    const trickleTimer = setTimeout(() => {
      if (value !== null) {
        let newProgress;
        if (value >= 0 && value < 20) {
          newProgress = value + 10;
        } else if (value >= 20 && value < 50) {
          newProgress = value + 4;
        } else if (value >= 50 && value < 80) {
          newProgress = value + 2;
        } else if (value >= 80 && value < 99) {
          newProgress = value + 0.5;
        } else if (value >= 99 && value < 100) {
          newProgress = 99;
        }
        set(newProgress);
      }
    }, 500);
    return () => {
      clearTimeout(trickleTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Fade in={value !== undefined} mountOnEnter unmountOnExit>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Collapse in={value !== undefined} mountOnEnter unmountOnExit>
          <Box
            sx={{
              bgcolor: "primary.main",
              width: `${value}%`,
              height: 4,
              transition: (theme) => theme.transitions.create("width"),
            }}
          />
        </Collapse>
      </Box>
    </Fade>
  );
};

export default NProgress;
