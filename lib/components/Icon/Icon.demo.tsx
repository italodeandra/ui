import menuIcon from "@iconify/icons-heroicons-outline/menu";
import Stack from "@mui/material/Stack";
import Typography from "../Typography";
import { VFC } from "react";
import Icon from "../Icon";
import DemoTemplate from "../../../src/components/DemoTemplate/DemoTemplate";

const IconDemo: VFC = () => (
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
