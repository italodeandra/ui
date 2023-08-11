import Stack from "../../lib/components/Stack/Stack";
import getPublicLayout from "../views/publicLayout";
import Code from "../../lib/components/Code/Code";
import { NextSeo } from "next-seo";
import Json from "../../lib/components/Code/Json";
import { GetServerSideProps } from "next";
import { getCookies } from "cookies-next";
import Breadcrumbs from "../../lib/components/Breadcrumbs/Breadcrumbs";
import vsLight from "prism-react-renderer/themes/vsLight";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

const pages = [{ title: "Code" }];

export default function CodeDemoPage() {
  return (
    <>
      <NextSeo title="Code" />
      <Breadcrumbs pages={pages} className="mb-2 md:mx-2" />
      <Stack className="p-2">
        <Json
          json={{
            string: "string",
            number: 1,
            array: [{ object: {} }],
            boolean: false,
            null: null,
          }}
        />
        <Code copy language="jsx" theme={vsLight}>
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
    </>
  );
}

CodeDemoPage.getLayout = getPublicLayout;
