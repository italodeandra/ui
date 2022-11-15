import { NextSeo } from "next-seo";
import Breadcrumbs from "../../lib/components/Breadcrumbs/Breadcrumbs";
import getPublicLayout from "../views/publicLayout";
import Stack from "../../lib/components/Stack/Stack";

const pages = [{ title: "Big scroll" }];

// noinspection JSUnusedGlobalSymbols
export default function BigScrollPage() {
  return (
    <Stack className="p-2">
      <NextSeo title="Big scroll" />
      <Breadcrumbs pages={pages} className="mb-4" />
      <div className="h-[2000px]"></div>
    </Stack>
  );
}

BigScrollPage.getLayout = getPublicLayout;
