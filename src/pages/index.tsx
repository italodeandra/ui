import { Grid } from "@mui/material";
import Link from "next/link";
import { Button } from "../../lib";
import DemoTemplate from "../components/DemoTemplate/DemoTemplate";

const demos = [
  ["/button", "Button"],
  ["/text-field", "Text field"],
  ["/app-bar", "App bar"],
  ["/typography", "Typography"],
  ["/icon", "Icon"],
  ["/shadows", "Shadows"],
];

const Index = () => (
  <DemoTemplate header={"Demos"}>
    <Grid container spacing={1} direction="row">
      <Grid item>
        <Link href={"https://mui.com/"} passHref>
          <Button color={"coolGray"}>Everything from MUI</Button>
        </Link>
      </Grid>
      {demos.map(([url, name]) => (
        <Grid item key={url}>
          <Link href={url} passHref>
            <Button color={"primary"}>{name}</Button>
          </Link>
        </Grid>
      ))}
    </Grid>
  </DemoTemplate>
);

export default Index;
