import Stack from "../../lib/components/Stack/Stack";
import getPublicLayout from "../views/publicLayout";
import { GetServerSideProps } from "next";
import { getCookies } from "cookies-next";
import { PencilIcon } from "@heroicons/react/24/outline";
import { NextSeo } from "next-seo";
import DataTable, {
  DataTableProps,
} from "../../lib/components/Table/DataTable";
import Button from "../../lib/components/Button/Button";
import { useCallback, useState } from "react";
import { useMount } from "react-use";
import ms from "ms";
import Breadcrumbs from "../../lib/components/Breadcrumbs/Breadcrumbs";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

const data = [
  {
    _id: "1",
    name: "Ítalo Andrade",
    title: "King",
    email: "italodeandra@gmail.com",
    role: "Give orders",
    url: "https://italodeandra.de",
  },
  {
    _id: "2",
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
    url: "https://italodeandra.de",
  },
];

const columns: DataTableProps<(typeof data)[0]>["columns"] = [
  {
    title: "Name",
    accessor: "name",
  },
  {
    title: "Title",
    accessor: "title",
  },
  {
    title: "Email",
    accessor: "email",
  },
  {
    title: "Role",
    accessor: "role",
  },
];

const actions = [
  {
    title: "Edit",
    icon: <PencilIcon />,
  },
];

const pages = [{ title: "DataTable" }];

export default function DataTableDemoPage() {
  let [isLoading, setLoading] = useState(true);
  let [page, setPage] = useState(1);

  useMount(() => {
    setTimeout(() => {
      setLoading(false);
    }, ms("5s"));
  });

  // isLoading = true;

  return (
    <div className="flex flex-1 flex-col">
      <NextSeo title="DataTable" />
      <Breadcrumbs pages={pages} className="mb-2 md:mx-2" />
      <Stack className="flex flex-1 flex-col overflow-auto md:px-2 md:pb-2">
        <DataTable
          autoHeight
          title="Users"
          subtitle="A list of all the users in your account including their name, title, email and role."
          columns={columns}
          data={!isLoading ? data : undefined}
          isLoading={isLoading}
          actions={actions}
          headerContent={<Button variant="filled">Add user</Button>}
          onRowClick={useCallback(
            (item: (typeof data)[0]) => window.open(item.url, "_blank"),
            []
          )}
          pagination
          itemsPerPage={2}
          // totalItems={2}
          currentPage={page}
          onChangePage={setPage}
        />
      </Stack>
    </div>
  );
}

DataTableDemoPage.getLayout = getPublicLayout;
