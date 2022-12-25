import { getCookies } from "cookies-next";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import Breadcrumbs from "../../lib/components/Breadcrumbs/Breadcrumbs";
import Stack from "../../lib/components/Stack/Stack";
import ClientComponentWithErrorBoundary from "../../src/components/ClientComponentWithErrorBoundary";
import getPublicLayout from "../views/publicLayout";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

const pages = [{ title: "Error boundary" }];

export default function ErrorBoundaryDemoPage() {
  return (
    <>
      <NextSeo title="Error boundary" />
      <Breadcrumbs pages={pages} className="mb-2 md:mx-2" />
      <Stack className="p-2">
        <ClientComponentWithErrorBoundary />
      </Stack>
    </>
  );
}

ErrorBoundaryDemoPage.getLayout = getPublicLayout;
