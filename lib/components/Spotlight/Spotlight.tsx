import { Fragment, useCallback, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "../../utils/clsx";
import {
  UnstyledAutocomplete,
  UnstyledAutocompleteProps,
} from "../Autocomplete";
import { defaultLeadingClassName, InputIcon } from "../Input";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export interface SpotlightProps<T extends { _id: string }>
  extends UnstyledAutocompleteProps<T> {
  open?: boolean;
  onClose?: () => void;
}

export default function Spotlight<T extends { _id: string }>({
  open,
  onClose,
  placeholder = "Search...",
  query: defaultQuery = "",
  onChangeQuery,
  emptyText = "No item found.",
  ...props
}: SpotlightProps<T>) {
  const [query, setQuery] = useState(defaultQuery);

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

  const handleOnClose = useCallback(() => onClose?.(), [onClose]);

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
              "fixed inset-0 bg-zinc-500 !bg-opacity-25 transition-opacity dark:bg-zinc-800",
              "bg-white/50 backdrop-blur [@supports(backdrop-filter:blur(0))]:bg-white/30",
              "dark:bg-zinc-900/50 dark:[@supports(backdrop-filter:blur(0))]:bg-zinc-900/30",
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
            <Dialog.Panel className="mx-auto max-w-xl transform divide-y divide-zinc-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-10 transition-all dark:divide-zinc-800 dark:bg-zinc-900 dark:ring-1 dark:ring-white/5">
              {/*<Combobox onChange={handleSelect}>
                <div className="relative flex">
                  <MagnifyingGlassIcon
                    className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-zinc-400"
                    aria-hidden="true"
                  />
                  <Combobox.Input
                    className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-zinc-800 placeholder-zinc-400 focus:ring-0 dark:text-zinc-200 sm:text-sm"
                    placeholder={placeholder}
                    onChange={(event) => setQuery(event.target.value)}
                  />
                  {loading && <Loading className="mt-3.5 mr-3.5" />}
                </div>

                {filteredItems.length > 0 && (
                  <Combobox.Options
                    static
                    className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-zinc-800 dark:text-zinc-200"
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
                  <p className="p-4 text-sm text-zinc-500">{emptyText}</p>
                )}
              </Combobox>*/}
              <UnstyledAutocomplete
                {...props}
                query={query}
                onChangeQuery={setQuery}
                placeholder={placeholder}
                leadingClassName={defaultLeadingClassName}
                inputElementClassName="h-12 border-0 focus:ring-0"
                leading={
                  <InputIcon>
                    <MagnifyingGlassIcon aria-hidden="true" />
                  </InputIcon>
                }
                emptyTextClassName="p-4 text-sm text-zinc-500 dark:text-zinc-400"
                optionsClassName="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-zinc-800 dark:text-zinc-200"
                optionClassName={({ active }) =>
                  clsx(
                    "cursor-default select-none px-4 py-2",
                    active && "bg-primary-600 text-white",
                  )
                }
                emptyText={emptyText}
              />
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
