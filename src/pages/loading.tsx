import Grid from "@mui/material/Grid";
import { VFC } from "react";
import DemoTemplate from "../components/DemoTemplate/DemoTemplate";
import CircularLoading from "../../lib/components/CircularLoading";
import Typography from "../../lib/components/Typography";
import LinearLoading from "../../lib/components/LinearLoading";

const LoadingDemo: VFC = () => (
  <DemoTemplate title header={"Loading"}>
    <Grid container spacing={1} direction={"row"}>
      <Grid item xs={12} sm={2}>
        <CircularLoading size={14} color={"inherit"} />
      </Grid>
      <Grid item xs={12} sm={10}>
        <Typography variant={"codeBlock"}>
          {`<CircularLoading size={14} color={"inherit"} />`}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={2}>
        <LinearLoading />
      </Grid>
      <Grid item xs={12} sm={10}>
        <Typography variant={"codeBlock"}>{`<LinearLoading />`}</Typography>
      </Grid>
    </Grid>
  </DemoTemplate>
);

export default LoadingDemo;
