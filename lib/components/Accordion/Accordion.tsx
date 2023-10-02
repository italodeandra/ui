import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { ReactNode } from "react";
import { Disclosure } from "@headlessui/react";
import Stack from "../Stack";

export default function Accordion({ children }: { children?: ReactNode }) {
  return <Stack>{children}</Stack>;
}

Accordion.Item = AccordionItem;

function AccordionItem({
  children,
  title,
  defaultOpen,
}: {
  children?: ReactNode;
  title: ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <Disclosure defaultOpen={defaultOpen}>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full justify-between rounded-lg bg-zinc-200 px-4 py-2 text-left text-sm font-medium hover:bg-zinc-300 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 dark:bg-zinc-800 dark:hover:bg-zinc-700">
            {title}
            <ChevronUpIcon
              className={`${open ? "rotate-180 transform" : ""} h-5 w-5`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="px-4 pt-2 pb-2">
            {children}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
