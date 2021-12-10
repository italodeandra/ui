/* istanbul ignore file */

import MuiButton, {
  buttonClasses,
  ButtonProps as MuiButtonProps,
} from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import LinearProgress from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";

import { forwardRef, VFC } from "react";

export interface ButtonProps extends MuiButtonProps {
  /**
   * If the button should show a loading state (indeterminate progress bar in the bottom).
   */
  loading?: boolean;
}

const Button: VFC<ButtonProps> = styled<VFC<ButtonProps>>(
  forwardRef(
    (
      {
        disableElevation = true,
        variant = "contained",
        focusRipple = false,
        loading,
        children,
        ...props
      },
      ref
    ) => (
      <MuiButton
        disableElevation={disableElevation}
        ref={ref}
        variant={variant}
        focusRipple={focusRipple}
        {...props}
      >
        {children}
        <Fade in={loading} mountOnEnter unmountOnExit>
          <LinearProgress
            variant={"indeterminate"}
            color={"inherit"}
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              borderRadius: (theme) =>
                `0 0 ${theme.spacing(1)} ${theme.spacing(1)}`,
              height: 4,
            }}
          />
        </Fade>
      </MuiButton>
    )
  )
)(({ theme, color = "primary" }) => {
  const ringColor = theme.palette[color]?.main || "currentColor";
  const ringShadow = (size: number): string => `0 0 0 ${size}px ${ringColor}`;
  return {
    [`&:focus`]: {
      "&::after": {
        boxShadow: ringShadow(3),
      },
      [`&.${buttonClasses.outlined}`]: {
        "&::after": {
          boxShadow: ringShadow(4),
        },
      },
    },
    [`&.${buttonClasses.outlined}`]: {
      boxShadow:
        "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
    },
    "&::after": {
      borderRadius: "inherit",
      bottom: 0,
      content: '""',
      left: 0,
      position: "absolute",
      right: 0,
      top: 0,
      opacity: 0.3,
      color: "inherit",
      transition: theme.transitions.create(["box-shadow"]),
    },
    fontWeight: 500,
    padding: [0.5, 1.25],
    textTransform: "inherit",
  };
});

export default Button;
