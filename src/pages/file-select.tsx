import getPublicLayout from "../views/publicLayout";
import { NextSeo } from "next-seo";
import { GetServerSideProps } from "next";
import { getCookies } from "cookies-next";
import Breadcrumbs from "../../lib/components/Breadcrumbs/Breadcrumbs";
import FileSelect, {
  FileSelectProvider,
} from "../../lib/components/FileSelect/FileSelect";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

const pages = [{ title: "File select" }];

export default function FileSelectDemoPage() {
  return (
    <FileSelectProvider>
      <NextSeo title="File select" />
      <Breadcrumbs pages={pages} className="mb-2 md:mx-2" />
      <div className="p-2">
        <FileSelect onAcceptFiles={console.info} />
      </div>
    </FileSelectProvider>
  );
}

FileSelectDemoPage.getLayout = getPublicLayout;
