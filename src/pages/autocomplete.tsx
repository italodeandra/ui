import { getCookies } from "cookies-next";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import Autocomplete from "../../lib/components/Autocomplete/Autocomplete";
import Breadcrumbs from "../../lib/components/Breadcrumbs/Breadcrumbs";
import Stack from "../../lib/components/Stack/Stack";
import getPublicLayout from "../views/publicLayout";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

const pages = [{ title: "Autocomplete" }];

const people = [{ _id: "1", name: "Leslie Alexander", url: "#" }];

export default function InputDemoPage() {
  return (
    <>
      <NextSeo title="Autocomplete" />
      <Breadcrumbs pages={pages} className="mb-2 md:mx-2" />
      <Stack className="p-2">
        <Autocomplete
          label="Username"
          items={people}
          onSelect={console.info}
          filterProperty="name"
          renderProperty="name"
          loading
        />
      </Stack>
    </>
  );
}

InputDemoPage.getLayout = getPublicLayout;
