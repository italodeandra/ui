import { VFC } from "react";
import DemoTemplate from "../../../src/components/DemoTemplate/DemoTemplate";
import DateFormat from "./DateFormat";

const DateFormatDemo: VFC = () => (
  <DemoTemplate title header={"DateFormat"}>
    <DateFormat date={new Date()} format={"Pp"} />
  </DemoTemplate>
);

export default DateFormatDemo;
