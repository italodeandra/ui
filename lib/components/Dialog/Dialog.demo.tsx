import Grid from "@mui/material/Grid";
import { useState, VFC } from "react";
import Button from "../Button";
import DemoTemplate from "../../../src/components/DemoTemplate/DemoTemplate";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "./Actions/DialogActions";
import DialogAction from "./Action/DialogAction";

const DialogDemo: VFC = () => {
  const [open, setOpen] = useState(false);

  return (
    <DemoTemplate title header={"Card"}>
      <Grid container spacing={1} direction={"row"}>
        <Grid item>
          <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogContent>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Accusantium aliquam dicta dignissimos, doloremque doloribus ea
              eligendi est et excepturi molestiae nesciunt obcaecati odit
              pariatur quos recusandae, sint unde. Cupiditate, placeat!
            </DialogContent>
            <DialogActions>
              <DialogAction color={"gray"} onClick={() => setOpen(false)}>
                Close
              </DialogAction>
              <DialogAction>Confirm</DialogAction>
            </DialogActions>
          </Dialog>
          <Button onClick={() => setOpen(true)}>Open dialog</Button>
        </Grid>
      </Grid>
    </DemoTemplate>
  );
};

export default DialogDemo;
