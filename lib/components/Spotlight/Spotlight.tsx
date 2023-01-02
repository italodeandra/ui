/*
  This example requires Tailwind CSS v3.0+
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import {
  Fragment,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import Loading from "../Loading/Loading";

export interface SpotlightProps<T extends { _id: string }> {
  open?: boolean;
  onClose?: () => void;
  placeholder?: string;
  emptyText?: string;
  items?: T[];
  filterProperty?: keyof T;
  filterFunction?: (item: T) => boolean;
  onSelect?: (item: T) => void;
  renderProperty?: keyof T;
  renderFunction?: (item: T) => ReactNode;
  query?: string;
  onChangeQuery?: (query: string) => void;
  loading?: boolean;
}

export default function Spotlight<T extends { _id: string }>({
  open,
  onClose,
  placeholder = "Search...",
  emptyText = "No item found.",
  items = [],
  renderProperty = "title" as keyof T,
  renderFunction,
  filterProperty = "title" as keyof T,
  filterFunction,
  onSelect,
  query: defaultQuery = "",
  onChangeQuery,
  loading,
}: SpotlightProps<T>) {
  let [query, setQuery] = useState(defaultQuery);

  useEffect(() => {
    if (query !== defaultQuery) {
      setQuery(defaultQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultQuery]);
  useEffect(() => {
    if (onChangeQuery && query !== defaultQuery) {
      onChangeQuery(query);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onChangeQuery, query]);

  let filteredItems = useMemo(
    () =>
      query === ""
        ? []
        : items.filter(
            filterFunction ||
              ((item) =>
                (item[filterProperty] as string)
                  .toLowerCase()
                  .includes(query.toLowerCase()))
          ),
    [filterFunction, filterProperty, items, query]
  );

  let handleOnClose = useCallback(() => onClose?.(), [onClose]);

  let handleSelect = useCallback(
    (item: T) => {
      handleOnClose();
      onSelect?.(item);
    },
    [handleOnClose, onSelect]
  );

  return (
    <Transition.Root
      show={open}
      as={Fragment}
      afterLeave={() => setQuery("")}
      appear
    >
      <Dialog as="div" className="relative z-10" onClose={handleOnClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={clsx(
              "fixed inset-0 bg-gray-500 !bg-opacity-25 transition-opacity dark:bg-zinc-800",
              "bg-white/50 backdrop-blur [@supports(backdrop-filter:blur(0))]:bg-white/30",
              "dark:bg-zinc-900/50 dark:[@supports(backdrop-filter:blur(0))]:bg-zinc-900/30"
            )}
          />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-10 transition-all dark:divide-zinc-800 dark:bg-zinc-900 dark:ring-1 dark:ring-white/5">
              <Combobox onChange={handleSelect}>
                <div className="relative flex">
                  <MagnifyingGlassIcon
                    className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <Combobox.Input
                    className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 dark:text-zinc-200 sm:text-sm"
                    placeholder={placeholder}
                    onChange={(event) => setQuery(event.target.value)}
                  />
                  {loading && <Loading className="mt-3.5 mr-3.5" />}
                </div>

                {filteredItems.length > 0 && (
                  <Combobox.Options
                    static
                    className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800 dark:text-zinc-200"
                  >
                    {filteredItems.map((item) => (
                      <Combobox.Option
                        key={item._id}
                        value={item}
                        className={({ active }) =>
                          clsx(
                            "cursor-default select-none px-4 py-2",
                            active && "bg-primary-600 text-white"
                          )
                        }
                      >
                        {renderFunction
                          ? renderFunction(item)
                          : (item[renderProperty] as string)}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                )}

                {query !== "" && filteredItems.length === 0 && (
                  <p className="p-4 text-sm text-gray-500">{emptyText}</p>
                )}
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
