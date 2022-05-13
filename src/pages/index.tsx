import Grid from "@mui/material/Grid";
import Link from "next/link";
import { VFC } from "react";
import Button from "../../lib/components/Button";
import DemoTemplate from "../components/DemoTemplate/DemoTemplate";

const demos = [
  ["/app-bar", "App bar"],
  ["/breadcrumbs", "Breadcrumbs"],
  ["/button", "Button"],
  ["/checkbox", "Checkbox"],
  ["/confirmation-menu", "Confirmation menu"],
  ["/date-distance-now", "Date distance now"],
  ["/date-format", "Date format"],
  ["/dialog", "Dialog"],
  ["/drawer", "Drawer"],
  ["/icon", "Icon"],
  ["/image-upload", "Image upload"],
  ["/json", "Json"],
  ["/line-clamp", "Line clamp"],
  ["/link", "Link"],
  ["/loading", "Loading"],
  ["/nprogress", "NProgress"],
  ["/radio", "Radio"],
  ["/shadows", "Shadows"],
  ["/snackbar", "Snackbar"],
  ["/switch", "Switch"],
  ["/text-field", "Text field"],
  ["/typography", "Typography"],
];

const Index: VFC = () => (
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
