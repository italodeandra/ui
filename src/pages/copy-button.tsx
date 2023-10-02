import { getCookies } from "cookies-next";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import Breadcrumbs from "../../lib/components/Breadcrumbs";
import CopyButton from "../../lib/components/CopyButton";
import Stack from "../../lib/components/Stack";
import getPublicLayout from "../views/publicLayout";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

const pages = [{ title: "Copy button" }];

export default function AlertDemoPage() {
  return (
    <>
      <NextSeo title={pages[0].title} />
      <Breadcrumbs pages={pages} className="mb-2 md:mx-2" />
      <Stack className="p-2">
        <div className="group relative max-w-[300px] rounded bg-zinc-200 p-4">
          This text will be copied
          <CopyButton text="This text will be copied" />
        </div>
      </Stack>
    </>
  );
}

AlertDemoPage.getLayout = getPublicLayout;
