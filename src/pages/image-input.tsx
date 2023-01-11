import getPublicLayout from "../views/publicLayout";
import { NextSeo } from "next-seo";
import { GetServerSideProps } from "next";
import { getCookies } from "cookies-next";
import Breadcrumbs from "../../lib/components/Breadcrumbs/Breadcrumbs";
import { FileSelectProvider } from "../../lib/components/FileSelect/FileSelect";
import ImageInput from "../../lib/components/ImageInput/ImageInput";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

const pages = [{ title: "Image input" }];

export default function ImageInputDemoPage() {
  return (
    <FileSelectProvider>
      <NextSeo title="Image input" />
      <Breadcrumbs pages={pages} className="mb-2 md:mx-2" />
      <div className="p-2">
        <ImageInput label="Profile picture" />
      </div>
    </FileSelectProvider>
  );
}

ImageInputDemoPage.getLayout = getPublicLayout;
