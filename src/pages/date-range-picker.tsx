import { getCookies } from "cookies-next";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import Breadcrumbs from "../../lib/components/Breadcrumbs";
import Stack from "../../lib/components/Stack";
import getPublicLayout from "../views/publicLayout";
import DateRangePicker, {
  DateRange,
} from "../../lib/components/DateRangePicker";
import { useState } from "react";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

const pages = [{ title: "Date range picker" }];

export default function Page() {
  let [range, setRange] = useState<DateRange | undefined>();

  return (
    <>
      <NextSeo title={pages[0].title} />
      <Breadcrumbs pages={pages} className="mb-2 md:mx-2" />
      <Stack className="p-2">
        <DateRangePicker
          value={range}
          onChangeValue={setRange}
          fromDate={new Date()}
        />
      </Stack>
    </>
  );
}

Page.getLayout = getPublicLayout;
