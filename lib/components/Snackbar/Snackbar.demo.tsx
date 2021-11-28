import Grid from "@mui/material/Grid";
import { VFC } from "react";
import DemoTemplate from "../../../src/components/DemoTemplate/DemoTemplate";
import Button from "../Button";
import { notify } from "./snackbar.state";

const SnackbarDemo: VFC = () => (
  <DemoTemplate title header={"Snackbar"}>
    <Grid container spacing={1} direction={"row"}>
      <Grid item>
        <Button onClick={() => notify("This is a message")}>
          Show a message
        </Button>
      </Grid>
      <Grid item>
        <Button
          onClick={() =>
            notify("This message will appear once", { suppress: true })
          }
        >
          Show a suppressed message
        </Button>
      </Grid>
      <Grid item>
        <Button
          onClick={() => notify("This is an error", { variant: "error" })}
        >
          Show an error message
        </Button>
      </Grid>
    </Grid>
  </DemoTemplate>
);

export default SnackbarDemo;
