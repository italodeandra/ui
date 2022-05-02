import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { VFC } from "react";
import DemoTemplate from "../../../src/components/DemoTemplate/DemoTemplate";
import FormLabel from "../FormLabel";
import Icon from "../Icon";
import TextField from "../TextField";
import searchIcon from "@iconify/icons-heroicons-outline/search";
import MenuItem from "@mui/material/MenuItem";

const TextFieldDemo: VFC = () => (
  <DemoTemplate title header={"Text field"}>
    <Stack spacing={1}>
      <Box>
        <TextField label={"With label"} value={"Test"} />{" "}
        <TextField label={"Select"} select value={"Test"}>
          <MenuItem value={"Test"}>Test</MenuItem>
        </TextField>
      </Box>
      <Box>
        <TextField label={"Small"} size={"small"} value={"Test"} />{" "}
        <TextField label={"Select"} size={"small"} select value={"Test"}>
          <MenuItem value={"Test"}>Test</MenuItem>
        </TextField>
      </Box>
      <Box>
        <TextField placeholder={"Without label"} alwaysShowPlaceholder />
      </Box>
      <Box>
        <FormLabel>Only label</FormLabel>
      </Box>
      <Box>
        <TextField
          placeholder={"Search..."}
          alwaysShowPlaceholder
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ pointerEvents: "none" }}>
                <Icon icon={searchIcon} />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Stack>
  </DemoTemplate>
);

export default TextFieldDemo;
