import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { MouseEvent, useCallback, useEffect, useMemo, useState } from "react";
import clsx from "../../utils/clsx";
import { range } from "lodash";
import UnstyledButton from "../Button/UnstyledButton";

export interface PaginationProps {
  totalItems?: number;
  itemsPerPage?: number;
  currentPage: number;
  onChangePage?: (page: number) => void;
  className?: string;
  pageHref?: (page: number) => string;
}

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onChangePage,
  className,
  pageHref,
}: PaginationProps) {
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

  const [previousTotalItems, setPreviousTotalItems] = useState(totalItems || 0);
  useEffect(() => {
    if (totalItems) {
      setPreviousTotalItems(totalItems);
    }
  }, [totalItems]);

  const pageCount =
    itemsPerPage !== undefined
      ? Math.ceil(previousTotalItems / itemsPerPage) || 1
      : 0;

  const pages = useMemo(() => {
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

  const handlePageClick = useCallback(
    (page: number) => (e: MouseEvent) => {
      e.preventDefault();
      setPage(page);
    },
    [],
  );

  return (
    <nav className={clsx("ui-pagination", className)} aria-label="Pagination">
      <UnstyledButton
        disabled={page === 1}
        onClick={handlePageClick(page - 1)}
        href={pageHref ? pageHref(page - 1) : undefined}
      >
        <span className="sr-only">Previous</span>
        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
      </UnstyledButton>
      {pages.map((p) =>
        typeof p === "number" ? (
          <UnstyledButton
            key={p}
            onClick={handlePageClick(p)}
            data-active={page === p ? "" : undefined}
            href={pageHref ? pageHref(p) : undefined}
          >
            {p}
          </UnstyledButton>
        ) : (
          <button key={p} disabled>
            ...
          </button>
        ),
      )}
      <UnstyledButton
        disabled={page === pageCount}
        onClick={handlePageClick(page + 1)}
        href={pageHref ? pageHref(page + 1) : undefined}
      >
        <span className="sr-only">Next</span>
        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
      </UnstyledButton>
    </nav>
  );
}
