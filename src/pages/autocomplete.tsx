import { getCookies } from "cookies-next";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import Autocomplete from "../../lib/components/Autocomplete";
import Breadcrumbs from "../../lib/components/Breadcrumbs";
import Stack from "../../lib/components/Stack";
import getPublicLayout from "../views/publicLayout";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

const pages = [{ title: "Autocomplete" }];

const people = [
  { _id: "1", name: "Leslie Alexander", url: "#" },
  { _id: "2", name: "Michael Foster", url: "#" },
];

export default function Page() {
  return (
    <>
      <NextSeo title={pages[0].title} />
      <Breadcrumbs pages={pages} className="mb-2 md:mx-2" />
      <Stack className="p-2">
        <Autocomplete
          label="Username"
          items={people}
          onSelect={console.info}
          filterProperty="name"
          renderProperty="name"
          loading
          disabledItems={["2"]}
        />
        <Autocomplete
          label="Default value"
          items={people}
          onSelect={console.info}
          filterProperty="name"
          renderProperty="name"
          value={people[0]}
          readOnly
        />
      </Stack>
    </>
  );
}

Page.getLayout = getPublicLayout;
