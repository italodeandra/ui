import exclamationCircle from "@iconify/icons-heroicons-outline/exclamation-circle";
import xIcon from "@iconify/icons-heroicons-outline/x";
import Box from "@mui/material/Box";
import { Theme, useTheme } from "@mui/material/styles";
import Typography from "../Typography";
import type { SxProps } from "@mui/system";
import type { VFC } from "react";
import type { TransitionStatus } from "react-transition-group/Transition";
import {
  ENTERED,
  ENTERING,
  EXITED,
  EXITING,
} from "react-transition-group/Transition";
import useMeasure from "react-use/lib/useMeasure";
import Gray from "../../styles/colors/Gray";
import Button from "../Button";
import Icon from "../Icon/Icon";
import { IMessage, removeNotification } from "./snackbar.state";

const snackbarStyles: SxProps<Theme> = {
  height: 0,
  transform: "translateX(120%)",
  transition: (theme) => theme.transitions.create(["height", "transform"]),
};

/** The shadow used to be cut because of the overflow=hidden, but this offset fix it */
const shadowOffset = 1;

const innerSnackbarStyles: SxProps<Theme> = {
  "& > span": {
    fontFamily: (theme) => theme.typography.fontFamily,
    fontSize: (theme) => theme.typography.pxToRem(13),
    fontWeight: 500,
  },
  "&::before": {
    content: '""',
    border: `1px solid ${Gray.N100}`,
    borderRadius: "inherit",
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  alignItems: "center",
  backgroundColor: (theme) => theme.palette.background.paper,
  borderRadius: (theme) => theme.spacing(1),
  boxShadow: (theme) => theme.shadows[4],
  display: "flex",
  margin: (theme) => theme.spacing(0, 1, 2, 1),
  padding: (theme) => theme.spacing(1, 1, 1, 2),
  position: "relative",
};

const closeButtonStyles: SxProps<Theme> = {
  color: Gray.N500,
  fontSize: (theme) => theme.typography.pxToRem(16),
  minWidth: 0,
  ml: 2,
  p: 0.5,
};

interface MessageProps {
  message: IMessage;
  state: TransitionStatus;
}

const Message: VFC<MessageProps> = ({ message, state }) => {
  const [ref, { height }] = useMeasure();
  const theme = useTheme();

  const shadowOffsetPx = parseInt(
    theme.spacing(shadowOffset).replace("px", "")
  );
  const autoHeightStyles = {
    height: [ENTERING, ENTERED].includes(state) ? height + shadowOffsetPx : 0,
  };

  const transitions = {
    /* eslint-disable sort-keys */
    [ENTERED]: {
      transform: "translateX(0%)",
      transitionDelay: `${theme.transitions.duration.enteringScreen}ms, 0ms`,
    },
    [EXITING]: {
      transform: "translateX(120%)",
      transitionDelay: `${theme.transitions.duration.leavingScreen}ms, 0ms`,
    },
    [EXITED]: { transform: "translateX(120%)" },
  };

  return (
    <Box
      ref={message.nodeRef}
      style={{
        ...transitions[state],
        ...autoHeightStyles,
      }}
      sx={snackbarStyles}
    >
      <Box
        overflow="hidden"
        ref={ref}
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          pb: shadowOffset,
          mt: -shadowOffset,
        }}
      >
        <Box sx={innerSnackbarStyles}>
          {message.variant === "error" && (
            <Icon
              icon={exclamationCircle}
              color={"error"}
              sx={{ mr: 2, ml: -0.25 }}
            />
          )}
          <Typography variant={"subtitle2"} sx={{ mt: -0.25 }}>
            {message.content}
          </Typography>
          <Button
            data-testid="remove"
            onClick={() => removeNotification(message.id)}
            sx={closeButtonStyles}
            variant="text"
            style={{ color: Gray.N400 }}
            color={"inherit"}
          >
            <Icon icon={xIcon} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Message;
