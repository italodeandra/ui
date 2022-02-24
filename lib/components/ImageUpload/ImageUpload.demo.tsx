import { VFC } from "react";
import DemoTemplate from "../../../src/components/DemoTemplate/DemoTemplate";
import ImageUpload from "./ImageUpload";

const ImageUploadDemo: VFC = () => (
  <DemoTemplate title header={"Button"}>
    <ImageUpload
      labelInput={"Images"}
      onChange={console.info}
      value={[]}
    />
  </DemoTemplate>
);

export default ImageUploadDemo;
