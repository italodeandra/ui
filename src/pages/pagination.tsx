import Stack from "../../lib/components/Stack/Stack";
import getPublicLayout from "../views/publicLayout";
import { NextSeo } from "next-seo";
import { GetServerSideProps } from "next";
import { getCookies } from "cookies-next";
import Breadcrumbs from "../../lib/components/Breadcrumbs/Breadcrumbs";
import Pagination from "../../lib/components/Pagination/Pagination";
import { range } from "lodash";
import { useState } from "react";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

const pages = [{ title: "Button" }];

const items = range(1, 100);

export default function PaginationDemoPage() {
  let [page, setPage] = useState(1);

  return (
    <>
      <NextSeo title="Pagination" />
      <Breadcrumbs pages={pages} className="mb-2 md:mx-2" />
      <Stack className="p-2">
        <Pagination
          totalItems={items.length}
          itemsPerPage={5}
          currentPage={page}
          onChangePage={setPage}
        />
      </Stack>
    </>
  );
}

PaginationDemoPage.getLayout = getPublicLayout;
