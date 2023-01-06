import { useEffect, useState } from "react";
import clsx from "clsx";
import UnstyledAutocomplete, {
  UnstyledAutocompleteProps,
} from "../Autocomplete/UnstyledAutocomplete";
import Input from "../Input/Input";
import { defaultMenuItemsClassName } from "../Menu/Menu";

export type AutocompleteProps<T extends { _id: string }> =
  UnstyledAutocompleteProps<T>;

export default function Autocomplete<T extends { _id: string }>({
  query: defaultQuery = "",
  onChangeQuery,
  emptyText = "No item found.",
  ...props
}: AutocompleteProps<T>) {
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

  return (
    <UnstyledAutocomplete
      {...props}
      as={Input}
      query={query}
      onChangeQuery={setQuery}
      emptyTextClassName={clsx(
        defaultMenuItemsClassName,
        "p-4 text-sm text-gray-500 dark:text-zinc-400"
      )}
      optionsClassName={clsx(
        defaultMenuItemsClassName,
        "max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800 dark:text-zinc-200"
      )}
      optionClassName={(active) =>
        clsx(
          "cursor-default select-none px-4 py-2",
          active && "bg-primary-600 text-white"
        )
      }
      emptyText={emptyText}
    />
  );
}
