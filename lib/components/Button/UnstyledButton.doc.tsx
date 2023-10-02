import Text from "../Text";
import Group from "../Group";
import React from "react";
import {
  ExampleCode,
  useExampleCodeCallback,
} from "../../../src/components/ExampleCode/ExampleCode";
import { DocPageProps } from "../../../src/components/DocPage/DocPageProps";
import { DocPage } from "../../../src/components/DocPage/DocPage";
import UnstyledButton from "./UnstyledButton";

const props: DocPageProps[] = [
  {
    property: "href",
    type: `string`,
    description: `Turn the button into a link.`,
  },
  {
    property: "...",
    type: `ButtonHTMLAttributes`,
    description: `All the other native \`<button>\` properties.`,
  },
];

export function UnstyledButtonDoc() {
  let getExampleCodeMouseEvents = useExampleCodeCallback();

  return (
    <DocPage title="UnstyledButton" props={props}>
      <Text>
        Buttons allow users to take actions, and make choices, with a single
        tap.
      </Text>
      <Text>
        This one is unstyled and should be used only if you just want the{" "}
        <span className="markdown">
          <code>href</code>
        </span>{" "}
        property behavior.
      </Text>
      <Text variant="label">Examples</Text>
      <Group wrap>
        <UnstyledButton
          href="/"
          {...getExampleCodeMouseEvents(
            `<UnstyledButton href="/">Home</UnstyledButton>`
          )}
        >
          Home
        </UnstyledButton>
      </Group>
      <ExampleCode />
    </DocPage>
  );
}
