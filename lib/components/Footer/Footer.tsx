import { cloneElement, ReactElement, ReactNode } from "react";

export type FooterProps = {
  main?: {
    name: string;
    href: string;
  }[];
  social?: {
    name: string;
    href: string;
    icon: ReactElement;
  }[];
  companyName: string;
  allRightsReserved?: string;
  children: ReactNode;
};

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer({
  main,
  social,
  companyName,
  allRightsReserved = "All rights reserved",
  children,
}: FooterProps) {
  return (
    <>
      <div className="min-h-screen">{children}</div>
      <footer className="bg-white dark:bg-zinc-800">
        <div className="mx-auto max-w-7xl overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
          {main && (
            <nav
              className="-mx-5 -my-2 mb-8 flex flex-wrap justify-center"
              aria-label="Footer"
            >
              {main.map((item) => (
                <div key={item.name} className="px-5 py-2">
                  <a
                    href={item.href}
                    className="text-base text-gray-500 hover:text-gray-900"
                  >
                    {item.name}
                  </a>
                </div>
              ))}
            </nav>
          )}
          {social && (
            <div className="mb-8 flex justify-center space-x-6">
              {social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">{item.name}</span>
                  {cloneElement(item.icon, {
                    className: "h-6 w-6",
                    "aria-hidden": "true",
                  })}
                </a>
              ))}
            </div>
          )}
          <p className=" text-center text-base text-gray-400">
            &copy; {CURRENT_YEAR} {companyName}. {allRightsReserved}.
          </p>
        </div>
      </footer>
    </>
  );
}
