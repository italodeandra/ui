import { NextSeo } from "next-seo";
import Breadcrumbs from "../../../lib/components/Breadcrumbs";
import React, { ReactNode, useMemo } from "react";
import Stack from "../../../lib/components/Stack";
import DataTable, {
  DataTableProps,
} from "../../../lib/components/Table/DataTable";
import Text from "../../../lib/components/Text";
import { DocPageProps } from "./DocPageProps";
import Markdown from "../../../lib/components/Markdown";

const columns: DataTableProps<DocPageProps>["columns"] = [
  {
    title: "Property",
    accessor: "property",
  },
  {
    title: "Type",
    accessor: "type",
  },
  {
    title: "Default value",
    render({ defaultValue }) {
      return (
        <Markdown className="text-sm text-inherit">{defaultValue}</Markdown>
      );
    },
  },
  {
    title: "Description",
    render({ description }) {
      return (
        <Markdown className="text-sm text-inherit">{description}</Markdown>
      );
    },
  },
];

export function DocPage({
  title,
  children,
  props,
}: {
  title: string;
  children: ReactNode;
  props?: DocPageProps[];
}) {
  const pages = useMemo(() => [{ title }], [title]);

  return (
    <div className="flex flex-1 flex-col">
      <NextSeo title={title} />
      <Breadcrumbs pages={pages} className="mb-2 md:mx-2" />
      <Stack className="gap-4 p-2">
        {children}
        {props && (
          <>
            <Text variant="label">Props</Text>
            <DataTable
              className="-m-2 md:mx-0"
              columns={columns}
              data={props}
              idAccessor="property"
            />
          </>
        )}
      </Stack>
    </div>
  );
}
