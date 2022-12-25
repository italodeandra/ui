import Stack from "../../lib/components/Stack/Stack";
import getPublicLayout from "../views/publicLayout";
import { NextSeo } from "next-seo";
import { GetServerSideProps } from "next";
import { getCookies } from "cookies-next";
import Breadcrumbs from "../../lib/components/Breadcrumbs/Breadcrumbs";
import Markdown from "../../lib/components/Markdown/Markdown";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

const pages = [{ title: "Markdown" }];

// noinspection JSUnusedGlobalSymbols
export default function ButtonDemoPage() {
  return (
    <>
      <NextSeo title="Markdown" />
      <Breadcrumbs pages={pages} className="mb-2 md:mx-2" />
      <Stack className="p-2">
        <Markdown>{`# Hello, *world*!
Just a link: https://reactjs.com.`}</Markdown>
      </Stack>
    </>
  );
}

ButtonDemoPage.getLayout = getPublicLayout;
