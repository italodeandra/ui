import { getCookies } from "cookies-next";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import Breadcrumbs from "../../lib/components/Breadcrumbs";
import Input from "../../lib/components/Input";
import Stack from "../../lib/components/Stack";
import getPublicLayout from "../views/publicLayout";
import NumericInput from "../../lib/components/Input/NumericInput";
import PatternInput from "../../lib/components/Input/PatternInput";
import { useState } from "react";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

const pages = [{ title: "Input" }];

export default function Page() {
  const [document, setDocument] = useState("");

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
        <NumericInput
          label="Currency input"
          prefix="R$"
          decimalSeparator=","
          thousandSeparator="."
          value={18.5}
          onValueChange={console.info}
        />
        <PatternInput
          label="CPF/CNPJ"
          format={
            document.length <= 11 ? "###.###.###-###" : "##.###.###/####-##"
          }
          mask={"___________ __".split("")}
          onValueChange={(val) => setDocument(val.value)}
          value={document}
        />
      </Stack>
    </>
  );
}

Page.getLayout = getPublicLayout;
