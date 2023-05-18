import getPublicLayout from "../views/publicLayout";
import { NextSeo } from "next-seo";
import { GetServerSideProps } from "next";
import { getCookies } from "cookies-next";
import Breadcrumbs from "../../lib/components/Breadcrumbs/Breadcrumbs";
import { FileSelectProvider } from "../../lib/components/FileSelect/FileSelect";
import ImageInput, { Image } from "../../lib/components/ImageInput/ImageInput";
import Stack from "../../lib/components/Stack/Stack";
import { useState } from "react";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

const pages = [{ title: "Image input" }];

export default function ImageInputDemoPage() {
  let [value, setValue] = useState<Image[]>([]);
  return (
    <FileSelectProvider>
      <NextSeo title="Image input" />
      <Breadcrumbs pages={pages} className="mb-2 md:mx-2" />
      <Stack className="p-2">
        <ImageInput
          label="Profile picture"
          onChange={(e) => setValue(e.target.value)}
        />
        <ImageInput label="Read-only" readOnly defaultValue={value} />
      </Stack>
    </FileSelectProvider>
  );
}

ImageInputDemoPage.getLayout = getPublicLayout;
