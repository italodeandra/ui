import Stack from "../../lib/components/Stack";
import getPublicLayout from "../views/publicLayout";
import Text from "../../lib/components/Text";
import Checkbox from "../../lib/components/Checkbox";
import { NextSeo } from "next-seo";
import { GetServerSideProps } from "next";
import { getCookies } from "cookies-next";
import Breadcrumbs from "../../lib/components/Breadcrumbs";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

const pages = [{ title: "Checkbox" }];

export default function Page() {
  return (
    <>
      <NextSeo title={pages[0].title} />
      <Breadcrumbs pages={pages} className="mb-2 md:mx-2" />
      <Stack className="p-2">
        <Text variant="label">Checkbox with label and description</Text>
        <Checkbox
          label="Comments"
          description="Get notified when someones posts a comment on a posting."
        />
        <Checkbox
          label="Candidates"
          description="Get notified when a candidate applies for a job."
        />
        <Text variant="label">Checkbox with label</Text>
        <Checkbox label="Comments" />
        <Text variant="label">Checkbox without label</Text>
        <Checkbox />
        <Text variant="label">Radio group</Text>
        <Checkbox label="Male" type="radio" name="sex" />
        <Checkbox label="Female" type="radio" name="sex" />
      </Stack>
    </>
  );
}

Page.getLayout = getPublicLayout;
