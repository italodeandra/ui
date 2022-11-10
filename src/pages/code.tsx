import Stack from "../../lib/components/Stack/Stack";
import getPublicLayout from "../views/publicLayout";
import Code from "../../lib/components/Code/Code";
import { NextSeo } from "next-seo";
import Json from "../../lib/components/Code/Json";
import { GetServerSideProps } from "next";
import { getCookies } from "cookies-next";
import Breadcrumbs from "../../lib/components/Breadcrumbs/Breadcrumbs";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

const pages = [{ title: "Code" }];

export default function CodeDemoPage() {
  return (
    <Stack className="p-2">
      <NextSeo title="Code" />
      <Breadcrumbs pages={pages} className="mb-4" />
      <Json
        json={{
          string: "string",
          number: 1,
          array: [{ object: {} }],
          boolean: false,
          null: null,
        }}
      />
      <Code language="jsx">
        {`// Code component
<Code language="json">
  {JSON.stringify(
    {
      string: "string",
      number: 1,
      array: [{ object: {} }],
      boolean: false,
      null: null,
    },
    null,
    2
  )}
</Code>

// Json component
<Json
  json={{
    string: "string",
    number: 1,
    array: [{ object: {} }],
    boolean: false,
    null: null,
  }}
/>`}
      </Code>
    </Stack>
  );
}

CodeDemoPage.getLayout = getPublicLayout;
