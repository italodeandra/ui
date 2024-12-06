import getPublicLayout from "../views/publicLayout";
import { NextSeo } from "next-seo";
import { GetServerSideProps } from "next";
import { getCookies } from "cookies-next";
import Breadcrumbs from "../../lib/components/Breadcrumbs";
import FileSelect, {
  FileSelectProvider,
} from "../../lib/components/FileSelect";
import Stack from "../../lib/components/Stack";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: await getCookies({ req, res }),
  },
});

const pages = [{ title: "File select" }];

export default function Page() {
  return (
    <FileSelectProvider>
      <NextSeo title={pages[0].title} />
      <Breadcrumbs pages={pages} className="mb-2 md:mx-2" />
      <Stack className="p-2">
        <FileSelect onAcceptFiles={console.info} />
      </Stack>
    </FileSelectProvider>
  );
}

Page.getLayout = getPublicLayout;
