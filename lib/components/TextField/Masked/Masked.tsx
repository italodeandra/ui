import {
  ChangeEvent,
  ComponentPropsWithRef,
  createElement,
  ElementType,
  forwardRef,
  useCallback,
} from "react";

const Masked = forwardRef(
  <T extends ElementType>(
    {
      component,
      onChange,
      mask,
      unmask,
      value,
      ...props
    }: {
      mask: (value: string) => string;
      unmask: (value: string) => string;
      component: T;
    } & ComponentPropsWithRef<T>,
    ref
  ) => {
    const maskValue = useCallback(
      (el: HTMLInputElement, e?: ChangeEvent<HTMLInputElement>) => {
        const rawText = el.value;
        const unmaskedValue = unmask(rawText);
        const maskedValue = mask(unmaskedValue);

        el.value = unmaskedValue;
        e && onChange?.(e);
        el.value = maskedValue;
      },
      [mask, onChange, unmask]
    );

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
      maskValue(e.target, e);
    };

    return createElement(component, {
      ...props,
      ref,
      value: value && mask(unmask(value)),
      onChange: handleOnChange,
    });
  }
);

export default Masked;
