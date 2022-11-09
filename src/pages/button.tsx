import Group from "../../lib/components/Group/Group";
import Button from "../../lib/components/Button/Button";
import Stack from "../../lib/components/Stack/Stack";
import getPublicLayout from "../views/publicLayout";
import { UserIcon } from "@heroicons/react/24/outline";
import { NextSeo } from "next-seo";
import { GetServerSideProps } from "next";
import { getCookies } from "cookies-next";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

export default function ButtonPage() {
  return (
    <Stack className="p-2">
      <NextSeo title="Button" />
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
        <Button icon className="rounded-full">
          <UserIcon className="w-6" />
        </Button>
      </Group>
    </Stack>
  );
}

ButtonPage.getLayout = getPublicLayout;
