import { getCookies } from "cookies-next";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import Accordion from "../../lib/components/Accordion";
import Breadcrumbs from "../../lib/components/Breadcrumbs";
import Stack from "../../lib/components/Stack";
import getPublicLayout from "../views/publicLayout";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

const pages = [{ title: "Accordion" }];

export default function AlertDemoPage() {
  return (
    <>
      <NextSeo title={pages[0].title} />
      <Breadcrumbs pages={pages} className="mb-2 md:mx-2" />
      <Stack className="p-2">
        <Accordion>
          <Accordion.Item title="Test 1">Test 1</Accordion.Item>
          <Accordion.Item title="Test 2">Test 2</Accordion.Item>
          <Accordion.Item title="Test 3">Test 3</Accordion.Item>
        </Accordion>
      </Stack>
    </>
  );
}

AlertDemoPage.getLayout = getPublicLayout;
