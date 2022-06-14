import Button from "../../Button";
import { forwardRef } from "react";

const DialogAction: typeof Button = forwardRef((props, ref) => (
  <Button
    ref={ref}
    {...props}
    variant={"outlined"}
    fullWidth
    sx={{
      borderRadius: 0,
      p: 2,
      "&::after": { display: "none" },
      "&:not(:hover)": {
        "&:first-of-type": {
          borderLeftColor: "transparent",
        },
        borderRightColor: "transparent",
        borderBottomColor: "transparent",
      },
      "&:first-of-type": {
        borderBottomLeftRadius: 4,
      },
      "&:last-of-type": {
        borderBottomRightRadius: 4,
      },
    }}
  />
));

export default DialogAction;
