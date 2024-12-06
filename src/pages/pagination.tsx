import Stack from "../../lib/components/Stack";
import getPublicLayout from "../views/publicLayout";
import { NextSeo } from "next-seo";
import { GetServerSideProps } from "next";
import { getCookies } from "cookies-next";
import Breadcrumbs from "../../lib/components/Breadcrumbs";
import Pagination from "../../lib/components/Pagination";
import { range } from "lodash-es";
import { useState } from "react";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: await getCookies({ req, res }),
  },
});

const pages = [{ title: "Pagination" }];

const items = range(1, 100);

export default function Page() {
  const [page, setPage] = useState(1);

  return (
    <>
      <NextSeo title={pages[0].title} />
      <Breadcrumbs pages={pages} className="mb-2 md:mx-2" />
      <Stack className="p-2">
        <Pagination
          totalItems={items.length}
          itemsPerPage={5}
          currentPage={page}
          onChangePage={setPage}
          pageHref={(p) => `/page-${p}`}
        />
      </Stack>
    </>
  );
}

Page.getLayout = getPublicLayout;
