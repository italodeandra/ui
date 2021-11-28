import uploadIcon from "@iconify/icons-heroicons-outline/upload";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { ChangeEventHandler, useRef, VFC } from "react";
import { useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import Button from "../Button";
import Icon from "../Icon";

interface DragAndDropFilesProps {
  allowedFileTypes: string[];
  onAcceptFiles: (files: File[]) => void;
  labelMyDevice: string;
  labelDropFilesBrowseImport: string;
  labelBrowse: string;
  labelDropFilesHere: string;
}

const DragAndDropFiles: VFC<DragAndDropFilesProps> = ({
  allowedFileTypes,
  onAcceptFiles,
  labelMyDevice,
  labelDropFilesBrowseImport,
  labelBrowse,
  labelDropFilesHere,
}) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: [NativeTypes.FILE],
    drop(item: { files: File[] }) {
      let files = item.files;
      files = files.filter((file) => allowedFileTypes.includes(file.type));
      onAcceptFiles(files);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const inputFile = useRef<HTMLInputElement>(null);

  const handleBrowseFileClick = (): void => {
    inputFile.current?.click();
  };

  const handleFileBrowse: ChangeEventHandler<HTMLInputElement> = (event) => {
    let files = Array.from(event.target.files!);
    files = files.filter((file) => allowedFileTypes.includes(file.type));
    onAcceptFiles(files);
    event.target.value = "";
  };

  const labelsDropFilesHere = labelDropFilesBrowseImport.split("{browse}");

  return (
    <Box
      ref={drop}
      sx={{
        color: "inherit",
        border: (theme) =>
          isOver
            ? `1px dashed ${theme.palette.primary.main}`
            : `1px dashed ${theme.palette.text.secondary}`,
        borderRadius: 1,
        width: (theme) => ({
          sm: theme.spacing(41),
        }),
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          justifyContent: "center",
          height: (theme) => theme.spacing(20),
          p: 2,
          width: 1,
        }}
      >
        <Typography sx={{ mb: 2 }} fontSize={14} align={"center"}>
          {labelsDropFilesHere[0]}
          <Link
            underline={"hover"}
            onClick={handleBrowseFileClick}
            sx={{ cursor: "pointer" }}
          >
            {labelBrowse}
          </Link>
          {labelsDropFilesHere[1]}
        </Typography>
        <Button variant={"outlined"} onClick={handleBrowseFileClick}>
          {labelMyDevice}
        </Button>
        <Fade in={canDrop}>
          <Box
            sx={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "rgba(255,255,255,0.9)",
            }}
          >
            <Icon
              icon={uploadIcon}
              sx={{ mb: 1 }}
              color={isOver ? "primary" : undefined}
            />
            <Typography>{labelDropFilesHere}</Typography>
          </Box>
        </Fade>
      </Box>
      <input
        ref={inputFile}
        type="file"
        style={{ display: "none" }}
        onChange={handleFileBrowse}
        accept={allowedFileTypes.join(", ")}
        multiple
      />
    </Box>
  );
};

export default DragAndDropFiles;
