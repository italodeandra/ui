import { HomeIcon } from "@heroicons/react/20/solid";
import clsx from "../../utils/clsx";
import Text from "../Text";
import NextLink from "next/link";
import Loading from "../Loading";
import Skeleton from "../Skeleton";

export type BreadcrumbsProps = {
  pages?: {
    title: string;
    href?: string;
    loading?: boolean;
  }[];
  homeHref?: string;
  className?: string;
  loading?: boolean;
};

export default function Breadcrumbs({
  pages,
  homeHref = "/",
  className,
  loading,
}: BreadcrumbsProps) {
  if (!pages?.length) {
    return null;
  }

  return (
    <nav className={clsx("flex", className)} aria-label="Breadcrumb">
      <ol
        role="list"
        className="flex w-full space-x-4 bg-white px-6 shadow dark:border-y dark:border-zinc-800 dark:bg-zinc-900 md:w-auto md:rounded-md md:dark:border-x"
      >
        <li className="flex">
          <div className="flex items-center">
            <NextLink
              href={homeHref}
              className="text-zinc-400 hover:text-zinc-500 dark:hover:text-zinc-200"
            >
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </NextLink>
          </div>
        </li>
        {pages.map((page, i) => {
          const isLast = i === pages.length - 1;
          return (
            <li key={page.title} className="flex">
              <div className="flex items-center">
                <svg
                  className="h-full w-6 flex-shrink-0 text-zinc-200 dark:text-zinc-800"
                  viewBox="0 0 24 44"
                  preserveAspectRatio="none"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                </svg>
                <Text
                  href={page.href}
                  className={clsx(
                    "ml-4 text-sm font-medium !text-zinc-500 dark:!text-zinc-400",
                    {
                      "cursor-default": !page.href,
                      "hover:!text-zinc-700 dark:hover:!text-zinc-200":
                        !!page.href,
                    },
                  )}
                  aria-current={isLast ? "page" : undefined}
                >
                  {page.loading ? (
                    <Skeleton className="h-3 w-10" />
                  ) : (
                    page.title
                  )}
                </Text>
              </div>
            </li>
          );
        })}
        {loading && (
          <li className="!ml-auto flex items-center">
            <Loading className="-mr-3 ml-4" />
          </li>
        )}
      </ol>
    </nav>
  );
}
