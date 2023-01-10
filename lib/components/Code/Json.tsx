import Code from "./Code";

export type JsonProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  json: any;
  className?: string;
};

export default function Json({ json, className }: JsonProps) {
  return (
    <Code language="json" className={className}>
      {JSON.stringify(json, null, 2)}
    </Code>
  );
}
