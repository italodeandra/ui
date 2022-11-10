import Stack from "../../lib/components/Stack/Stack";
import getPublicLayout from "../views/publicLayout";
import Text from "../../lib/components/Text/Text";
import Checkbox from "../../lib/components/Checkbox/Checkbox";
import { NextSeo } from "next-seo";
import { GetServerSideProps } from "next";
import { getCookies } from "cookies-next";
import Breadcrumbs from "../../lib/components/Breadcrumbs/Breadcrumbs";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

const pages = [{ title: "Checkbox" }];

export default function CheckboxDemoPage() {
  return (
    <Stack className="p-2">
      <NextSeo title="Button" />
      <Breadcrumbs pages={pages} className="mb-4" />
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
    </Stack>
  );
}

CheckboxDemoPage.getLayout = getPublicLayout;
