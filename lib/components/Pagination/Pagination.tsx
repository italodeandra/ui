import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useCallback, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { range } from "lodash";
import Button from "../Button/Button";

export interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onChangePage?: (page: number) => void;
}

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onChangePage,
}: PaginationProps) {
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

  let pageCount = Math.floor(totalItems / itemsPerPage) || 1;

  let pages = useMemo(() => {
    if (pageCount < 7) {
      return range(1, pageCount + 1);
    }
    if (page < 5) {
      return [1, 2, 3, 4, 5, "...1", pageCount];
    }
    if (page > pageCount - 4) {
      return [
        1,
        "...1",
        pageCount - 4,
        pageCount - 3,
        pageCount - 2,
        pageCount - 1,
        pageCount,
      ];
    }
    return [1, "...1", page - 1, page, page + 1, "...2", pageCount];
  }, [page, pageCount]);

  let handlePageClick = useCallback((page: number) => () => setPage(page), []);

  return (
    <nav
      className="isolate inline-flex -space-x-px rounded-md shadow-sm"
      aria-label="Pagination"
    >
      <Button
        disabled={page === 1}
        onClick={handlePageClick(page - 1)}
        className="rounded-none rounded-l-md !px-2"
      >
        <span className="sr-only">Previous</span>
        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
      </Button>
      {pages.map((p) =>
        typeof p === "number" ? (
          <Button
            key={p}
            onClick={handlePageClick(p)}
            variant={page === p ? "light" : "outlined"}
            className={clsx("rounded-none !px-4", {
              "z-10": page === p,
            })}
          >
            {p}
          </Button>
        ) : (
          <Button key={p} className="pointer-events-none rounded-none !px-3.5">
            ...
          </Button>
        )
      )}
      <Button
        disabled={page === pageCount}
        onClick={handlePageClick(page + 1)}
        className="rounded-none rounded-r-md !px-2"
      >
        <span className="sr-only">Next</span>
        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
      </Button>
    </nav>
  );
}
