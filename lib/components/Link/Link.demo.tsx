import Grid from "@mui/material/Grid";
import { VFC } from "react";
import DemoTemplate from "../../../src/components/DemoTemplate/DemoTemplate";
import Link from "@mui/material/Link";

const LinkDemo: VFC = () => (
  <DemoTemplate title header={"Link"}>
    <Grid container spacing={1} direction={"row"}>
      <Grid item>
        <Link href={"/"} underline={"hover"}>
          This is a link
        </Link>
      </Grid>
    </Grid>
  </DemoTemplate>
);

export default LinkDemo;
