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
import Button from "../../lib/components/Button";
import DatePicker from "../../lib/components/DatePicker";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: await getCookies({ req, res }),
  },
});

const pages = [{ title: "Date pickers" }];

export default function Page() {
  const [date, setDate] = useState<Date | undefined>();
  const [range, setRange] = useState<DateRange | undefined>();

  return (
    <>
      <NextSeo title={pages[0].title} />
      <Breadcrumbs pages={pages} className="mb-2 md:mx-2" />
      <Stack className="p-2">
        <DatePicker
          value={date}
          onValueChange={setDate}
          fromDate={new Date()}
        />
        <DateRangePicker
          value={range}
          onValueChange={setRange}
          fromDate={new Date()}
        />
        <Button
          onClick={() => {
            setRange(undefined);
            setDate(undefined);
          }}
        >
          Clear date
        </Button>
      </Stack>
    </>
  );
}

Page.getLayout = getPublicLayout;
