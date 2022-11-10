import { HomeIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import Text from "../Text/Text";
import NextLink from "next/link";

export type BreadcrumbsProps = {
  pages?: {
    title: string;
    href?: string;
  }[];
  homeHref?: string;
  className?: string;
};

export default function Breadcrumbs({
  pages,
  homeHref = "/",
  className,
}: BreadcrumbsProps) {
  if (!pages?.length) {
    return null;
  }

  return (
    <nav className={clsx("flex", className)} aria-label="Breadcrumb">
      <ol
        role="list"
        className="flex w-full space-x-4 bg-white px-6 shadow md:w-auto md:rounded-md"
      >
        <li className="flex">
          <div className="flex items-center">
            <NextLink
              href={homeHref}
              className="text-gray-400 hover:text-gray-500"
            >
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </NextLink>
          </div>
        </li>
        {pages.map((page, i) => {
          let isLast = i === pages.length - 1;
          return (
            <li key={page.title} className="flex">
              <div className="flex items-center">
                <svg
                  className="h-full w-6 flex-shrink-0 text-gray-200"
                  viewBox="0 0 24 44"
                  preserveAspectRatio="none"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                </svg>
                <Text
                  href={!isLast ? page.href : undefined}
                  className={clsx("ml-4 text-sm font-medium text-gray-500", {
                    "cursor-default": isLast,
                    "hover:text-gray-700": !isLast,
                  })}
                  aria-current={isLast ? "page" : undefined}
                >
                  {page.title}
                </Text>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
