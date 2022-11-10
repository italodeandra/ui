import { ReactElement, ReactNode } from "react";
import Loading from "../Loading/Loading";
import Stack from "../Stack/Stack";
import Text from "../Text/Text";
import Table from "./Table";

export type DataTableProps<RowData> = {
  title?: ReactNode;
  subtitle?: ReactNode;
  headerContent?: ReactNode;
  data?: RowData[];
  idAccessor?: keyof RowData;
  columns: {
    title: string;
    accessor?: keyof RowData;
    render?: (item: RowData) => ReactNode;
  }[];
  actions?: {
    title: string;
    icon: ReactElement;
  }[];
  isLoading?: boolean;
  noRecordsText?: string;
};

export default function DataTable<RowData>({
  title,
  subtitle,
  headerContent,
  data,
  idAccessor = "_id" as keyof typeof data,
  actions,
  columns,
  isLoading,
  noRecordsText = "No records",
}: DataTableProps<RowData>) {
  return (
    <Stack>
      {(title || subtitle || headerContent) && (
        <Table.Header title={title} subtitle={subtitle}>
          {headerContent}
        </Table.Header>
      )}
      <Table className="relative">
        <Table.Head>
          <Table.Row>
            {columns.map((column) => (
              <Table.Cell key={column.title}>{column.title}</Table.Cell>
            ))}
            {actions && <Table.Cell />}
          </Table.Row>
          {isLoading && (
            <tr className="absolute top-3.5 right-3 rounded-full bg-gray-50/50">
              <td>
                <Loading />
              </td>
            </tr>
          )}
        </Table.Head>
        <Table.Body>
          {data?.map((item) => (
            <Table.Row key={item[idAccessor] as string}>
              {columns.map((column) => (
                <Table.Cell key={column.title}>
                  {column.accessor && (item[column.accessor] as string)}
                  {!column.accessor && column.render && column.render(item)}
                </Table.Cell>
              ))}
              {actions && (
                <Table.Cell actions>
                  {actions.map((action, i) => (
                    <Table.ActionButton key={i} title={action.title}>
                      {action.icon}
                    </Table.ActionButton>
                  ))}
                </Table.Cell>
              )}
            </Table.Row>
          ))}
          {isLoading && !data?.length && (
            <Table.Row>
              {columns.map((column) => (
                <Table.Cell key={column.title}>
                  <div className="h-2 animate-pulse rounded bg-slate-300"></div>
                </Table.Cell>
              ))}
              {actions && (
                <Table.Cell actions>
                  <div className="inline-block h-2 w-6 animate-pulse rounded bg-slate-300"></div>
                </Table.Cell>
              )}
            </Table.Row>
          )}
          {!isLoading && !data?.length && (
            <Table.Row>
              <Table.Cell colSpan={columns.length + (actions ? 1 : 0)}>
                <Text variant="secondary">{noRecordsText}</Text>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </Stack>
  );
}
