import { Card, Stack } from "@mui/material";
import DemoTemplate from "../../../src/components/DemoTemplate/DemoTemplate";

const IconDemo = () => (
  <DemoTemplate title header={"Shadows"}>
    <Stack spacing={2}>
      <Card elevation={0} sx={{ p: 1 }}>
        Shadow 0
      </Card>
      <Card elevation={1} sx={{ p: 1 }}>
        Shadow 1
      </Card>
      <Card elevation={2} sx={{ p: 1 }}>
        Shadow 2
      </Card>
      <Card elevation={3} sx={{ p: 1 }}>
        Shadow 3
      </Card>
      <Card elevation={4} sx={{ p: 1 }}>
        Shadow 4
      </Card>
      <Card sx={{ p: 1, boxShadow: (theme) => theme.shadows[5] }}>
        Shadow 5
      </Card>
    </Stack>
  </DemoTemplate>
);

export default IconDemo;
