import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import { Theme, useTheme } from "@mui/material/styles";
import type { SxProps } from "@mui/system";
import { useEffect, useState } from "react";
import { Transition, TransitionGroup } from "react-transition-group";
import { useSnapshot } from "valtio";
import Message from "./Message";
import snackbarState, { IMessage } from "./snackbar.state";

const snackbarContainerStyles: SxProps<Theme> = {
  margin: (theme) => theme.spacing(0, -1, -1, -1),
  overflow: "hidden",
  padding: (theme) => theme.spacing(3, 2, "", ""),
  pointerEvents: "none",
};

/**
 * A snackbar that shows up in the top right of the page. The messages are
 * created by using its API `notify` or `removeNotification`.
 */
const Snackbar = ({ right }: { right?: number }) => {
  const { messages } = useSnapshot(snackbarState) as { messages: IMessage[] };
  const theme = useTheme();

  const [top, setTop] = useState(0);

  useEffect(() => {
    const newTop =
      document.querySelector(".MuiAppBar-root")?.getBoundingClientRect()
        .height || 0;
    setTop(newTop);
  }, [messages]);

  return (
    <Box
      style={{ top, right }}
      sx={{
        transition: (theme) => theme.transitions.create(["top", "right"]),
        zIndex: (theme) => theme.zIndex.snackbar,
        position: "fixed",
        right: 0,
        top: 0,
        pointerEvents: "none",
      }}
    >
      <Fade in={!!messages.length}>
        <Box sx={snackbarContainerStyles}>
          <TransitionGroup>
            {messages
              .slice()
              .reverse()
              .map((message) => (
                <Transition
                  appear
                  key={message.id}
                  nodeRef={message.nodeRef}
                  timeout={{
                    enter: theme.transitions.duration.enteringScreen,
                    exit: theme.transitions.duration.leavingScreen * 2,
                  }}
                >
                  {(state) => <Message message={message} state={state} />}
                </Transition>
              ))}
          </TransitionGroup>
        </Box>
      </Fade>
    </Box>
  );
};

export default Snackbar;
