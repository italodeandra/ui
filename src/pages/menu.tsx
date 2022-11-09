import Stack from "../../lib/components/Stack/Stack";
import getPublicLayout from "../views/publicLayout";
import Menu from "../../lib/components/Menu/Menu";
import { UserIcon } from "@heroicons/react/24/outline";
import Button from "../../lib/components/Button/Button";
import { NextSeo } from "next-seo";
import { GetServerSideProps } from "next";
import { getCookies } from "cookies-next";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

export default function MenuPage() {
  return (
    <Stack className="p-2">
      <NextSeo title="Menu" />
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

MenuPage.getLayout = getPublicLayout;
