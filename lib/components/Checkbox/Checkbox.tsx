import checkIcon from "@iconify/icons-heroicons-solid/check";
import { buttonClasses } from "@mui/material/Button";
import MuiCheckbox, { CheckboxProps } from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import { alpha } from "@mui/system/colorManipulator";
import { VFC } from "react";
import Icon from "../Icon";

const AnimatedCheckIcon: VFC<{ visible: boolean }> = ({ visible }) => (
  <Icon
    icon={checkIcon}
    fontSize={"inherit"}
    sx={{
      opacity: visible ? 1 : 0,
      transition: (theme) => theme.transitions.create(["opacity", "color"]),
    }}
  />
);

export type { CheckboxProps };

const Checkbox = styled<typeof MuiCheckbox>((props) => (
  <MuiCheckbox
    {...props}
    checkedIcon={<AnimatedCheckIcon visible={true} />}
    icon={<AnimatedCheckIcon visible={false} />}
    disableRipple
  />
))(({ theme, disabled }) => {
  const borderWithShadow = (borderColor: string): string =>
    `inset 0 0 0 1px ${borderColor}, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px`;
  return {
    width: 20,
    minWidth: 20,
    height: 20,
    borderRadius: 4,
    transition: theme.transitions.create(["box-shadow", "background-color"]),

    "&::after": {
      borderRadius: "inherit",
      bottom: 0,
      content: '""',
      left: 0,
      pointerEvents: "none",
      position: "absolute",
      right: 0,
      top: 0,
      transition: theme.transitions.create(["box-shadow"]),
      opacity: 0.3,
    },
    boxShadow: borderWithShadow(
      !disabled
        ? theme.palette.text.secondary
        : alpha(theme.palette.text.secondary, 0.2)
    ),
    "&:hover": {
      boxShadow: borderWithShadow(theme.palette.text.primary),
      backgroundColor: alpha(theme.palette.text.primary, 0.1),
    },
    [`&.${buttonClasses.focusVisible}, &:active`]: {
      "&:hover": {
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
      },
      boxShadow: borderWithShadow(theme.palette.primary.main),
      "&::after": {
        boxShadow: `0 0 0 3px ${theme.palette.primary.main}`,
      },
    },
  };
});

export default Checkbox;
