import { getCookies } from "cookies-next";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import Breadcrumbs from "../../lib/components/Breadcrumbs/Breadcrumbs";
import Stack from "../../lib/components/Stack/Stack";
import getPublicLayout from "../views/publicLayout";
import MultiSelect from "../../lib/components/MultiSelect/MultiSelect";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

const pages = [{ title: "Multi select" }];

const people = [
  { _id: "1", name: "Leslie Alexander", url: "#" },
  { _id: "2", name: "Michael Foster", url: "#" },
];

export default function MultiSelectDemoPage() {
  return (
    <>
      <NextSeo title="Multi select" />
      <Breadcrumbs pages={pages} className="mb-2 md:mx-2" />
      <Stack className="p-2">
        <MultiSelect
          label="Friends"
          items={people}
          onChange={console.info}
          filterProperty="name"
          renderProperty="name"
          loading
        />
      </Stack>
    </>
  );
}

MultiSelectDemoPage.getLayout = getPublicLayout;
