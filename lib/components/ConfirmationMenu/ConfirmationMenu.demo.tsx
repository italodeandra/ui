import Grid from "@mui/material/Grid";
import { VFC } from "react";
import Button from "../Button";
import DemoTemplate from "../../../src/components/DemoTemplate/DemoTemplate";
import ConfirmationMenu from "./ConfirmationMenu";
import { notify } from "../Snackbar";

const ConfirmationMenuDemo: VFC = () => (
  <DemoTemplate title header={"Confirmation menu"}>
    <Grid container spacing={1} direction={"row"}>
      <Grid item>
        <ConfirmationMenu onConfirm={() => notify("You confirmed")}>
          <Button>Click here to show a confirmation menu</Button>
        </ConfirmationMenu>
      </Grid>
    </Grid>
  </DemoTemplate>
);

export default ConfirmationMenuDemo;
