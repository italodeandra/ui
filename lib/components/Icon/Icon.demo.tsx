import menuIcon from "@iconify/icons-heroicons-outline/menu";
import { Stack, Typography } from "@mui/material";
import { Icon } from "..";
import DemoTemplate from "../../../src/components/DemoTemplate/DemoTemplate";

const IconDemo = () => (
  <DemoTemplate title header={"Icon"}>
    <Stack spacing={1}>
      <Typography>From heroicons</Typography>
      <Stack spacing={1} direction={"row"}>
        <Icon icon={menuIcon} />
      </Stack>
      <Typography>Inline</Typography>
      <Stack spacing={1} direction={"row"}>
        <Typography variant={"body2"}>
          This is <Icon icon={menuIcon} inline fontSize={"small"} /> inline
        </Typography>
      </Stack>
    </Stack>
  </DemoTemplate>
);

export default IconDemo;
