import { Combobox } from "@headlessui/react";
import Loading from "../Loading/Loading";
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import UnstyledInput, { UnstyledInputProps } from "../Input/UnstyledInput";
import Input, {
  defaultInputClassName,
  defaultLabelClassName,
  defaultLeadingInputClassName,
  defaultTrailingClassName,
  defaultTrailingInputClassName,
} from "../Input/Input";
import clsx from "clsx";
import { defaultMenuItemsClassName } from "../Menu/Menu";
import { isEqual } from "lodash";
import { CheckIcon } from "@heroicons/react/20/solid";
import Badge from "../Badge/Badge";

export interface MultiSelectProps<T extends { _id: string } | string>
  extends Omit<
    UnstyledInputProps<false>,
    | "as"
    | "onSelect"
    | "inputClassName"
    | "innerClassName"
    | "value"
    | "onChange"
  > {
  placeholder?: string;
  emptyText?: string;
  items?: T[];
  filterProperty?: keyof T;
  filterFunction?: (item: T) => boolean;
  onChange?: (items: T[]) => void;
  renderProperty?: keyof T;
  renderFunction?: (item: T) => ReactNode;
  query?: string;
  onChangeQuery?: (query: string) => void;
  loading?: boolean;
  leadingClassName?: string;
  inputInnerClassName?: string;
  inputElementClassName?: string;
  leading?: ReactNode;
  as?: typeof Input;
  static?: boolean;
  displayValue?: (item: T | null) => string;
  value?: T[];
}

function getValue<T extends { _id: string } | string>(item: T) {
  return typeof item === "string" ? item : item._id;
}

function MultiSelectInput<T extends { _id: string } | string>({
  className,
  selectedItems,
  doRender,
  removeItem,
  ...props
}: {
  className?: string;
  selectedItems: T[];
  doRender: (item: T) => ReactNode;
  removeItem: (item: T) => () => void;
}) {
  let ref = useRef<HTMLInputElement>(null);
  return (
    <div
      className={clsx(
        "flex flex-wrap border focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500 dark:focus-within:border-primary-500",
        className
      )}
      onClick={() => ref.current?.focus()}
    >
      {!!selectedItems.length && (
        <div className="flex items-center gap-1 py-1.5 pl-1.5">
          {selectedItems.map((item) => (
            <Badge key={getValue(item)} onActionClick={removeItem(item)}>
              {doRender(item)}
            </Badge>
          ))}
        </div>
      )}
      <Combobox.Input
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        {...(props as any)}
        ref={ref}
        className="rounded-md border-none !ring-transparent disabled:cursor-not-allowed disabled:text-gray-500 dark:bg-zinc-800 dark:disabled:bg-zinc-900/90 sm:text-sm"
      />
    </div>
  );
}

export default function MultiSelect<T extends { _id: string } | string>({
  placeholder,
  emptyText = "No item found.",
  items = [],
  renderProperty = "title" as keyof T,
  renderFunction,
  filterProperty = "title" as keyof T,
  filterFunction,
  onChange,
  query: defaultQuery = "",
  onChangeQuery,
  loading,
  inputInnerClassName,
  inputElementClassName,
  as,
  trailing,
  trailingClassName,
  trailingInputClassName,
  leadingInputClassName,
  static: isStatic,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  displayValue = (item) => item?.[renderProperty] || ("" as any),
  value,
  labelClassName,
  ...props
}: MultiSelectProps<T>) {
  let [query, setQuery] = useState(defaultQuery);
  let [selectedItems, setSelectedItems] = useState<T[]>(value || []);

  // noinspection DuplicatedCode
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
                (typeof item === "string"
                  ? item
                  : (item[filterProperty] as string)
                )
                  .toLowerCase()
                  .includes(query.toLowerCase()))
          ),
    [filterFunction, filterProperty, items, query]
  );

  trailing = loading ? <Loading /> : trailing;

  let ComponentInput = as || UnstyledInput;

  let doRender = useCallback(
    (item: T) =>
      renderFunction
        ? renderFunction(item)
        : typeof item === "string"
        ? item
        : (item[renderProperty] as string),
    [renderFunction, renderProperty]
  );

  useEffect(() => {
    onChange?.(selectedItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItems]);

  useEffect(() => {
    if (!isEqual(selectedItems, value)) {
      setSelectedItems(value || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  let removeItem = useCallback(
    (item: T) => () =>
      setSelectedItems((selectedItems) => [
        ...selectedItems.filter((i) => getValue(i) === getValue(item)),
      ]),
    []
  );

  return (
    <div className="relative">
      <Combobox
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        onChange={setSelectedItems as any}
        value={selectedItems}
        multiple
      >
        {({ open }) => (
          <>
            <ComponentInput
              /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
              {...(props as any)}
              as={MultiSelectInput}
              placeholder={placeholder}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              trailing={trailing}
              trailingClassName={clsx(
                defaultTrailingClassName,
                trailingClassName
              )}
              inputClassName={clsx(
                defaultInputClassName,
                inputElementClassName
              )}
              innerClassName={inputInnerClassName}
              trailingInputClassName={clsx(
                defaultTrailingInputClassName,
                trailingInputClassName
              )}
              leadingInputClassName={clsx(
                defaultLeadingInputClassName,
                leadingInputClassName
              )}
              displayValue={displayValue}
              labelClassName={clsx(defaultLabelClassName, labelClassName)}
              selectedItems={selectedItems}
              doRender={doRender}
              removeItem={removeItem}
            />

            {filteredItems.length > 0 && (
              <Combobox.Options
                static={isStatic}
                className={clsx(
                  defaultMenuItemsClassName,
                  "absolute z-10 mt-1 max-h-72 w-full scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800 dark:text-zinc-200"
                )}
              >
                {filteredItems.map((item) => (
                  <Combobox.Option
                    key={getValue(item)}
                    value={item}
                    className={({ active }) =>
                      clsx("cursor-default select-none px-4 py-2", {
                        "bg-primary-600 text-white": active,
                      })
                    }
                  >
                    {({ selected }) => (
                      <div className="flex">
                        {selected && <CheckIcon className="mr-2 w-5" />}
                        {doRender(item)}
                      </div>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}

            {open &&
              emptyText &&
              query !== "" &&
              filteredItems.length === 0 && (
                <p
                  className={clsx(
                    defaultMenuItemsClassName,
                    "absolute mt-1 w-full p-4 text-sm text-gray-500 dark:text-zinc-400"
                  )}
                >
                  {emptyText}
                </p>
              )}
          </>
        )}
      </Combobox>
    </div>
  );
}
