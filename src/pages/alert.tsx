import { getCookies } from "cookies-next";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import Alert from "../../lib/components/Alert/Alert";
import Button from "../../lib/components/Button/Button";
import Stack from "../../lib/components/Stack/Stack";
import getPublicLayout from "../views/publicLayout";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

export default function AlertDemoPage() {
  return (
    <Stack className="p-2">
      <NextSeo title="Alert" />
      <Alert title="Default alert">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </Alert>
      <Alert title="Error alert" variant="error">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </Alert>
      <Alert title="Success alert" variant="success">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </Alert>
      <Alert title="With actions" variant="success">
        <Stack>
          <div>There was an unknown error</div>
          <div className="-mx-3 -mb-3">
            <Button variant="text" color="success">
              Try again
            </Button>
          </div>
        </Stack>
      </Alert>
    </Stack>
  );
}

AlertDemoPage.getLayout = getPublicLayout;
