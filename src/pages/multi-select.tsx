import { getCookies } from "cookies-next";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import Breadcrumbs from "../../lib/components/Breadcrumbs";
import Stack from "../../lib/components/Stack";
import getPublicLayout from "../views/publicLayout";
import MultiSelect from "../../lib/components/MultiSelect";
import Button from "../../lib/components/Button";

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

const names = ["Leslie Alexander", "Michael Foster"];

export default function Page() {
  return (
    <>
      <NextSeo title={pages[0].title} />
      <Breadcrumbs pages={pages} className="mb-2 md:mx-2" />
      <Stack className="p-2">
        <MultiSelect
          label="Friends"
          items={people}
          onChange={console.info}
          filterProperty="name"
          renderProperty="name"
          loading
          placeholder="+ friend"
        />
        <form className="flex flex-col gap-2">
          <MultiSelect
            label="Names"
            items={names}
            onChange={console.info}
            placeholder="+ name"
            creatable
            required
            value={["Leslie Alexander"]}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Stack>
    </>
  );
}

Page.getLayout = getPublicLayout;
