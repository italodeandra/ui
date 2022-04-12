import ListSubheader from "@mui/material/ListSubheader";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { bindMenu, bindTrigger } from "material-ui-popup-state";
import { usePopupState } from "material-ui-popup-state/hooks";
import { cloneElement, ReactElement, VFC } from "react";

export interface ConfirmationMenuProps {
  onConfirm: () => void;
  isConfirming?: boolean;
  children: ReactElement;
  confirmationLabel?: string;
  answerYesLabel?: string;
  answerNoLabel?: string;
}

const ConfirmationMenu: VFC<ConfirmationMenuProps> = ({
  onConfirm,
  children,
  isConfirming,
  confirmationLabel = "Are you sure you want to delete?",
  answerYesLabel = "Yes",
  answerNoLabel = "No",
}) => {
  const popupState = usePopupState({
    popupId: "delete-popup-menu",
    variant: "popover",
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"), {
    defaultMatches: false,
  });

  return (
    <>
      {children
        ? cloneElement(children, {
            loading: isConfirming,
            disabled: isConfirming,
            ...bindTrigger(popupState),
          })
        : null}
      <Menu
        sx={{
          zIndex: 1600,
        }}
        {...bindMenu(popupState)}
        anchorOrigin={
          isMobile
            ? {
                vertical: "center",
                horizontal: "center",
              }
            : {
                vertical: "bottom",
                horizontal: "right",
              }
        }
        transformOrigin={
          isMobile
            ? {
                vertical: "center",
                horizontal: "center",
              }
            : {
                vertical: "top",
                horizontal: "right",
              }
        }
      >
        <ListSubheader>{confirmationLabel}</ListSubheader>
        <MenuItem
          onClick={() => {
            popupState.setOpen(false);
            onConfirm();
          }}
        >
          {answerYesLabel}
        </MenuItem>
        <MenuItem onClick={() => popupState.setOpen(false)}>
          {answerNoLabel}
        </MenuItem>
      </Menu>
    </>
  );
};

export default ConfirmationMenu;
