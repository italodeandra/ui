import Stack from "../../lib/components/Stack/Stack";
import getPublicLayout from "../views/publicLayout";
import Menu from "../../lib/components/Menu/Menu";
import { UserIcon } from "@heroicons/react/24/outline";
import Button from "../../lib/components/Button/Button";
import { NextSeo } from "next-seo";
import { GetServerSideProps } from "next";
import { getCookies } from "cookies-next";
import Breadcrumbs from "../../lib/components/Breadcrumbs/Breadcrumbs";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

const pages = [{ title: "Menu" }];

export default function MenuDemoPage() {
  return (
    <Stack className="p-2">
      <NextSeo title="Menu" />
      <Breadcrumbs pages={pages} className="mb-4" />
      <Menu label="Options" className="mr-auto" position="left">
        <Menu.Item>Account settings</Menu.Item>
        <Menu.Item>Support</Menu.Item>
        <Menu.Item>License</Menu.Item>
        <Menu.Item>Sign out</Menu.Item>
      </Menu>
      <Menu
        button={
          <Button icon className="rounded-full">
            <UserIcon />
          </Button>
        }
        className="mr-auto"
        position="left"
      >
        <Menu.Item>Sign out</Menu.Item>
      </Menu>
    </Stack>
  );
}

MenuDemoPage.getLayout = getPublicLayout;
