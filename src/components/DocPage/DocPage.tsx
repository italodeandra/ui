import { NextSeo } from "next-seo";
import Breadcrumbs from "../../../lib/components/Breadcrumbs/Breadcrumbs";
import React, { ReactNode, useMemo } from "react";
import Stack from "../../../lib/components/Stack/Stack";
import DataTable, {
  DataTableProps,
} from "../../../lib/components/Table/DataTable";
import Text from "../../../lib/components/Text/Text";
import { DocPageProps } from "./DocPageProps";
import Markdown from "../../../lib/components/Markdown/Markdown";

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
    <>
      <NextSeo title={title} />
      <Breadcrumbs pages={pages} className="mb-2 md:mx-2" />
      <Stack className="gap-4 p-2">
        {children}
        {props && (
          <>
            <Text variant="label">Props</Text>
            <DataTable
              className="-my-2"
              columns={columns}
              data={props}
              idAccessor="property"
            />
          </>
        )}
      </Stack>
    </>
  );
}
