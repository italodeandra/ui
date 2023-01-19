import Stack from "../../lib/components/Stack/Stack";
import getPublicLayout from "../views/publicLayout";
import { NextSeo } from "next-seo";
import { GetServerSideProps } from "next";
import { getCookies } from "cookies-next";
import Breadcrumbs from "../../lib/components/Breadcrumbs/Breadcrumbs";
import Switch, { SwitchInput } from "../../lib/components/Switch/Switch";
import { useState } from "react";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

const pages = [{ title: "Switch" }];

export default function SwitchDemoPage() {
  let [checked, setChecked] = useState(false);

  return (
    <>
      <NextSeo title="Switch" />
      <Breadcrumbs pages={pages} className="mb-2 md:mx-2" />
      <Stack className="p-2">
        <Switch checked={checked} onChange={setChecked} />
        <Switch
          checked={checked}
          onChange={setChecked}
          rightLabel="With right label"
        />
        <SwitchInput
          checked={checked}
          onChange={setChecked}
          label="Input label"
          rightLabel="With right label"
        />
      </Stack>
    </>
  );
}

SwitchDemoPage.getLayout = getPublicLayout;
