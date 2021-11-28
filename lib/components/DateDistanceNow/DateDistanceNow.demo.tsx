import { VFC } from "react";
import DemoTemplate from "../../../src/components/DemoTemplate/DemoTemplate";
import DateFormat from "./DateDistanceNow";

const DateDistanceNowDemo: VFC = () => (
  <DemoTemplate title header={"DateDistanceNow"}>
    <DateFormat date={new Date()} />
  </DemoTemplate>
);

export default DateDistanceNowDemo;
