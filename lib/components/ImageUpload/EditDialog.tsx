import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import { VFC, useRef, FormEventHandler } from "react";
import TextField from "../TextField";
import Button from "../Button";
import { useForm } from "react-hook-form";
import { IImage } from "./ImageUpload";

interface EditDialogProps {
  image: IImage;
  onChange: (image: IImage) => void;
  isOpen: boolean;
  onClose: () => void;
  labelEdit: string;
  labelAltText: string;
  labelClose: string;
  labelEditDialogContent: string;
  labelFieldIsRequired: string;
}

type Values = Pick<IImage, "alt">;

const EditDialog: VFC<EditDialogProps> = ({
  image,
  onChange,
  isOpen,
  onClose,
  labelEdit,
  labelAltText,
  labelClose,
  labelEditDialogContent,
  labelFieldIsRequired,
}) => {
  const submitRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({ defaultValues: { alt: image.alt } });

  const onSubmit = (values: Values): void => {
    onChange({ ...image, ...values });
    onClose();
  };

  const handleSubmitWithoutPropagation: FormEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return handleSubmit(onSubmit)(e);
  };

  return (
    <Dialog open={isOpen} onClose={() => submitRef.current?.click()}>
      <DialogTitle>{labelEdit}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmitWithoutPropagation}>
          <DialogContentText>{labelEditDialogContent}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label={labelAltText}
            fullWidth
            required
            {...register("alt", {
              required: labelFieldIsRequired,
            })}
            error={!!errors.alt}
            helperText={errors.alt?.message}
          />
          <input type="submit" style={{ display: "none" }} ref={submitRef} />
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => submitRef.current?.click()}
          variant={"text"}
          color={"gray"}
        >
          {labelClose}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
