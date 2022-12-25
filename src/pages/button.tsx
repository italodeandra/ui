import Group from "../../lib/components/Group/Group";
import Button from "../../lib/components/Button/Button";
import Stack from "../../lib/components/Stack/Stack";
import getPublicLayout from "../views/publicLayout";
import { UserIcon } from "@heroicons/react/24/outline";
import { NextSeo } from "next-seo";
import { GetServerSideProps } from "next";
import { getCookies } from "cookies-next";
import Breadcrumbs from "../../lib/components/Breadcrumbs/Breadcrumbs";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

const pages = [{ title: "Button" }];

export default function ButtonDemoPage() {
  return (
    <>
      <NextSeo title="Button" />
      <Breadcrumbs pages={pages} className="mb-2 md:mx-2" />
      <Stack className="p-2">
        <Group wrap>
          <Button>Default</Button>
        </Group>
        <Group wrap>
          <Button variant="filled" color="primary">
            Filled primary
          </Button>
          <Button variant="light" color="primary">
            Light primary
          </Button>
          <Button variant="outlined" color="primary">
            Outlined primary
          </Button>
          <Button variant="text" color="primary">
            Text primary
          </Button>
        </Group>
        <Group wrap>
          <Button variant="filled" color="success">
            Filled success
          </Button>
          <Button variant="light" color="success">
            Light success
          </Button>
          <Button variant="outlined" color="success">
            Outlined success
          </Button>
          <Button variant="text" color="success">
            Text success
          </Button>
        </Group>
        <Group wrap>
          <Button variant="filled" color="error">
            Filled error
          </Button>
          <Button variant="light" color="error">
            Light error
          </Button>
          <Button variant="outlined" color="error">
            Outlined error
          </Button>
          <Button variant="text" color="error">
            Text error
          </Button>
        </Group>
        <Group wrap>
          <Button variant="filled" color="gray">
            Filled gray
          </Button>
          <Button variant="light" color="gray">
            Light gray
          </Button>
          <Button variant="outlined" color="gray">
            Outlined gray
          </Button>
          <Button variant="text" color="gray">
            Text gray
          </Button>
        </Group>
        <Group wrap>
          <Button variant="filled" color="white">
            Filled white
          </Button>
          <Button variant="light" color="white">
            Light white
          </Button>
          <Button variant="outlined" color="white">
            Outlined white
          </Button>
          <Button variant="text" color="white">
            Text white
          </Button>
        </Group>
        <Group wrap>
          <Button icon className="rounded-full">
            <UserIcon className="w-6" />
          </Button>
        </Group>
      </Stack>
    </>
  );
}

ButtonDemoPage.getLayout = getPublicLayout;
