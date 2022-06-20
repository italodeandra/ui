import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { ObjectId } from "bson";
import { ReactNode, useCallback, VFC } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import useDeepCompareEffect from "react-use/lib/useDeepCompareEffect";
import useList from "react-use/lib/useList";
import FormLabel from "../FormLabel";
import DragAndDropFiles from "./DragAndDropFiles";
import Image from "./Image";
import { useOnPasteFiles } from "./useOnPasteFiles";
import isomorphicObjectId from "@italodeandra/next/database/isomorphicObjectId";
import FormHelperText from "@mui/material/FormHelperText";

export interface IImage {
  _id: ObjectId;
  url: string;
  alt: string;
}

export interface ImageUploadProps {
  labelInput: string;
  value: IImage[];
  onChange: (value: IImage[]) => void;
  allowedFileTypes?: string[];
  labelDropFilesBrowseImport?: string;
  labelBrowse?: string;
  labelMyDevice?: string;
  labelDropFilesHere?: string;
  labelEdit?: string;
  labelDelete?: string;
  labelAltText?: string;
  labelClose?: string;
  labelEditDialogContent?: string;
  labelFieldIsRequired?: string;
  required?: boolean;
  error?: boolean;
  helperText?: ReactNode;
  limit?: number;
}

const ImageUpload: VFC<ImageUploadProps> = ({
  labelInput,
  value = [],
  onChange,
  allowedFileTypes = ["image/png", "image/jpeg"],
  labelDropFilesBrowseImport = "Drop images here, paste, {browse} or import from",
  labelBrowse = "browse",
  labelMyDevice = "My device",
  labelDropFilesHere = "Drop your files here",
  labelEdit = "Edit alt text",
  labelDelete = "Delete",
  labelAltText = "Alt text",
  labelClose = "Close",
  labelEditDialogContent = "This text will be used as an alternative for the image",
  labelFieldIsRequired = "This field is required",
  required,
  error,
  helperText,
  limit,
}) => {
  const [acceptedImages, { push, remove, set, updateAt }] =
    useList<IImage>(value);

  useDeepCompareEffect(() => set(value), [set, value]);
  useDeepCompareEffect(() => onChange(acceptedImages), [acceptedImages]);

  const handleAcceptedImages = useCallback(
    (files: File[]) => {
      let count = 0;
      for (const file of files) {
        if (!limit || count < limit) {
          count++;
          push({
            _id: isomorphicObjectId(),
            url: URL.createObjectURL(file),
            alt: file.name,
          });
        }
      }
    },
    [limit, push]
  );

  useOnPasteFiles(allowedFileTypes, handleAcceptedImages);

  const handleRemoveImage = (index: number): void => {
    remove(index);
  };
  const handleChangeImage = (index: number, newImage: IImage): void => {
    updateAt(index, newImage);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <FormLabel error={error}>
        {labelInput}
        {required && " *"}
      </FormLabel>
      <Box sx={{ mt: 0.25 }}>
        <Grid container spacing={1}>
          {acceptedImages.map((image, index) => (
            <Grid key={image._id.toHexString()} item xs={12} sm={"auto"}>
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image
                image={image}
                onChange={(newImage) => handleChangeImage(index, newImage)}
                onDelete={() => handleRemoveImage(index)}
                labelEdit={labelEdit}
                labelDelete={labelDelete}
                labelAltText={labelAltText}
                labelClose={labelClose}
                labelEditDialogContent={labelEditDialogContent}
                labelFieldIsRequired={labelFieldIsRequired}
              />
            </Grid>
          ))}
          {(!limit || acceptedImages.length < limit) && (
            <Grid item xs={12} sm={"auto"}>
              <DragAndDropFiles
                allowedFileTypes={allowedFileTypes}
                onAcceptFiles={handleAcceptedImages}
                labelMyDevice={labelMyDevice}
                labelDropFilesBrowseImport={labelDropFilesBrowseImport}
                labelBrowse={labelBrowse}
                labelDropFilesHere={labelDropFilesHere}
                limit={limit}
              />
            </Grid>
          )}
        </Grid>
      </Box>
      {helperText && (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      )}
    </DndProvider>
  );
};

export default ImageUpload;
