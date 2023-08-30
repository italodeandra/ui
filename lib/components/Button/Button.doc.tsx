import Text from "../Text/Text";
import Group from "../Group/Group";
import Button, { ButtonProps } from "./Button";
import { UserIcon } from "@heroicons/react/24/outline";
import React, {
  cloneElement,
  ComponentProps,
  ComponentType,
  ReactElement,
  ReactNode,
} from "react";
import {
  ExampleCode,
  useExampleCodeCallback,
} from "../../../src/components/ExampleCode/ExampleCode";
import { DocPageProps } from "../../../src/components/DocPage/DocPageProps";
import { DocPage } from "../../../src/components/DocPage/DocPage";

const props: DocPageProps[] = [
  {
    property: "variant",
    type: `"filled" | "light" | "outlined" | "text" | "custom"`,
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
    property: "size",
    type: `"xs" | "sm" | "md" | "lg" | "xl`,
    defaultValue: `"md"`,
    description: "Size of the button.",
  },
  {
    property: "icon",
    type: `boolean`,
    defaultValue: `false`,
    description: `If the button content in just an icon.\r\n\r\nThe icon will receive the classes \`w-? h-?\` automatically.`,
  },
  {
    property: "type",
    type: `string`,
    defaultValue: `"button"`,
    description: `The HTML native property \`type\`.\r\n\r\nThe default value is changed to \`button\`.`,
  },
  {
    property: "leading",
    type: `ReactNode`,
    description: `The icon shown before the button content.\r\n\r\nThe icon will receive the classes \`w-? h-?\` automatically.`,
  },
  {
    property: "trailing",
    type: `ReactNode`,
    description: `The icon shown after the button content.\r\n\r\nThe icon will receive the classes \`w-? h-?\` automatically.`,
  },
  {
    property: "leadingIcon",
    type: `ReactNode`,
    description: `Deprecated. Use \`leading\` instead.`,
  },
  {
    property: "trailingIcon",
    type: `ReactNode`,
    description: `Deprecated. Use \`trailing\` instead.`,
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
    property: "rounded",
    type: `boolean`,
    defaultValue: `false`,
    description: `If button should be fully rounded.`,
  },
  {
    property: "...",
    type: `ButtonHTMLAttributes`,
    description: `All the other native \`<button>\` properties.`,
  },
];

function createExample(render: ReactElement, code: string) {
  return {
    render,
    code,
  };
}

function createColorExamples(color: ButtonProps["color"]) {
  return [
    createExample(
      <Button variant="filled" color={color}>
        Filled {color}
      </Button>,
      `<Button variant="filled" color="${color}">
  Filled ${color}
</Button>`
    ),
    createExample(
      <Button variant="light" color={color}>
        Light {color}
      </Button>,
      `<Button variant="light" color="${color}">
  Light ${color}
</Button>`
    ),
    createExample(
      <Button variant="outlined" color={color}>
        Outlined {color}
      </Button>,
      `<Button variant="outlined" color="${color}">
  Outlined ${color}
</Button>`
    ),
    createExample(
      <Button variant="text" color={color}>
        Text {color}
      </Button>,
      `<Button variant="text" color="${color}">
  Text ${color}
</Button>`
    ),
  ];
}

function createSizeExamples(size?: ButtonProps["size"]) {
  return [
    createExample(
      <Button size={size} className="mb-auto">
        Size {size || "md"}
      </Button>,
      `<Button${size ? ` size="${size}"` : ""}>
  Size ${size || "md"}
</Button>`
    ),
    createExample(
      <Button icon size={size} className="mb-auto">
        <UserIcon />
      </Button>,
      `<Button icon size="${size}">
  <UserIcon />
</Button>`
    ),
  ];
}

let exampleLineBreak = {
  lineBreak: true,
} as const;

let examples: (
  | {
      render: ReactElement;
      code: string;
      lineBreak?: true;
    }
  | { lineBreak: true }
)[] = [
  createExample(<Button>Default</Button>, `<Button>Default</Button>`),
  createExample(
    <Button disabled>Disabled</Button>,
    `<Button disabled>Default</Button>`
  ),
  exampleLineBreak,
  ...createColorExamples("default"),
  exampleLineBreak,
  ...createColorExamples("primary"),
  exampleLineBreak,
  ...createColorExamples("success"),
  exampleLineBreak,
  ...createColorExamples("error"),
  exampleLineBreak,
  ...createColorExamples("gray"),
  exampleLineBreak,
  createExample(
    <Button icon>
      <UserIcon />
    </Button>,
    `<Button icon>
  <UserIcon />
</Button>`
  ),
  createExample(
    <Button icon rounded>
      <UserIcon />
    </Button>,
    `<Button icon rounded>
  <UserIcon />
</Button>`
  ),
  exampleLineBreak,
  ...createSizeExamples("xs"),
  exampleLineBreak,
  ...createSizeExamples("sm"),
  exampleLineBreak,
  ...createSizeExamples(),
  exampleLineBreak,
  ...createSizeExamples("lg"),
  exampleLineBreak,
  ...createSizeExamples("xl"),
  exampleLineBreak,
  createExample(
    <Button loading>Loading</Button>,
    `<Button loading>Loading</Button>`
  ),
  createExample(
    <Button icon loading>
      <UserIcon />
    </Button>,
    `<Button icon loading>
  <UserIcon />
</Button>`
  ),
  exampleLineBreak,
  createExample(
    <Button
      variant="custom"
      className="border-transparent bg-purple-500 text-onPrimary hover:bg-purple-500/80 active:border-purple-700 dark:active:border-purple-300"
    >
      Custom color
    </Button>,
    `<Button
  variant="custom"
  className="border-transparent bg-purple-500 text-onPrimary hover:bg-purple-500/80 active:border-purple-700 dark:active:border-purple-300"
>
  Custom color
</Button>`
  ),
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
        <Text variant="link" href="/unstyled-button">
          UnstyledButton
        </Text>
        .
      </Text>
      <Text variant="label">Examples</Text>
      <Group wrap>
        {examples.map((example) =>
          example.lineBreak ? (
            <div className="basis-full" />
          ) : (
            cloneElement(
              example.render,
              getExampleCodeMouseEvents(example.code)
            )
          )
        )}
      </Group>
      <ExampleCode />
    </DocPage>
  );
}
