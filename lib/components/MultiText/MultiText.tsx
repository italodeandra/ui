import {
  ChangeEventHandler,
  FocusEventHandler,
  ForwardedRef,
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { isEqual } from "lodash";
import { useDeepCompareEffect } from "react-use";
import { XMarkIcon } from "@heroicons/react/20/solid";
import InputWrapper from "../Input2/InputWrapper";

export interface MultiTextProps {
  value?: string[];
  onChangeValue?: (value: string[]) => void;
  name?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  id?: string;
  className?: string;
  helpText?: string;
  label?: string;
  validate?: (value: string) => boolean;
  invalidHelpText?: string;
  error?: boolean;
  format?: (item: string) => string;
}

function defaultFormat(item: string) {
  return item;
}

function MultiText(
  {
    value,
    onChangeValue,
    onChange,
    onBlur,
    name,
    id,
    className,
    helpText,
    label,
    validate,
    invalidHelpText,
    error,
    format = defaultFormat,
  }: MultiTextProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const innerId = useId();
  id = id || innerId;
  const inputRef = useRef<HTMLInputElement>(null);
  const [innerFocused, setInnerFocused] = useState(false);
  const [innerValue, setInnerValue] = useState<string[]>(value || []);
  const [inputValue, setInputValue] = useState("");
  const [invalid, setInvalid] = useState(false);

  useDeepCompareEffect(() => {
    if (value && onChangeValue && !isEqual(value, innerValue)) {
      onChangeValue(innerValue);
    }
  }, [innerValue]);

  useDeepCompareEffect(() => {
    if (value && !isEqual(value, innerValue)) {
      setInnerValue(value);
    }
  }, [value || []]);

  const innerRef = useRef<HTMLInputElement>({
    get value() {
      return innerValue;
    },
    set value(value) {
      setInnerValue(value);
    },
  } as unknown as HTMLInputElement);
  useEffect(() => {
    if (ref) {
      if (typeof ref === "function") {
        ref(innerRef.current);
      } else {
        try {
          ref.current = innerRef.current;
        } catch (e) {
          // do nothing
        }
      }
    }
  }, [ref]);
  useDeepCompareEffect(() => {
    if (onChange) {
      onChange({
        target: {
          name,
          value: innerValue,
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [innerValue]);

  return (
    <InputWrapper
      id={id}
      className={className}
      helpText={(invalid ? invalidHelpText : undefined) || helpText}
      label={label}
      error={invalid || error}
    >
      <div
        className="ui-multi-text"
        onClick={() => inputRef.current?.focus()}
        data-focused={innerFocused ? "" : undefined}
        data-error={invalid || error ? "" : undefined}
      >
        {innerValue.map((item, i) => {
          const removeItem = () => {
            const newValue = [...innerValue];
            newValue.splice(i, 1);
            setInnerValue(newValue);
            inputRef.current?.focus();
          };
          return (
            <span
              className="ui-multi-text-item"
              key={i}
              onClick={(e) => e.stopPropagation()}
              onDoubleClick={() => {
                setInputValue(item);
                removeItem();
              }}
            >
              <span className="ui-multi-text-item-content">{format(item)}</span>
              <button
                className="ui-multi-text-delete-button"
                onClick={removeItem}
              >
                <XMarkIcon className="ui-multi-text-delete-icon" />
              </button>
            </span>
          );
        })}
        <input
          id={id}
          ref={inputRef}
          type="text"
          className="ui-multi-text-input"
          value={inputValue}
          onChange={(e) => {
            setInvalid(false);
            setInputValue(e.target.value);
          }}
          onBlur={(e) => {
            setInvalid(false);
            setInputValue("");
            setInnerFocused(false);
            onBlur?.(e);
          }}
          onKeyDown={(e) => {
            const value = e.currentTarget.value;
            if (e.code === "Enter") {
              e.preventDefault();
              if (!validate || validate(value)) {
                setInnerValue([...innerValue, value]);
                setInputValue("");
              } else {
                setInvalid(true);
              }
            }
          }}
          onFocus={() => setInnerFocused(true)}
        />
      </div>
    </InputWrapper>
  );
}

export default forwardRef(MultiText);
