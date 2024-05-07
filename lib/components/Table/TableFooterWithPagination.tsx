import TableFooter from "./TableFooter";
import Pagination from "../Pagination/Pagination";
import { useCallback, useEffect, useState } from "react";
import Button from "../Button/Button";

export interface TableFooterWithPaginationProps {
  itemsPerPage: number;
  totalItems?: number;
  currentPage: number;
  onChangePage?: (page: number) => void;
  previousText?: string;
  nextText?: string;
  showingText?: string;
  toText?: string;
  ofText?: string;
  resultsText?: string;
}

export default function TableFooterWithPagination({
  itemsPerPage,
  totalItems,
  currentPage,
  onChangePage,
  previousText = "Previous",
  nextText = "Next",
  showingText = "Showing",
  toText = "to",
  ofText = "of",
  resultsText = "results",
}: TableFooterWithPaginationProps) {
  const pageCount =
    totalItems !== undefined && itemsPerPage !== undefined
      ? Math.floor(totalItems / itemsPerPage)
      : 0;
  const [page, setPage] = useState(currentPage);
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

  const handlePageClick = useCallback(
    (page: number) => () => setPage(page),
    [],
  );

  const start = (page - 1) * itemsPerPage + 1;
  let end = page * itemsPerPage;
  if (totalItems !== undefined) {
    end = end > totalItems ? totalItems : end;
  }

  return (
    <TableFooter>
      <div className="flex flex-1 justify-between sm:hidden">
        <Button disabled={page === 1} onClick={handlePageClick(page - 1)}>
          {previousText}
        </Button>
        <Button
          disabled={page === pageCount}
          onClick={handlePageClick(page + 1)}
        >
          {nextText}
        </Button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-zinc-700 dark:text-zinc-100">
            {showingText} <span className="font-medium">{start}</span> {toText}{" "}
            <span className="font-medium">{end}</span>
            {totalItems !== undefined && itemsPerPage !== undefined && (
              <>
                {" "}
                {ofText} <span className="font-medium">{totalItems}</span>{" "}
                {resultsText}
              </>
            )}
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
