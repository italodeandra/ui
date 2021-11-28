import trashIcon from "@iconify/icons-heroicons-outline/trash";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import NextImage from "next/image";
import { memo, VFC, useState } from "react";
import Button from "../Button";
import Icon from "../Icon";
import { usePopupState, bindMenu } from "material-ui-popup-state/hooks";
import { bindContextMenu, bindTrigger } from "material-ui-popup-state/core";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import dotsVertical from "@iconify/icons-heroicons-outline/dots-vertical";
import EditDialog from "./EditDialog";
import { IImage } from "./ImageUpload";

interface ImageProps {
  image: IImage;
  onDelete: () => void;
  onChange: (image: IImage) => void;
  labelEdit: string;
  labelDelete: string;
  labelAltText: string;
  labelClose: string;
  labelEditDialogContent: string;
  labelFieldIsRequired: string;
}

const Image: VFC<ImageProps> = memo<ImageProps>(
  ({
    image,
    onDelete,
    onChange,
    labelEdit,
    labelDelete,
    labelAltText,
    labelClose,
    labelEditDialogContent,
    labelFieldIsRequired,
  }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.only("xs"));
    const [isDialogOpen, setDialogOpen] = useState(false);

    const popupState = usePopupState({
      popupId: "image-popup-menu",
      variant: "popover",
    });

    const handleDeleteClick = (): void => {
      popupState.close();
      onDelete();
    };

    const handleEditClick = (): void => {
      popupState.close();
      setDialogOpen(true);
    };

    const bind = isMobile ? bindTrigger : bindContextMenu;

    return (
      <>
        <Box
          sx={{
            position: "relative",
            width: (theme) => ({
              sm: theme.spacing(20),
            }),
            height: (theme) => theme.spacing(20),
            borderRadius: 1,
            overflow: "hidden",
          }}
          {...bind(popupState)}
        >
          <NextImage
            src={image.url}
            unoptimized
            layout="fill"
            objectFit={"cover"}
            alt={image.alt}
          />
          <Box
            sx={{
              position: "absolute",
              right: 4,
              top: 4,
            }}
          >
            <Button
              sx={{
                minWidth: 32,
                height: 32,
                p: 0,
                borderRadius: 16,
              }}
              color={"inherit"}
              onClick={!isMobile ? handleDeleteClick : undefined}
            >
              <Icon
                icon={isMobile ? dotsVertical : trashIcon}
                fontSize={"small"}
              />
            </Button>
          </Box>
        </Box>
        <Menu {...bindMenu(popupState)}>
          {isMobile && (
            <MenuItem onClick={handleDeleteClick}>{labelDelete}</MenuItem>
          )}
          <MenuItem onClick={handleEditClick}>{labelEdit}</MenuItem>
        </Menu>
        <EditDialog
          image={image}
          onChange={onChange}
          isOpen={isDialogOpen}
          onClose={() => setDialogOpen(false)}
          labelEdit={labelEdit}
          labelAltText={labelAltText}
          labelClose={labelClose}
          labelEditDialogContent={labelEditDialogContent}
          labelFieldIsRequired={labelFieldIsRequired}
        />
      </>
    );
  }
);

export default Image;
