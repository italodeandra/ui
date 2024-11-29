import { Combobox } from "@headlessui/react";
import Loading from "../Loading";
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Input, {
  defaultInputClassName,
  defaultLabelClassName,
  defaultLeadingInputClassName,
  defaultTrailingClassName,
  defaultTrailingInputClassName,
  UnstyledInput,
  UnstyledInputProps,
} from "../Input";
import clsx from "../../utils/clsx";
import { isEqual, take } from "lodash-es";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import Badge from "../Badge";

const defaultMenuItemsClassName =
  "z-10 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-zinc-800";

export interface MultiSelectProps<T extends object | string>
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
  creatable?: boolean;
  getCreateLabel?: (query: string) => string;
  itemsRenderLimit?: number;
  valueProperty?: string | number;
}

function getValue<Id extends string | number, T extends object | string>(
  id: Id,
  item: T,
): string | number {
  return typeof item === "string"
    ? item
    : (item[id as unknown as keyof typeof item] as string | number);
}

function MultiSelectInput<
  Id extends string | number,
  T extends object | string,
>({
  className,
  selectedItems,
  doRender,
  removeItem,
  valueProperty,
  readOnly,
  ...props
}: {
  className?: string;
  selectedItems: T[];
  doRender: (item: T) => ReactNode;
  removeItem: (item: T) => () => void;
  valueProperty: Id;
  readOnly?: boolean;
}) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div
      className={clsx(
        "flex flex-wrap border focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500 dark:focus-within:border-primary-500",
        className,
      )}
      onClick={() => ref.current?.focus()}
    >
      {!!selectedItems.length && (
        <div className="flex flex-wrap items-center gap-1 p-1.5 pb-0">
          {selectedItems.map((item) => (
            <Badge
              key={getValue(valueProperty, item)}
              onActionClick={!readOnly ? removeItem(item) : undefined}
            >
              {doRender(item)}
            </Badge>
          ))}
        </div>
      )}
      {!readOnly && (
        <Combobox.Input
          /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
          {...(props as any)}
          ref={ref}
          className="rounded-md border-none !ring-transparent disabled:cursor-not-allowed disabled:text-zinc-500 dark:bg-zinc-800 dark:disabled:bg-zinc-900/90 sm:text-sm"
          readOnly={readOnly}
        />
      )}
    </div>
  );
}

export default function MultiSelect<T extends object | string>({
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
  creatable,
  getCreateLabel = (query: string) => `+ create "${query}"`,
  itemsRenderLimit,
  className,
  valueProperty = "_id",
  label,
  required,
  readOnly,
  ...props
}: MultiSelectProps<T>) {
  const [query, setQuery] = useState(defaultQuery);
  const [selectedItems, setSelectedItems] = useState<T[]>(value || []);

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

  const filteredItems = useMemo(
    () =>
      query === ""
        ? items
        : items.filter(
            filterFunction ||
              ((item) =>
                (typeof item === "string"
                  ? item
                  : (item[filterProperty] as string)
                )
                  .toLowerCase()
                  .includes(query.toLowerCase())),
          ),
    [filterFunction, filterProperty, items, query],
  );

  trailing = loading ? (
    <Loading />
  ) : (
    trailing ||
    (!readOnly ? (
      <Combobox.Button className="pointer-events-auto -mr-1 flex items-center">
        <ChevronUpDownIcon
          className="h-5 w-5 text-zinc-400"
          aria-hidden="true"
        />
      </Combobox.Button>
    ) : undefined)
  );

  const ComponentInput = as || UnstyledInput;

  const doRender = useCallback(
    (item: T) =>
      renderFunction
        ? renderFunction(item)
        : typeof item === "string"
          ? item
          : (item[renderProperty] as string),
    [renderFunction, renderProperty],
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

  const removeItem = useCallback(
    (item: T) => () =>
      setSelectedItems((selectedItems) => [
        ...selectedItems.filter(
          (i) => getValue(valueProperty, i) !== getValue(valueProperty, item),
        ),
      ]),
    [valueProperty],
  );

  if (label && required) {
    label = (
      <>
        {label} <span className="text-red-500">*</span>
      </>
    );
  }

  const renderedItems = itemsRenderLimit
    ? take(filteredItems, itemsRenderLimit)
    : filteredItems;

  return (
    <div className={clsx("relative", className)}>
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
              placeholder={!readOnly ? placeholder : undefined}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              trailing={trailing}
              trailingClassName={clsx(
                defaultTrailingClassName,
                trailingClassName,
              )}
              inputClassName={clsx(
                defaultInputClassName,
                "bg-white dark:bg-zinc-800 pl-0",
                inputElementClassName,
                {
                  "border-dashed": readOnly,
                },
              )}
              innerClassName={inputInnerClassName}
              trailingInputClassName={clsx(
                defaultTrailingInputClassName,
                trailingInputClassName,
              )}
              leadingInputClassName={clsx(
                defaultLeadingInputClassName,
                leadingInputClassName,
              )}
              displayValue={displayValue}
              labelClassName={clsx(defaultLabelClassName, labelClassName)}
              selectedItems={selectedItems}
              doRender={doRender}
              removeItem={removeItem}
              required={required && !selectedItems.length}
              label={label}
              readOnly={readOnly}
              valueProperty={valueProperty}
            />

            {!readOnly &&
              ((creatable && query) || filteredItems.length > 0) && (
                <Combobox.Options
                  static={isStatic}
                  className={clsx(
                    defaultMenuItemsClassName,
                    "absolute z-10 mt-1 max-h-72 w-full scroll-py-2 overflow-y-auto py-2 text-sm text-zinc-800 dark:text-zinc-200",
                  )}
                >
                  {!renderedItems.some(
                    (item) => getValue(valueProperty, item) === query,
                  ) &&
                    creatable &&
                    !!query && (
                      <Combobox.Option
                        value={query}
                        className={({ active }) =>
                          clsx("cursor-default select-none px-4 py-2", {
                            "bg-primary-600 text-white": active,
                          })
                        }
                      >
                        {({ selected }) => (
                          <div className="flex">
                            {selected && <CheckIcon className="mr-2 w-5" />}
                            {selected ? query : getCreateLabel(query)}
                          </div>
                        )}
                      </Combobox.Option>
                    )}
                  {renderedItems.map((item) => (
                    <Combobox.Option
                      key={getValue(valueProperty, item)}
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

            {!readOnly &&
              !creatable &&
              open &&
              emptyText &&
              query !== "" &&
              filteredItems.length === 0 && (
                <p
                  className={clsx(
                    defaultMenuItemsClassName,
                    "absolute mt-1 w-full p-4 text-sm text-zinc-500 dark:text-zinc-400",
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
