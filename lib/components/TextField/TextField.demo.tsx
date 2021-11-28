import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { VFC } from "react";
import TextField from "../TextField";
import FormLabel from "../FormLabel";
import DemoTemplate from "../../../src/components/DemoTemplate/DemoTemplate";

const TextFieldDemo: VFC = () => (
  <DemoTemplate title header={"Text field"}>
    <Stack spacing={1}>
      <Box>
        <TextField label={"With label"} />
      </Box>
      <Box>
        <TextField placeholder={"Without label"} alwaysShowPlaceholder />
      </Box>
      <Box>
        <FormLabel>Only label</FormLabel>
      </Box>
    </Stack>
  </DemoTemplate>
);

export default TextFieldDemo;
