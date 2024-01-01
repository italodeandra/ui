import Stack from "../../lib/components/Stack";
import getPublicLayout from "../views/publicLayout";
import { UserIcon } from "@heroicons/react/24/outline";
import Button from "../../lib/components/Button";
import { NextSeo } from "next-seo";
import { GetServerSideProps } from "next";
import { getCookies } from "cookies-next";
import Breadcrumbs from "../../lib/components/Breadcrumbs";
import ContextMenu from "../../lib/components/ContextMenu";
import { useState } from "react";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

const pages = [{ title: "Context menu" }];

export default function Page() {
  const [checked, setChecked] = useState(true);

  return (
    <>
      <NextSeo title={pages[0].title} />
      <Breadcrumbs pages={pages} className="mb-2 md:mx-2" />
      <Stack className="p-2">
        <ContextMenu.Root>
          <ContextMenu.Trigger asChild>
            <Button icon className="mr-auto rounded-full">
              <UserIcon />
            </Button>
          </ContextMenu.Trigger>
          <ContextMenu.Content>
            <ContextMenu.CheckboxItem
              checked={checked}
              onCheckedChange={setChecked}
            >
              Check this
            </ContextMenu.CheckboxItem>
            <ContextMenu.Item>Account settings</ContextMenu.Item>
            <ContextMenu.Item>Support</ContextMenu.Item>
            <ContextMenu.Item>License</ContextMenu.Item>
            <ContextMenu.Separator />
            <ContextMenu.Item>Sign out</ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu.Root>
      </Stack>
    </>
  );
}

Page.getLayout = getPublicLayout;
