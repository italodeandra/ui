import { getCookies } from "cookies-next";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import Breadcrumbs from "../../lib/components/Breadcrumbs";
import Stack from "../../lib/components/Stack";
import getPublicLayout from "../views/publicLayout";
import DateInput, { DateTimeInput } from "../../lib/components/DateInput";
import { useState } from "react";
import dayjs from "dayjs";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

const pages = [{ title: "Date time input" }];

export default function Page() {
  const [date, setDate] = useState<string | undefined>(
    dayjs("2024-01-01").toISOString(),
  );

  return (
    <>
      <NextSeo title={pages[0].title} />
      <Breadcrumbs pages={pages} className="mb-2 md:mx-2" />
      <Stack className="p-2">
        <DateInput label="Birth date" value={date} onValueChange={setDate} />
        <DateTimeInput label="Event date" />
      </Stack>
    </>
  );
}

Page.getLayout = getPublicLayout;
