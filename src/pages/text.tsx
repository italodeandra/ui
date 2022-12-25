import Text from "../../lib/components/Text/Text";
import Stack from "../../lib/components/Stack/Stack";
import getPublicLayout from "../views/publicLayout";
import { NextSeo } from "next-seo";
import { GetServerSideProps } from "next";
import { getCookies } from "cookies-next";
import Breadcrumbs from "../../lib/components/Breadcrumbs/Breadcrumbs";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

const pages = [{ title: "Text" }];

export default function TextDemoPage() {
  return (
    <>
      <NextSeo title="Text" />
      <Breadcrumbs pages={pages} className="mb-2 md:mx-2" />
      <Stack className="p-2">
        <Text variant="label">Label</Text>
        <Text variant="secondary">Secondary</Text>
        <Text variant="link" href="/">
          Link
        </Text>
        <Text>Default</Text>
      </Stack>
    </>
  );
}

TextDemoPage.getLayout = getPublicLayout;
