import getPublicLayout from "../views/publicLayout";
import { NextSeo } from "next-seo";
import { GetServerSideProps } from "next";
import { getCookies } from "cookies-next";
import Breadcrumbs from "../../lib/components/Breadcrumbs";
import { FileSelectProvider } from "../../lib/components/FileSelect";
import Stack from "../../lib/components/Stack";
import { useState } from "react";
import FileInput, { FileInputFile } from "../../lib/components/FileInput";
import wait from "@italodeandra/next/utils/wait";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

const pages = [{ title: "File input" }];

export default function DemoPage() {
  let [value, setValue] = useState<FileInputFile[]>([]);
  let [, setValue2] = useState<FileInputFile[]>([]);
  return (
    <FileSelectProvider>
      <NextSeo title={pages[0].title} />
      <Breadcrumbs pages={pages} className="mb-2 md:mx-2" />
      <Stack className="p-2">
        <FileInput
          label="Attachments"
          onChange={(e) => setValue2(e.target.value)}
          asyncUpload={async (file) => {
            await wait("5s");
            return {
              _id: file._id,
              url: URL.createObjectURL(file.file),
              name: file.name,
              description: file.description,
              type: file.type,
            };
          }}
          disabled
        />
        <FileInput
          label="Attachments"
          onChange={(e) => setValue(e.target.value)}
          asyncUpload={async (file) => {
            await wait("5s");
            return {
              _id: file._id,
              url: URL.createObjectURL(file.file),
              name: file.name,
              description: file.description,
              type: file.type,
            };
          }}
        />
        <FileInput label="Read-only" readOnly defaultValue={value} />
      </Stack>
    </FileSelectProvider>
  );
}

DemoPage.getLayout = getPublicLayout;
