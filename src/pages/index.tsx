import { getCookies } from "cookies-next";
import { GetServerSideProps } from "next";
import getPublicLayout from "../views/publicLayout";
import Button from "../../lib/components/Button";
import Stack from "../../lib/components/Stack";
import { ArrowLongRightIcon } from "@heroicons/react/20/solid";
import Group from "../../lib/components/Group";
import Input from "../../lib/components/Input";
import { SwitchInput } from "../../lib/components/Switch";
import React, { useState } from "react";
import ImageInput from "../../lib/components/ImageInput";
import { FileSelectProvider } from "../../lib/components/FileSelect";
import MultiSelect from "../../lib/components/MultiSelect";
import Checkbox from "../../lib/components/Checkbox";
import { showNotification } from "../../lib/components/Notifications";
import Text from "../../lib/components/Text";
import {
  ExampleCode,
  useExampleCodeCallback,
} from "../components/ExampleCode/ExampleCode";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

function SwitchExample(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >,
) {
  let [checked, setChecked] = useState(true);

  return (
    <div {...props}>
      <SwitchInput
        label="Switch"
        rightLabel={checked ? "Checked" : "Not checked"}
        checked={checked}
        onChange={setChecked}
      />
    </div>
  );
}

const mcuHeroes = [
  "Steve Rogers (Captain America)",
  "Tony Stark (Iron Man)",
  "Thor",
  "Peter Parker (Spider-Man)",
  "Natasha Romanoff (Black Widow)",
  "King T'Challa (Black Panther)",
  "Bruce Banner (Hulk)",
  "Scott Lang (Ant-Man)",
];

function MultiSelectExample(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >,
) {
  return (
    <div {...props}>
      <MultiSelect
        label="MCU Heroes"
        items={mcuHeroes}
        onChange={console.info}
        placeholder="+ name"
        creatable
      />
    </div>
  );
}

export default function Page() {
  let getExampleCodeMouseEvents = useExampleCodeCallback();

  return (
    <div className="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      <Group className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <Stack className="max-w-xl gap-5">
          <p className="mt-1 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl lg:text-6xl">
            Extremely{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text text-transparent">
              beautiful
            </span>{" "}
            designed user interface.
          </p>
          <p className="text-xl text-gray-500 dark:text-gray-400">
            A collection of components, hooks and utility functions for creating
            unique interfaces without forgetting to be responsive, accessible
            and artistic at the same.
          </p>
          <p>
            <Button
              href="/getting-started"
              variant="light"
              color="primary"
              trailing={<ArrowLongRightIcon />}
              className="!px-4 !text-lg"
              {...getExampleCodeMouseEvents(`<Button
  href="/getting-started"
  variant="outlined"
  color="primary"
  trailing={<ArrowLongRightIcon />}
  className="!px-4 !text-lg"
>
  Get started
</Button>;`)}
            >
              Get started
            </Button>
          </p>
        </Stack>
        <div className="max-w-full md:ml-auto">
          <Stack className="w-full gap-5 md:items-end">
            <Text
              variant="label"
              {...getExampleCodeMouseEvents(
                `<Text variant="label">Examples</Text>`,
              )}
            >
              Examples
            </Text>
            <Group>
              <Button
                variant="filled"
                {...getExampleCodeMouseEvents(
                  `<Button variant="filled">Filled</Button>`,
                )}
              >
                Filled
              </Button>
              <Button
                variant="light"
                {...getExampleCodeMouseEvents(
                  `<Button variant="light">Light</Button>`,
                )}
              >
                Light
              </Button>
              <Button
                variant="outlined"
                {...getExampleCodeMouseEvents(
                  `<Button variant="outlined">Outlined</Button>`,
                )}
              >
                Outlined
              </Button>
              <Button
                variant="text"
                {...getExampleCodeMouseEvents(
                  `<Button variant="text">Text</Button>`,
                )}
              >
                Text
              </Button>
            </Group>
            <Group>
              <Input
                label="Input"
                {...getExampleCodeMouseEvents(`<Input label="Input" />`)}
              />
              <SwitchExample
                {...getExampleCodeMouseEvents(`<SwitchInput
  label="Switch"
  rightLabel={checked ? "Checked" : "Not checked"}
  checked={checked}
  onChange={setChecked}
/>`)}
              />
            </Group>
            <div
              {...getExampleCodeMouseEvents(`<Checkbox
  label="Checkbox"
  description="A better explanation of what will happen if you check this box"
  onChange={(event) => {
    if (event.target.checked) {
      showNotification("A notification will appear");
    }
  }}
/>`)}
            >
              <Checkbox
                label="Checkbox"
                description="A better explanation of what will happen if you check this box"
                onChange={(event) => {
                  if (event.target.checked) {
                    showNotification("A notification will appear");
                  }
                }}
              />
            </div>
            <MultiSelectExample
              {...getExampleCodeMouseEvents(`<MultiSelect
  label="MCU Heroes"
  items={mcuHeroes}
  onChange={console.info}
  placeholder="+ name"
  creatable
/>`)}
            />
            <FileSelectProvider>
              <ImageInput
                label="Profile picture"
                {...getExampleCodeMouseEvents(
                  `<FileSelectProvider>
  <ImageInput label="Profile picture" />
</FileSelectProvider>`,
                )}
              />
            </FileSelectProvider>
            <ExampleCode />
          </Stack>
        </div>
      </Group>
    </div>
  );
}

Page.getLayout = getPublicLayout;
