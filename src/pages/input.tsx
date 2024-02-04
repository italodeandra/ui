import { getCookies } from "cookies-next";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import Breadcrumbs from "../../lib/components/Breadcrumbs";
import Input from "../../lib/components/Input";
import Stack from "../../lib/components/Stack";
import getPublicLayout from "../views/publicLayout";
import CleaveInput from "../../lib/components/Input/NumericInput";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

const pages = [{ title: "Input" }];

export default function Page() {
  return (
    <>
      <NextSeo title={pages[0].title} />
      <Breadcrumbs pages={pages} className="mb-2 md:mx-2" />
      <Stack className="p-2">
        <Input label="Username" helpText="Fill with your username" />
        <Input
          label="Username with error"
          error
          helpText="This field is required"
        />
        <Input label="Disabled field" disabled />
        <Input label="Select" select readOnly>
          <>
            {["a", "b"].map((a) => (
              <option key={a}>{a}</option>
            ))}
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </>
        </Input>
        <Input label="Leading" leading="Qty" />
        <Input
          label="Leading and trailing"
          leading="$"
          trailing="USD"
          leadingInputClassName="pl-7"
        />
        <Input label="Loading input" loading placeholder="He's pulsating" />
        <CleaveInput
          label="Currency input"
          options={{
            prefix: "R$",
            numeral: true,
            numeralDecimalMark: ",",
            delimiter: ".",
            noImmediatePrefix: true,
            rawValueTrimPrefix: true,
          }}
          value={18.5}
          onChange={(event) => console.info("value", event.target.value)}
        />
      </Stack>
    </>
  );
}

Page.getLayout = getPublicLayout;
