import Grid from "@mui/material/Grid";
import { VFC } from "react";
import DemoTemplate from "../../../src/components/DemoTemplate/DemoTemplate";
import Button from "../Button";
import nProgressState, {
  finishProgress,
  startProgress,
} from "./nProgressState";
import { useSnapshot } from "valtio";
import Typography from "../Typography";

const NProgressDemo: VFC = () => {
  const { progresses } = useSnapshot(nProgressState);

  return (
    <DemoTemplate title header={"Json"}>
      <Grid container spacing={1} direction={"row"}>
        <Grid item>
          <Button onClick={() => startProgress()}>Start</Button>
        </Grid>
        <Grid item>
          <Button onClick={() => finishProgress()}>Finish</Button>
        </Grid>
        <Grid item>
          <Typography variant={"body1"} sx={{ my: "auto" }}>
            Progresses: {progresses}
          </Typography>
        </Grid>
      </Grid>
    </DemoTemplate>
  );
};

export default NProgressDemo;
