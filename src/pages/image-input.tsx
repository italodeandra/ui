import getPublicLayout from "../views/publicLayout";
import { NextSeo } from "next-seo";
import { GetServerSideProps } from "next";
import { getCookies } from "cookies-next";
import Breadcrumbs from "../../lib/components/Breadcrumbs";
import { FileSelectProvider } from "../../lib/components/FileSelect";
import ImageInput from "../../lib/components/ImageInput";
import Stack from "../../lib/components/Stack";
import { useState } from "react";
import { FileInputFile } from "../../lib/components/FileInput";
import Button from "../../lib/components/Button";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: await getCookies({ req, res }),
  },
});

const pages = [{ title: "Image input" }];

export default function Page() {
  const [value, setValue] = useState<FileInputFile[]>([]);
  return (
    <FileSelectProvider>
      <NextSeo title={pages[0].title} />
      <Breadcrumbs pages={pages} className="mb-2 md:mx-2" />
      <Stack className="p-2">
        <ImageInput
          label="Profile picture"
          onChange={(e) => setValue(e.target.value)}
        />
        <ImageInput label="Read-only" readOnly value={value} />
        <ImageInput
          label="Preview and info"
          onChange={(e) => setValue(e.target.value)}
          fileDisplay="both"
          fileAdditionalInfo={(_file) => (
            <Button className="w-full">Custom action</Button>
          )}
        />
      </Stack>
    </FileSelectProvider>
  );
}

Page.getLayout = getPublicLayout;
