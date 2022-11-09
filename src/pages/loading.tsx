import Button from "../../lib/components/Button/Button";
import Stack from "../../lib/components/Stack/Stack";
import getPublicLayout from "../views/publicLayout";
import { NextSeo } from "next-seo";
import Loading from "../../lib/components/Loading/Loading";
import { GetServerSideProps } from "next";
import { getCookies } from "cookies-next";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

export default function LoadingDemoPage() {
  return (
    <Stack className="p-2">
      <NextSeo title="Loading" />
      <Loading />
      <Button loading>Button loading</Button>
      <Button variant="filled" loading>
        Button loading
      </Button>
    </Stack>
  );
}

LoadingDemoPage.getLayout = getPublicLayout;
