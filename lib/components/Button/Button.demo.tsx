import menuAlt2 from "@iconify/icons-heroicons-outline/menu-alt-2";
import { Grid } from "@mui/material";
import { Button, Icon, IconButton } from "..";
import DemoTemplate from "../../../src/components/DemoTemplate/DemoTemplate";

const ButtonDemo = () => (
  <DemoTemplate title header={"Button"}>
    <Grid container spacing={1} direction={"row"}>
      <Grid item>
        <Button>Default</Button>
      </Grid>
      <Grid item>
        <Button color={"secondary"}>Secondary color</Button>
      </Grid>
      <Grid item>
        <Button variant={"text"}>Text</Button>
      </Grid>
      <Grid item>
        <Button variant={"outlined"}>Outlined</Button>
      </Grid>
      <Grid item>
        <Button loading>Loading</Button>
      </Grid>
      <Grid item>
        <IconButton>
          <Icon icon={menuAlt2} />
        </IconButton>
      </Grid>
    </Grid>
  </DemoTemplate>
);

export default ButtonDemo;
