import Stack from "../../lib/components/Stack";
import getPublicLayout from "../views/publicLayout";
import Code, { Json } from "../../lib/components/Code";
import { NextSeo } from "next-seo";
import { GetServerSideProps } from "next";
import { getCookies } from "cookies-next";
import Breadcrumbs from "../../lib/components/Breadcrumbs";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

const pages = [{ title: "Code" }];

export default function Page() {
  return (
    <>
      <NextSeo title={pages[0].title} />
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
        <Code copy language="jsx">
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

Page.getLayout = getPublicLayout;
