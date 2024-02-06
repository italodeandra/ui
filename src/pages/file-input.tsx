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
import { showNotification } from "../../lib/components/Notifications";
import numeral from "numeral";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

const pages = [{ title: "File input" }];

export default function Page() {
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
              size: file.size,
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
              size: file.size,
            };
          }}
          limit={10}
          maxFileSize="20MB"
          onRejectFiles={(files, reason) => {
            switch (reason) {
              case "size":
                return showNotification({
                  icon: "error",
                  title: "File size not allowed",
                  message: files
                    .map((f) => `${f.name} (${numeral(f.size).format("0b")})`)
                    .join(", "),
                });
              case "type":
                return showNotification({
                  icon: "error",
                  title: "File types not allowed",
                  message: files.map((f) => f.name).join(", "),
                });
              case "limit":
                return showNotification({
                  icon: "error",
                  title: "File limit count reached",
                  message: `Files ignored: ${files
                    .map((f) => f.name)
                    .join(", ")}`,
                });
            }
          }}
        />
        <FileInput label="Read-only" readOnly value={value} />
        <FileInput
          required
          label="Error"
          error
          helpText="Attach at least one file"
        />
      </Stack>
    </FileSelectProvider>
  );
}

Page.getLayout = getPublicLayout;
