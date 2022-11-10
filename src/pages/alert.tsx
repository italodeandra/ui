import { getCookies } from "cookies-next";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import Alert from "../../lib/components/Alert/Alert";
import Breadcrumbs from "../../lib/components/Breadcrumbs/Breadcrumbs";
import Button from "../../lib/components/Button/Button";
import Stack from "../../lib/components/Stack/Stack";
import getPublicLayout from "../views/publicLayout";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

const pages = [{ title: "Alert" }];

export default function AlertDemoPage() {
  return (
    <Stack className="p-2">
      <NextSeo title="Alert" />
      <Breadcrumbs pages={pages} className="mb-4" />
      <Alert title="Default alert">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </Alert>
      <Alert title="Error alert" variant="error">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </Alert>
      <Alert title="Success alert" variant="success">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </Alert>
      <Alert
        title="With actions"
        variant="error"
        actions={
          <Button variant="text" color="error">
            Try again
          </Button>
        }
      >
        There was an unknown error
      </Alert>
    </Stack>
  );
}

AlertDemoPage.getLayout = getPublicLayout;
