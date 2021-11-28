import Grid from "@mui/material/Grid";
import { VFC } from "react";
import DemoTemplate from "../../../src/components/DemoTemplate/DemoTemplate";
import Button from "../Button";
import NProgressState from "./nProgress.state";

const NProgressDemo: VFC = () => (
  <DemoTemplate title header={"Json"}>
    <Grid container spacing={1} direction={"row"}>
      <Grid item>
        <Button onClick={() => NProgressState.start()}>Start</Button>
      </Grid>
      <Grid item>
        <Button onClick={() => NProgressState.finish()}>Finish</Button>
      </Grid>
    </Grid>
  </DemoTemplate>
);

export default NProgressDemo;
