import { getCookies } from "cookies-next";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import Breadcrumbs from "../../lib/components/Breadcrumbs";
import Stack from "../../lib/components/Stack";
import getPublicLayout from "../views/publicLayout";
import Tabs, { Tab } from "../../lib/components/Tabs/Tabs";
import { useState } from "react";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

const pages = [{ title: "Tabs" }];

export default function Page() {
  const [tab, setTab] = useState(0);

  return (
    <>
      <NextSeo title={pages[0].title} />
      <Breadcrumbs pages={pages} className="mb-2 md:mx-2" />
      <Stack className="p-2">
        <Tabs>
          <Tab selected={tab === 0} onClick={() => setTab(0)}>
            Info
          </Tab>
          <Tab selected={tab === 1} onClick={() => setTab(1)}>
            Form
          </Tab>
        </Tabs>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto
        consectetur consequatur debitis dolore dolorem doloribus, ea eos facilis
        id laboriosam magni nemo quos tempore velit voluptas voluptate
        voluptates? Repellat, tempora.
      </Stack>
    </>
  );
}

Page.getLayout = getPublicLayout;
