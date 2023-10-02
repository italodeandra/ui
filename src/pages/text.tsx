import Text from "../../lib/components/Text";
import Stack from "../../lib/components/Stack";
import getPublicLayout from "../views/publicLayout";
import { NextSeo } from "next-seo";
import { GetServerSideProps } from "next";
import { getCookies } from "cookies-next";
import Breadcrumbs from "../../lib/components/Breadcrumbs";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

const pages = [{ title: "Text" }];

export default function TextDemoPage() {
  return (
    <>
      <NextSeo title={pages[0].title} />
      <Breadcrumbs pages={pages} className="mb-2 md:mx-2" />
      <Stack className="p-2">
        <Text variant="label">Variant label</Text>
        <Text variant="secondary">Variant secondary</Text>
        <Text variant="link" href="/">
          Link
        </Text>
        <Text size="xs">Size xs</Text>
        <Text size="sm">Size sm</Text>
        <Text>Default</Text>
        <Text size="lg">Size lg</Text>
        <Text size="xl">Size xl</Text>
        <Text size="2xl">Size 2xl</Text>
      </Stack>
    </>
  );
}

TextDemoPage.getLayout = getPublicLayout;
