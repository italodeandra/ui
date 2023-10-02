import Stack from "../../lib/components/Stack/Stack";
import getPublicLayout from "../views/publicLayout";
import { UserIcon } from "@heroicons/react/24/outline";
import Button from "../../lib/components/Button/Button";
import { NextSeo } from "next-seo";
import { GetServerSideProps } from "next";
import { getCookies } from "cookies-next";
import Breadcrumbs from "../../lib/components/Breadcrumbs/Breadcrumbs";
import DropdownMenu from "../../lib/components/DropdownMenu";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

const pages = [{ title: "Dropdown Menu" }];

export default function MenuDemoPage() {
  return (
    <>
      <NextSeo title="Menu" />
      <Breadcrumbs pages={pages} className="mb-2 md:mx-2" />
      <Stack className="p-2">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button icon className="mr-auto rounded-full">
              <UserIcon />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item>Account settings</DropdownMenu.Item>
            <DropdownMenu.Item>Support</DropdownMenu.Item>
            <DropdownMenu.Item>License</DropdownMenu.Item>
            <DropdownMenu.Item>Sign out</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Stack>
    </>
  );
}

MenuDemoPage.getLayout = getPublicLayout;
