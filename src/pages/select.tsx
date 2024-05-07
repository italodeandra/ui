import getPublicLayout from "../views/publicLayout";
import { NextSeo } from "next-seo";
import { GetServerSideProps } from "next";
import { getCookies } from "cookies-next";
import Breadcrumbs from "../../lib/components/Breadcrumbs";
import { useState } from "react";
import Select from "../../lib/components/Select";
import Group from "../../lib/components/Group";
import fakeArray from "../../lib/utils/fakeArray";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

const pages = [{ title: "Select" }];

export default function Page() {
  const [type, setType] = useState<"size" | "quantity">("quantity");

  return (
    <>
      <NextSeo title={pages[0].title} />
      <Breadcrumbs pages={pages} className="mb-2 md:mx-2" />
      <Group className="p-2">
        <Select.Root
          onValueChange={(value) => setType(value as typeof type)}
          value={type}
        >
          <Select.Trigger />
          <Select.Content>
            <Select.Item value="quantity">Quantity</Select.Item>
            <Select.Item value="size">Size</Select.Item>
            {fakeArray(50).map((n) => (
              <Select.Item key={n} value={n.toString()}>
                Option {n}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>

        <Select.Root
          onValueChange={(value) => setType(value as typeof type)}
          value={type}
        >
          <Select.Trigger />
          <Select.Content>
            <Select.Group>
              <Select.Label>Filter group</Select.Label>
              <Select.Item value="quantity">Quantity</Select.Item>
              <Select.Item value="size">Size</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </Group>
    </>
  );
}

Page.getLayout = getPublicLayout;
