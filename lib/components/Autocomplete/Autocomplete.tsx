import { useEffect, useState } from "react";
import clsx from "../../utils/clsx";
import UnstyledAutocomplete, {
  UnstyledAutocompleteProps,
} from "../Autocomplete/UnstyledAutocomplete";
import Input from "../Input";

const defaultMenuItemsClassName =
  "z-10 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-zinc-800";

export type AutocompleteProps<T extends { _id: string }> =
  UnstyledAutocompleteProps<T>;

export default function Autocomplete<T extends { _id: string }>({
  query: defaultQuery = "",
  onChangeQuery,
  emptyText = "No item found.",
  className,
  ...props
}: AutocompleteProps<T>) {
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

  return (
    <div className={clsx("relative", className)}>
      <UnstyledAutocomplete
        {...props}
        as={Input}
        query={query}
        onChangeQuery={setQuery}
        emptyTextClassName={clsx(
          defaultMenuItemsClassName,
          "p-4 text-sm text-zinc-500 dark:text-zinc-400 mt-1 absolute w-full",
        )}
        optionsClassName={clsx(
          defaultMenuItemsClassName,
          "max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-zinc-800 dark:text-zinc-200 absolute z-10 mt-1 w-full",
        )}
        optionClassName={({ active }) =>
          clsx(
            "cursor-default select-none px-4 py-2 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
            active && "bg-primary-600 text-white",
          )
        }
        emptyText={emptyText}
      />
    </div>
  );
}
