import Code from "./Code";
import { isNil } from "lodash";

export type JsonProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  json: any;
  className?: string;
};

export default function Json({ json, className }: JsonProps) {
  return (
    <Code language="js" className={className}>
      {JSON.stringify(isNil(json) ? null : json, null, 2)}
    </Code>
  );
}
