import Stack from "../../lib/components/Stack/Stack";
import getPublicLayout from "../views/publicLayout";
import { NextSeo } from "next-seo";
import { GetServerSideProps } from "next";
import { getCookies } from "cookies-next";
import Breadcrumbs from "../../lib/components/Breadcrumbs/Breadcrumbs";
import Badge from "../../lib/components/Badge/Badge";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

const pages = [{ title: "Badge" }];

export default function BadgeDemoPage() {
  return (
    <>
      <NextSeo title="Badge" />
      <Breadcrumbs pages={pages} className="mb-2 md:mx-2" />
      <Stack className="p-2">
        <div>
          <Badge>Default</Badge>
        </div>
        <div>
          <Badge onActionClick={() => console.info("Clicked")}>
            With action
          </Badge>
        </div>
      </Stack>
    </>
  );
}

BadgeDemoPage.getLayout = getPublicLayout;
