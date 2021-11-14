import menuAlt2 from "@iconify/icons-heroicons-outline/menu-alt-2";
import { Stack } from "@mui/material";
import { Button, Icon, IconButton } from "..";
import DemoTemplate from "../../../src/components/DemoTemplate/DemoTemplate";

const ButtonDemo = () => (
  <DemoTemplate title header={"Button"}>
    <Stack spacing={1} direction={"row"}>
      <Button>Default</Button>
      <Button color={"secondary"}>Secondary color</Button>
      <Button variant={"text"}>Text</Button>
      <Button variant={"outlined"}>Outlined</Button>
      <Button loading>Loading</Button>
      <IconButton>
        <Icon icon={menuAlt2} />
      </IconButton>
    </Stack>
  </DemoTemplate>
);

export default ButtonDemo;
