import { VFC } from "react";
import DemoTemplate from "../../../src/components/DemoTemplate/DemoTemplate";
import Json from "./Json";

const json = { boolean: true, null: null, number: 1, string: "text" };

const JsonDemo: VFC = () => (
  <DemoTemplate title header={"Json"}>
    <Json label={"Label"} json={json} />
  </DemoTemplate>
);

export default JsonDemo;
