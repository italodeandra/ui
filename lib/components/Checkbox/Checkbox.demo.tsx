import Grid from "@mui/material/Grid";
import { VFC } from "react";
import DemoTemplate from "../../../src/components/DemoTemplate/DemoTemplate";
import Checkbox from "./Checkbox";

const ButtonDemo: VFC = () => (
  <DemoTemplate title header={"Checkbox"}>
    <Grid container spacing={1} direction={"row"}>
      <Grid item>
        <Checkbox />
      </Grid>
      <Grid item>
        <Checkbox defaultChecked />
      </Grid>
      <Grid item>
        <Checkbox disabled />
      </Grid>
      <Grid item>
        <Checkbox defaultChecked disabled />
      </Grid>
    </Grid>
  </DemoTemplate>
);

export default ButtonDemo;
