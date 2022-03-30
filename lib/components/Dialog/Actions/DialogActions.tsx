import { FC } from "react";
import Box from "@mui/material/Box";

const DialogActions: FC = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        "& > button": {},
      }}
    >
      {children}
    </Box>
  );
};

export default DialogActions;
