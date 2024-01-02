import { getCookies } from "cookies-next";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import Alert from "../../lib/components/Alert";
import Breadcrumbs from "../../lib/components/Breadcrumbs";
import Button from "../../lib/components/Button";
import Stack from "../../lib/components/Stack";
import getPublicLayout from "../views/publicLayout";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

const pages = [{ title: "Alert" }];

export default function Page() {
  return (
    <>
      <NextSeo title={pages[0].title} />
      <Breadcrumbs pages={pages} className="mb-2 md:mx-2" />
      <Stack className="p-2">
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
          actions={<Button variant="text">Try again</Button>}
        >
          There was an unknown error
        </Alert>
        <Alert
          title="One liner with button"
          variant="success"
          actions={<Button variant="text">Try again</Button>}
        />
      </Stack>
    </>
  );
}

Page.getLayout = getPublicLayout;
