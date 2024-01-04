import { Combobox } from "@headlessui/react";
import Loading from "../Loading";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import Input, {
  defaultInputClassName,
  defaultLeadingInputClassName,
  defaultTrailingClassName,
  defaultTrailingInputClassName,
  UnstyledInput,
  UnstyledInputProps,
} from "../Input";
import clsx from "clsx";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useUpdateEffect } from "react-use";
import { take } from "lodash";

export interface UnstyledAutocompleteProps<T extends { _id: string }>
  extends Omit<
    UnstyledInputProps<false>,
    "as" | "onSelect" | "inputClassName" | "innerClassName" | "value"
  > {
  placeholder?: string;
  emptyText?: string;
  items?: T[];
  filterProperty?: keyof T;
  filterFunction?: (item: T) => boolean;
  onSelect?: (item: T | null) => void;
  renderProperty?: keyof T;
  renderFunction?: (item: T) => ReactNode;
  query?: string;
  onChangeQuery?: (query: string) => void;
  loading?: boolean;
  emptyTextClassName?: string;
  leadingClassName?: string;
  optionsClassName?: string;
  optionClassName?: ({
    active,
    selected,
  }: {
    active: boolean;
    selected: boolean;
  }) => string;
  inputInnerClassName?: string;
  inputElementClassName?: string;
  leading?: ReactNode;
  as?: typeof Input;
  static?: boolean;
  displayValue?: (item: T | null) => string;
  value?: T | null;
  itemsRenderLimit?: number;
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
  displayValue,
  value,
  readOnly,
  itemsRenderLimit,
  ...props
}: UnstyledAutocompleteProps<T>) {
  displayValue =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    displayValue || ((item: T | null) => item?.[renderProperty] || ("" as any));
  let [query, setQuery] = useState(defaultQuery);
  let [selectedItem, setSelectedItem] = useState<T | null>(null);

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
        ? items
        : items.filter(
            filterFunction ||
              ((item) =>
                (item[filterProperty] as string)
                  .toLowerCase()
                  .includes(query.toLowerCase()))
          ),
    [filterFunction, filterProperty, items, query]
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

  let ComponentInput = as || UnstyledInput;

  let doRender = useCallback(
    (item: T) =>
      renderFunction ? renderFunction(item) : (item[renderProperty] as string),
    [renderFunction, renderProperty]
  );

  useUpdateEffect(() => {
    onSelect?.(selectedItem);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem]);

  useEffect(() => {
    if (selectedItem !== value) {
      setSelectedItem(value || null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Combobox onChange={setSelectedItem} value={selectedItem} nullable>
      {({ open }) => (
        <>
          <div className="relative">
            <ComponentInput
              /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
              {...(props as any)}
              as={Combobox.Input}
              placeholder={placeholder}
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
              readOnly={readOnly}
            />
          </div>

          {filteredItems.length > 0 && !readOnly && (
            <Combobox.Options static={isStatic} className={optionsClassName}>
              {(itemsRenderLimit
                ? take(filteredItems, itemsRenderLimit)
                : filteredItems
              ).map((item) => (
                <Combobox.Option
                  key={item._id}
                  value={item}
                  className={({ active, selected }) =>
                    clsx(
                      "flex gap-2",
                      optionClassName && optionClassName({ active, selected })
                    )
                  }
                >
                  {({ selected, active }) => (
                    <>
                      {selected ? (
                        <span
                          className={clsx(
                            "flex items-center",
                            active ? "text-white" : "text-primary-500"
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                      {doRender(item)}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}

          {open && emptyText && query !== "" && filteredItems.length === 0 && (
            <p className={emptyTextClassName}>{emptyText}</p>
          )}
        </>
      )}
    </Combobox>
  );
}
