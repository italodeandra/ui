import Text from "../../lib/components/Text/Text";
import Stack from "../../lib/components/Stack/Stack";
import getPublicLayout from "../views/publicLayout";
import { NextSeo } from "next-seo";
import { GetServerSideProps } from "next";
import { getCookies } from "cookies-next";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

export default function TextPage() {
  return (
    <Stack className="p-2">
      <NextSeo title="Text" />
      <Text variant="label">Label</Text>
      <Text variant="secondary">Secondary</Text>
      <Text variant="link" href="/">
        Link
      </Text>
      <Text>Default</Text>
    </Stack>
  );
}

TextPage.getLayout = getPublicLayout;
