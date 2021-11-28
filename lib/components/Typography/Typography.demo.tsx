import Stack from "@mui/material/Stack";
import { VFC } from "react";
import DemoTemplate from "../../../src/components/DemoTemplate/DemoTemplate";
import Typography from "./Typography";

const TypographyDemo: VFC = () => (
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
