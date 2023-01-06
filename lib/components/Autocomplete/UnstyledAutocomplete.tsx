import { Combobox } from "@headlessui/react";
import Loading from "../Loading/Loading";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import UnstyledInput, { UnstyledInputProps } from "../Input/UnstyledInput";
import Input, {
  defaultInputClassName,
  defaultLeadingInputClassName,
  defaultTrailingClassName,
  defaultTrailingInputClassName,
} from "../Input/Input";
import clsx from "clsx";

export interface UnstyledAutocompleteProps<T extends { _id: string }>
  extends Omit<
    UnstyledInputProps<false>,
    "as" | "onSelect" | "inputClassName" | "innerClassName"
  > {
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
  emptyTextClassName?: string;
  leadingClassName?: string;
  optionsClassName?: string;
  optionClassName?: (active: boolean) => string;
  inputInnerClassName?: string;
  inputElementClassName?: string;
  leading?: ReactNode;
  as?: typeof Input;
  static?: boolean;
}

export default function UnstyledAutocomplete<T extends { _id: string }>({
  placeholder,
  emptyText,
  items = [],
  renderProperty = "title" as keyof T,
  renderFunction,
  filterProperty = "title" as keyof T,
  filterFunction,
  onSelect,
  query: defaultQuery = "",
  onChangeQuery,
  loading,
  emptyTextClassName,
  optionsClassName,
  optionClassName,
  inputInnerClassName,
  inputElementClassName,
  as,
  trailing,
  trailingClassName,
  trailingInputClassName,
  leadingInputClassName,
  static: isStatic,
  ...props
}: UnstyledAutocompleteProps<T>) {
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

  trailing = loading ? <Loading /> : trailing;

  let ComponentInput = as || UnstyledInput;

  let doRender = useCallback(
    (item: T) =>
      renderFunction ? renderFunction(item) : (item[renderProperty] as string),
    [renderFunction, renderProperty]
  );

  let handleSelect = useCallback(
    (item: T) => {
      onSelect?.(item);
      let child = doRender(item);
      if (typeof child === "string") {
        setQuery(child);
      }
    },
    [doRender, onSelect]
  );

  return (
    <Combobox onChange={handleSelect} value={query}>
      <ComponentInput
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        {...(props as any)}
        as={Combobox.Input}
        placeholder={placeholder}
        onChange={(event) => setQuery(event.target.value)}
        trailing={trailing}
        trailingClassName={clsx(defaultTrailingClassName, trailingClassName)}
        inputClassName={clsx(defaultInputClassName, inputElementClassName)}
        innerClassName={inputInnerClassName}
        trailingInputClassName={clsx(
          defaultTrailingInputClassName,
          trailingInputClassName
        )}
        leadingInputClassName={clsx(
          defaultLeadingInputClassName,
          leadingInputClassName
        )}
      />

      {filteredItems.length > 0 && (
        <Combobox.Options static={isStatic} className={optionsClassName}>
          {filteredItems.map((item) => (
            <Combobox.Option
              key={item._id}
              value={item}
              className={
                optionClassName && (({ active }) => optionClassName(active))
              }
            >
              {doRender(item)}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      )}

      {emptyText && query !== "" && filteredItems.length === 0 && (
        <p className={emptyTextClassName}>{emptyText}</p>
      )}
    </Combobox>
  );
}
