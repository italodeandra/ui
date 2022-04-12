import Grid from "@mui/material/Grid";
import { VFC } from "react";
import DemoTemplate from "../../../src/components/DemoTemplate/DemoTemplate";
import Breadcrumbs from "./Breadcrumbs";
import Skeleton from "@mui/material/Skeleton";

const BreadcrumbsDemo: VFC = () => (
  <DemoTemplate title header={"Breadcrumbs"}>
    <Grid container spacing={1} direction={"row"}>
      <Grid item xs={12}>
        <Breadcrumbs
          breadcrumbs={[{ label: "Demo" }, { label: "Link", href: "/" }]}
        />
      </Grid>
      <Grid item xs={12}>
        <Breadcrumbs
          breadcrumbs={[
            { label: "Demo" },
            { label: "Skeleton", href: "/" },
            { label: <Skeleton width={80} />, id: "loading" },
          ]}
        />
      </Grid>
      <Grid item xs={12}>
        <Breadcrumbs
          breadcrumbs={[{ label: "Demo" }, { label: "Loading", href: "/" }]}
          loading
        />
      </Grid>
    </Grid>
  </DemoTemplate>
);

export default BreadcrumbsDemo;
