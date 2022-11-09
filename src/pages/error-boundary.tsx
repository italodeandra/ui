import { getCookies } from "cookies-next";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import Stack from "../../lib/components/Stack/Stack";
import ClientComponentWithErrorBoundary from "../../src/components/ClientComponentWithErrorBoundary";
import getPublicLayout from "../views/publicLayout";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

export default function ErrorBoundaryDemoPage() {
  return (
    <Stack className="p-2">
      <NextSeo title="Error boundary" />
      <ClientComponentWithErrorBoundary />
    </Stack>
  );
}

ErrorBoundaryDemoPage.getLayout = getPublicLayout;
