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

const columns: { title: string; accessor: keyof typeof data[0] }[] = [
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

export default function DataTableDemoPage() {
  let [isLoading, setLoading] = useState(true);

  useMount(() => {
    setTimeout(() => {
      setLoading(false);
    }, ms("5s"));
  });

  return (
    <Stack className="md:p-2">
      <NextSeo title="DataTable" />
      <DataTable
        title="Users"
        subtitle="A list of all the users in your account including their name, title, email and role."
        columns={columns}
        data={!isLoading ? data : undefined}
        isLoading={isLoading}
        actions={actions}
        headerContent={<Button variant="filled">Add user</Button>}
        onRowClick={useCallback(
          (item: typeof data[0]) => window.open(item.url, "_blank"),
          []
        )}
      />
    </Stack>
  );
}

DataTableDemoPage.getLayout = getPublicLayout;
