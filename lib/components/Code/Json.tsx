import Code from "./Code";

export type JsonProps = {
  json: any;
};

export default function Json({ json }: JsonProps) {
  return <Code language="json">{JSON.stringify(json, null, 2)}</Code>;
}
