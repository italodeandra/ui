import {
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import Loading from "../Loading/Loading";
import { Skeleton } from "../Skeleton/Skeleton";
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
    id?: string;
    title: ReactNode;
    accessor?: keyof RowData;
    render?: (item: RowData) => ReactNode;
  }[];
  actions?: {
    title: string;
    icon: ReactElement;
  }[];
  isLoading?: boolean;
  noRecords?: ReactNode;
  onRowClick?: (item: RowData) => void;
  pagination?: boolean;
  currentPage?: number;
  onChangePage?: (page: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
  className?: string;
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
  noRecords: noRecordsText = "No records",
  onRowClick,
  pagination,
  currentPage = 0,
  onChangePage,
  totalItems = 0,
  itemsPerPage = 15,
  className,
}: DataTableProps<RowData>) {
  let [page, setPage] = useState(currentPage);
  useEffect(() => {
    if (page !== currentPage) {
      setPage(currentPage);
    }
  }, [currentPage, page]);
  useEffect(() => {
    if (onChangePage) {
      onChangePage(page);
    }
  }, [onChangePage, page]);

  const handleRowClick = useCallback(
    (item: RowData) => (onRowClick ? () => onRowClick(item) : undefined),
    [onRowClick]
  );

  return (
    <Stack className={className}>
      {(title || subtitle || headerContent) && (
        <Table.Header title={title} subtitle={subtitle}>
          {headerContent}
        </Table.Header>
      )}
      <Table className="relative">
        <Table.Head>
          <Table.Row>
            {columns.map((column, i) => (
              <Table.Cell
                key={
                  column.id ||
                  (typeof column.title === "string" ? column.title : i)
                }
              >
                {column.title}
              </Table.Cell>
            ))}
            {actions && <Table.Cell />}
          </Table.Row>
          {isLoading && (
            <tr className="absolute top-3.5 right-3 rounded-full bg-gray-50/50 dark:bg-zinc-800/50">
              <td>
                <Loading />
              </td>
            </tr>
          )}
        </Table.Head>
        <Table.Body>
          {data?.map((item) => (
            <Table.Row
              key={item[idAccessor] as string}
              onClick={handleRowClick(item)}
            >
              {columns.map((column, i) => (
                <Table.Cell
                  key={
                    column.id ||
                    (typeof column.title === "string" ? column.title : i)
                  }
                >
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
              {columns.map((column, i) => (
                <Table.Cell
                  key={
                    column.id ||
                    (typeof column.title === "string" ? column.title : i)
                  }
                >
                  <Skeleton className="h-2" />
                </Table.Cell>
              ))}
              {actions && (
                <Table.Cell actions>
                  <Skeleton className="inline-block h-2 w-6" />
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
      {pagination ? (
        <Table.FooterWithPagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onChangePage={onChangePage}
        />
      ) : undefined}
    </Stack>
  );
}
