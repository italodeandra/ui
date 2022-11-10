import { getCookies } from "cookies-next";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import Breadcrumbs from "../../lib/components/Breadcrumbs/Breadcrumbs";
import Input from "../../lib/components/Input/Input";
import Stack from "../../lib/components/Stack/Stack";
import getPublicLayout from "../views/publicLayout";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

const pages = [{ title: "Input" }];

export default function InputDemoPage() {
  return (
    <Stack className="p-2">
      <NextSeo title="Input" />
      <Breadcrumbs pages={pages} className="mb-4" />
      <Input label="Username" helpText="Fill with your username" />
      <Input
        label="Username with error"
        error
        helpText="This field is required"
      />
      <Input label="Disabled field" disabled />
      <Input select>
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </Input>
      <Input label="Leading" leading="Qty" />
      <Input
        label="Leading and trailing"
        leading="$"
        trailing="USD"
        leadingInputClassName="pl-7"
      />
    </Stack>
  );
}

InputDemoPage.getLayout = getPublicLayout;
