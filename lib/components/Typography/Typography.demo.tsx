import { Stack, Typography } from "@mui/material";
import DemoTemplate from "../../../src/components/DemoTemplate/DemoTemplate";

const TypographyDemo = () => (
  <DemoTemplate title header={"Typography"}>
    <Stack spacing={1}>
      <Typography variant={"subtitle2"}>subtitle2</Typography>
      <Typography variant={"body2"}>
        This is a <Typography variant={"code"}>code</Typography>
      </Typography>
      <Typography variant={"codeBlock"}>codeBlock</Typography>
    </Stack>
  </DemoTemplate>
);

export default TypographyDemo;
