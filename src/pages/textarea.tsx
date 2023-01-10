import { getCookies } from "cookies-next";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import Breadcrumbs from "../../lib/components/Breadcrumbs/Breadcrumbs";
import Stack from "../../lib/components/Stack/Stack";
import getPublicLayout from "../views/publicLayout";
import Textarea from "../../lib/components/Textarea/Textarea";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

const pages = [{ title: "Textarea" }];

export default function TextareaDemoPage() {
  return (
    <>
      <NextSeo title="Textarea" />
      <Breadcrumbs pages={pages} className="mb-2 md:mx-2" />
      <Stack className="p-2">
        <Textarea label="Multiline text field" minRows={2} />
      </Stack>
    </>
  );
}

TextareaDemoPage.getLayout = getPublicLayout;
