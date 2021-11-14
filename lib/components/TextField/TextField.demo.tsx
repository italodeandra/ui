import { Box, Stack } from "@mui/material";
import { FormLabel, TextField } from "..";
import DemoTemplate from "../../../src/components/DemoTemplate/DemoTemplate";

const TextFieldDemo = () => (
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
