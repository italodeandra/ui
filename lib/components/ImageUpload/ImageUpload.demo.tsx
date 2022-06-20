import { VFC } from "react";
import DemoTemplate from "../../../src/components/DemoTemplate/DemoTemplate";
import ImageUpload from "./ImageUpload";

const ImageUploadDemo: VFC = () => (
  <DemoTemplate title header={"Image upload"}>
    <ImageUpload
      labelInput={"Images"}
      onChange={console.info}
      value={[]}
      limit={2}
      required
      error
      helperText={"Test"}
    />
  </DemoTemplate>
);

export default ImageUploadDemo;
