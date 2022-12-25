import TableFooter from "./TableFooter";
import Pagination from "../Pagination/Pagination";
import { useCallback, useEffect, useState } from "react";
import Button from "../Button/Button";

export interface TableFooterWithPaginationProps {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  onChangePage?: (page: number) => void;
}

export default function TableFooterWithPagination({
  itemsPerPage,
  totalItems,
  currentPage,
  onChangePage,
}: TableFooterWithPaginationProps) {
  let pageCount = Math.floor(totalItems / itemsPerPage);
  let [page, setPage] = useState(currentPage);
  useEffect(() => {
    if (page !== currentPage) {
      setPage(currentPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);
  useEffect(() => {
    if (onChangePage) {
      onChangePage(page);
    }
  }, [onChangePage, page]);

  let handlePageClick = useCallback((page: number) => () => setPage(page), []);

  let start = (page - 1) * itemsPerPage + 1;
  let end = page * itemsPerPage;
  end = end > totalItems ? totalItems : end;

  return (
    <TableFooter>
      <div className="flex flex-1 justify-between sm:hidden">
        <Button disabled={page === 1} onClick={handlePageClick(page - 1)}>
          Previous
        </Button>
        <Button
          disabled={page === pageCount}
          onClick={handlePageClick(page + 1)}
        >
          Next
        </Button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700 dark:text-zinc-100">
            Showing <span className="font-medium">{start}</span> to{" "}
            <span className="font-medium">{end}</span> of{" "}
            <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            currentPage={currentPage}
            onChangePage={onChangePage}
          />
        </div>
      </div>
    </TableFooter>
  );
}
