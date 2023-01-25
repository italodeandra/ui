import Text from "../Text/Text";
import Group from "../Group/Group";
import Button from "./Button";
import { UserIcon } from "@heroicons/react/24/outline";
import React from "react";
import {
  ExampleCode,
  useExampleCodeCallback,
} from "../../../src/components/ExampleCode/ExampleCode";
import { DocPageProps } from "../../../src/components/DocPage/DocPageProps";
import { DocPage } from "../../../src/components/DocPage/DocPage";

const props: DocPageProps[] = [
  {
    property: "variant",
    type: `"filled" | "light" | "outlined" | "text"`,
    defaultValue: `"outlined"`,
    description: "Design variant of the button.",
  },
  {
    property: "color",
    type: `"primary" | "success" | "error" | "gray" | "white"`,
    defaultValue: `"white" (outlined, text)\r\n\r\n"primary" (filled, light)`,
    description:
      "Color of the button.\r\n\r\nThe default value depends on the variant.",
  },
  {
    property: "icon",
    type: `boolean`,
    defaultValue: `false`,
    description: `If the button content in just an icon.\r\n\r\nThe icon will receive the class \`w-6\` automatically.`,
  },
  {
    property: "type",
    type: `string`,
    defaultValue: `"button"`,
    description: `The HTML native property \`type\`.\r\n\r\nThe default value is changed to \`button\`.`,
  },
  {
    property: "leadingIcon",
    type: `ReactNode`,
    description: `The icon shown before the button content.\r\n\r\nThe icon will receive the class \`w-6\` automatically.`,
  },
  {
    property: "trailingIcon",
    type: `ReactNode`,
    description: `The icon shown after the button content.\r\n\r\nThe icon will receive the class \`w-6\` automatically.`,
  },
  {
    property: "loading",
    type: `boolean`,
    defaultValue: `false`,
    description: `If should show a loading indicator as the trailing icon.`,
  },
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

export function ButtonDoc() {
  let getExampleCodeMouseEvents = useExampleCodeCallback();

  return (
    <DocPage title="Button" props={props}>
      <Text>
        Buttons allow users to take actions, and make choices, with a single
        tap.
      </Text>
      <Text>
        You might want to also take a look at the{" "}
        <Text href="/unstyled-button">UnstyledButton</Text>.
      </Text>
      <Text variant="label">Examples</Text>
      <Group wrap>
        <Button {...getExampleCodeMouseEvents(`<Button>Default</Button>`)}>
          Default
        </Button>
      </Group>
      <Group wrap>
        <Button
          variant="filled"
          color="primary"
          {...getExampleCodeMouseEvents(`<Button variant="filled" color="primary">
  Filled primary
</Button>`)}
        >
          Filled primary
        </Button>
        <Button
          variant="light"
          color="primary"
          {...getExampleCodeMouseEvents(`<Button variant="light" color="primary">
  Light primary
</Button>`)}
        >
          Light primary
        </Button>
        <Button
          variant="outlined"
          color="primary"
          {...getExampleCodeMouseEvents(`<Button variant="outlined" color="primary">
  Outlined primary
</Button>`)}
        >
          Outlined primary
        </Button>
        <Button
          variant="text"
          color="primary"
          {...getExampleCodeMouseEvents(`<Button variant="text" color="primary">
  Text primary
</Button>`)}
        >
          Text primary
        </Button>
      </Group>
      <Group wrap>
        <Button
          variant="filled"
          color="success"
          {...getExampleCodeMouseEvents(`<Button variant="filled" color="success">
  Filled success
</Button>`)}
        >
          Filled success
        </Button>
        <Button
          variant="light"
          color="success"
          {...getExampleCodeMouseEvents(`<Button variant="light" color="success">
  Light success
</Button>`)}
        >
          Light success
        </Button>
        <Button
          variant="outlined"
          color="success"
          {...getExampleCodeMouseEvents(`<Button variant="outlined" color="success">
  Outlined success
</Button>`)}
        >
          Outlined success
        </Button>
        <Button
          variant="text"
          color="success"
          {...getExampleCodeMouseEvents(`<Button variant="text" color="success">
  Text success
</Button>`)}
        >
          Text success
        </Button>
      </Group>
      <Group wrap>
        <Button
          variant="filled"
          color="error"
          {...getExampleCodeMouseEvents(`<Button variant="filled" color="error">
  Filled error
</Button>`)}
        >
          Filled error
        </Button>
        <Button
          variant="light"
          color="error"
          {...getExampleCodeMouseEvents(`<Button variant="light" color="error">
  Light error
</Button>`)}
        >
          Light error
        </Button>
        <Button
          variant="outlined"
          color="error"
          {...getExampleCodeMouseEvents(`<Button variant="outlined" color="error">
  Outlined error
</Button>`)}
        >
          Outlined error
        </Button>
        <Button
          variant="text"
          color="error"
          {...getExampleCodeMouseEvents(`<Button variant="text" color="error">
  Text error
</Button>`)}
        >
          Text error
        </Button>
      </Group>
      <Group wrap>
        <Button
          variant="filled"
          color="gray"
          {...getExampleCodeMouseEvents(`<Button variant="filled" color="gray">
  Filled gray
</Button>`)}
        >
          Filled gray
        </Button>
        <Button
          variant="light"
          color="gray"
          {...getExampleCodeMouseEvents(`<Button variant="light" color="gray">
  Light gray
</Button>`)}
        >
          Light gray
        </Button>
        <Button
          variant="outlined"
          color="gray"
          {...getExampleCodeMouseEvents(`<Button variant="outlined" color="gray">
  Outlined gray
</Button>`)}
        >
          Outlined gray
        </Button>
        <Button
          variant="text"
          color="gray"
          {...getExampleCodeMouseEvents(`<Button variant="text" color="gray">
  Text gray
</Button>`)}
        >
          Text gray
        </Button>
      </Group>
      <Group wrap>
        <Button
          variant="filled"
          color="white"
          {...getExampleCodeMouseEvents(`<Button variant="filled" color="white">
  Filled white
</Button>`)}
        >
          Filled white
        </Button>
        <Button
          variant="light"
          color="white"
          {...getExampleCodeMouseEvents(`<Button variant="light" color="white">
  Light white
</Button>`)}
        >
          Light white
        </Button>
        <Button
          variant="outlined"
          color="white"
          {...getExampleCodeMouseEvents(`<Button variant="outlined" color="white">
  Outlined white
</Button>`)}
        >
          Outlined white
        </Button>
        <Button
          variant="text"
          color="white"
          {...getExampleCodeMouseEvents(`<Button variant="text" color="white">
  Text white
</Button>`)}
        >
          Text white
        </Button>
      </Group>
      <Group wrap>
        <Button
          loading
          {...getExampleCodeMouseEvents(`<Button loading>Loading</Button>`)}
        >
          Loading
        </Button>
      </Group>
      <Group wrap>
        <Button
          icon
          {...getExampleCodeMouseEvents(`<Button icon>
  <UserIcon />
</Button>`)}
        >
          <UserIcon />
        </Button>
        <Button
          icon
          className="rounded-full"
          {...getExampleCodeMouseEvents(`<Button icon className="rounded-full">
  <UserIcon />
</Button>`)}
        >
          <UserIcon />
        </Button>
      </Group>
      <ExampleCode />
    </DocPage>
  );
}
