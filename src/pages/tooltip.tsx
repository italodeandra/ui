import getPublicLayout from "../views/publicLayout";
import Button from "../../lib/components/Button";
import Tooltip from "../../lib/components/Tooltip";
import Stack from "../../lib/components/Stack";
import Text from "../../lib/components/Text";
import Group from "../../lib/components/Group";
import { NextSeo } from "next-seo";
import { GetServerSideProps } from "next";
import { getCookies } from "cookies-next";
import Breadcrumbs from "../../lib/components/Breadcrumbs";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

const pages = [{ title: "Tooltip" }];

export default function Page() {
  return (
    <>
      <NextSeo title={pages[0].title} />
      <Breadcrumbs pages={pages} className="mb-2 md:mx-2" />
      <Stack className="p-2">
        <Text variant="label">Only tooltip</Text>
        <div>
          <Group>
            <Tooltip content="This is the tooltip">
              <Button>Hover to show tooltip</Button>
            </Tooltip>
            <Tooltip content="This is the tooltip">
              <Button>Hover to show tooltip faster</Button>
            </Tooltip>
            <Tooltip content="This is a really big tooltip This is a really big tooltip This is a really big tooltip">
              <Button>Hover to show tooltip faster</Button>
            </Tooltip>
          </Group>
        </div>
      </Stack>
    </>
  );
}

Page.getLayout = getPublicLayout;
