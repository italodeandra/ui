import { getCookies } from "cookies-next";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import Breadcrumbs from "../../lib/components/Breadcrumbs/Breadcrumbs";
import Stack from "../../lib/components/Stack/Stack";
import getPublicLayout from "../views/publicLayout";
import DateTimeInput from "../../lib/components/DateInput/DateTimeInput";
import DateInput from "../../lib/components/DateInput/DateInput";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

const pages = [{ title: "Date time input" }];

export default function DateTimeInputDemoPage() {
  return (
    <>
      <NextSeo title="Date time input" />
      <Breadcrumbs pages={pages} className="mb-2 md:mx-2" />
      <Stack className="p-2">
        <DateInput label="Birth date" />
        <DateTimeInput label="Event date" />
      </Stack>
    </>
  );
}

DateTimeInputDemoPage.getLayout = getPublicLayout;
