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

export default function TooltipDemoPage() {
  return (
    <>
      <NextSeo title={pages[0].title} />
      <Breadcrumbs pages={pages} className="mb-2 md:mx-2" />
      <Stack className="p-2">
        <Text variant="label">Only tooltip</Text>
        <div>
          <Group>
            <Tooltip content="This is the tooltip" placement="bottom">
              <Button>Hover to show tooltip</Button>
            </Tooltip>
            <Tooltip
              content="This is the tooltip"
              placement="bottom"
              delay={200}
            >
              <Button>Hover to show tooltip faster</Button>
            </Tooltip>
            <Tooltip
              content="This is a really big tooltip This is a really big tooltip This is a really big tooltip"
              placement="bottom"
              delay={200}
            >
              <Button>Hover to show tooltip faster</Button>
            </Tooltip>
          </Group>
        </div>
        <Text variant="label">Grouped tooltips</Text>
        <Tooltip.Group delay={200}>
          <Group>
            <Tooltip content="This is the tooltip 1" placement="bottom">
              <Button>Hover to show tooltip 1</Button>
            </Tooltip>
            <Tooltip content="This is the tooltip 2" placement="bottom">
              <Button>Hover to show tooltip 2</Button>
            </Tooltip>
            <Tooltip content="This is the tooltip 3" placement="bottom">
              <Button>Hover to show tooltip 3</Button>
            </Tooltip>
          </Group>
        </Tooltip.Group>
      </Stack>
    </>
  );
}

TooltipDemoPage.getLayout = getPublicLayout;
