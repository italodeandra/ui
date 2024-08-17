import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { MouseEvent, useCallback, useEffect, useMemo, useState } from "react";
import clsx from "../../utils/clsx";
import { range } from "lodash-es";
import UnstyledButton from "../Button/UnstyledButton";

export interface PaginationProps {
  totalItems?: number;
  itemsPerPage?: number;
  currentPage: number;
  onChangePage?: (page: number) => void;
  className?: string;
  pageHref?: (page: number) => string;
  paginationText?: string;
  previousText?: string;
  nextText?: string;
  pagesToClickAmount?: number;
}

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onChangePage,
  className,
  pageHref,
  paginationText = "Pagination",
  previousText = "Previous",
  nextText = "Next",
  pagesToClickAmount = 7,
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
    if (pageCount < pagesToClickAmount) {
      return range(1, pageCount + 1);
    }
    if (page < pagesToClickAmount - 2) {
      return [...range(1, pagesToClickAmount - 1), "...1", pageCount];
    }
    if (page > pageCount - (pagesToClickAmount - 3)) {
      return [
        1,
        "...1",
        ...range(pageCount - (pagesToClickAmount - 3), pageCount + 1),
      ];
    }
    return [1, "...1", page - 1, page, page + 1, "...2", pageCount];
  }, [page, pageCount, pagesToClickAmount]);

  const handlePageClick = useCallback(
    (page: number) => (e: MouseEvent) => {
      e.preventDefault();
      setPage(page);
    },
    [],
  );

  return (
    <nav
      className={clsx("ui-pagination", className)}
      aria-label={paginationText}
    >
      <UnstyledButton
        disabled={page === 1}
        onClick={handlePageClick(page - 1)}
        href={page !== 1 && pageHref ? pageHref(page - 1) : undefined}
      >
        <span className="sr-only">{previousText}</span>
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
        href={page !== pageCount && pageHref ? pageHref(page + 1) : undefined}
      >
        <span className="sr-only">{nextText}</span>
        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
      </UnstyledButton>
    </nav>
  );
}
