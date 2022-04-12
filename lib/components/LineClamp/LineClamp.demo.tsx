import Stack from "@mui/material/Stack";
import { VFC } from "react";
import DemoTemplate from "../../../src/components/DemoTemplate/DemoTemplate";
import LineClamp from "./LineClamp";

const LineClampDemo: VFC = () => (
  <DemoTemplate title header={"Line clamp"}>
    <Stack spacing={1} sx={{ maxWidth: 400 }}>
      <LineClamp lines={2} variant={"subtitle2"}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium,
        aliquam aliquid blanditiis deleniti dignissimos, laboriosam minima
        mollitia natus, nesciunt non obcaecati optio pariatur porro quas
        quisquam reprehenderit similique soluta veritatis?
      </LineClamp>
    </Stack>
  </DemoTemplate>
);

export default LineClampDemo;
