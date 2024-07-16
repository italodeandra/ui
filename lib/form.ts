import { proxy, ref, useSnapshot } from "valtio";
import { FormEvent, useCallback } from "react";
import {
  ArrayKey,
  IsTuple,
  TupleKeys,
} from "react-hook-form/dist/types/path/common";
import { cloneDeep, get, isNil, merge, set, unset } from "lodash";
import { Get, PartialDeep, RequiredDeep, WritableDeep } from "type-fest";
import { DeepPartial } from "redux";
import { useUnmount } from "react-use";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;

export type DeepMapValues<T, V> = {
  [K in keyof T]: T[K] extends Array<Any>
    ? DeepMapValues<T[K][0], V> & V
    : T[K] extends object
      ? DeepMapValues<T[K], V>
      : V;
};

export type IsEqual<T1, T2> = T1 extends T2
  ? (<G>() => G extends T1 ? 1 : 2) extends <G>() => G extends T2 ? 1 : 2
    ? true
    : false
  : false;
export type Primitive =
  | null
  | undefined
  | string
  | number
  | boolean
  | symbol
  | bigint;
export type BrowserNativeObject = Date | FileList | File;

export type FieldValues = Record<string, Any>;
export type AnyIsEqual<T1, T2> = T1 extends T2
  ? IsEqual<T1, T2> extends true
    ? true
    : never
  : never;
export type PathImpl<K extends string | number, V, TraversedTypes> = V extends
  | Primitive
  | BrowserNativeObject
  ? `${K}`
  : true extends AnyIsEqual<TraversedTypes, V>
    ? `${K}`
    : `${K}` | `${K}.${PathInternal<V, TraversedTypes | V>}`;
export type PathInternal<T, TraversedTypes = T> =
  T extends ReadonlyArray<infer V>
    ? IsTuple<T> extends true
      ? {
          [K in TupleKeys<T>]-?: PathImpl<K & string, T[K], TraversedTypes>;
        }[TupleKeys<T>]
      : PathImpl<ArrayKey, V, TraversedTypes>
    : {
        [K in keyof T]-?: PathImpl<K & string, T[K], TraversedTypes>;
      }[keyof T];
export type Path<T> = T extends Any ? PathInternal<T> : never;
export type FieldPath<TFieldValues extends FieldValues> = Path<TFieldValues>;

export type DeepRequiredByValidation<T, V extends { [K in keyof T]?: Any }> = {
  [P in keyof T]-?: P extends keyof V
    ? T[P] extends object
      ? DeepRequiredByValidation<T[P], V[P]>
      : DeepRequiredByValidation<NonNullable<T[P]>, V[P]>
    : T[P];
};

export type Validation = {
  required?: string;
  min?: [number, string];
  pattern?: [RegExp, string];
};

export function createFormState<
  T extends object,
  V extends PartialDeep<DeepMapValues<RequiredDeep<T>, Validation>>,
>(options: { defaultValues: T; validation?: V }) {
  const defaultValues = cloneDeep(options.defaultValues);
  const valuesState = proxy(defaultValues);
  const errorsState = proxy({}) as DeepMapValues<
    RequiredDeep<T>,
    { message: string }
  >;

  const formState = proxy({
    options,
    values: valuesState as DeepRequiredByValidation<T, V>,
    setValue<N extends FieldPath<T>>(name: N, value: DeepPartial<Get<T, N>>) {
      unset(errorsState, name);
      set(valuesState, name, value);
    },
    errors: errorsState,
    registeredFields: ref({
      value: [] as string[],
    }),
    reset(values?: DeepPartial<T>) {
      const update = merge(cloneDeep(defaultValues), cloneDeep(values));
      for (const key in formState.values) {
        delete formState.values[key];
      }
      for (const key in update) {
        const typedKey = key as unknown as Path<T>;
        formState.setValue(typedKey, update[key] as Get<T, typeof typedKey>);
      }
    },
  });

  return formState;
}

// noinspection JSUnusedGlobalSymbols
export function useForm<T extends ReturnType<typeof createFormState>>(
  state: T,
  options?: {
    onSubmit?: (values: T["values"]) => void;
    resetOnUnmount?: boolean;
  },
) {
  const snapshot = useSnapshot(state, {
    sync: true,
  });

  useUnmount(() => {
    if (options?.resetOnUnmount) {
      snapshot.reset();
    }
  });

  return {
    ...(snapshot as WritableDeep<typeof snapshot>),
    onSubmit: (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const fields = Array.from(
        e.currentTarget.querySelectorAll(`[name],[data-input-name]`),
      ).map(
        (f) => f.getAttribute("name") || f.getAttribute("data-input-name")!,
      );
      for (const field of fields) {
        const nameWithoutIndexes = field
          .split(".")
          .filter((n) => isNaN(+n))
          .join(".");
        const validation = get(
          snapshot.options.validation,
          nameWithoutIndexes,
        ) as Validation;
        const value = get(snapshot.values, field) as Any;
        if (
          validation?.required &&
          (Array.isArray(value) ? !value.length : !value)
        ) {
          set(state.errors, field, { message: validation.required });
        } else if (
          validation?.pattern &&
          !validation.pattern[0].test(value as string)
        ) {
          set(state.errors, field, { message: validation.pattern[1] });
        } else if (
          !isNil(validation?.min) &&
          value.length < validation?.min[0]
        ) {
          set(state.errors, field, { message: validation?.min[1] });
        }
      }
      if (Object.keys(state.errors).length === 0) {
        options?.onSubmit?.(snapshot.values);
      } else {
        console.error(state.errors);
      }
    },
    register: useCallback(
      <N extends FieldPath<T["values"]>>(
        name: N,
        handler?: {
          onChange?: (e: Any) => Any;
          onValueChange?: (e: Any) => Any;
        },
      ) => {
        if (!state.registeredFields.value.includes(name)) {
          state.registeredFields.value.push(name);
        }
        const nameWithoutIndexes = name
          .split(".")
          .filter((n) => isNaN(+n))
          .join(".");
        const value = get(snapshot.values, name);
        const props = {
          name,
          value: !isNil(value) ? (value as Any) : "",
          error: !!get(snapshot.errors, name),
          // @ts-expect-error the type is correct
          helpText: get(snapshot.errors, name)?.message,
          required: !!(
            get(snapshot.options.validation, nameWithoutIndexes) as Validation
          )?.required,
          ...(handler?.onChange || !handler?.onValueChange
            ? {
                onChange(event: { target: { value: Any } }) {
                  snapshot.setValue(
                    name as never,
                    (handler?.onChange
                      ? handler?.onChange(event)
                      : event.target.value) as never,
                  );
                },
              }
            : {
                onValueChange(value: Any) {
                  snapshot.setValue(
                    name as never,
                    handler.onValueChange!(value) as never,
                  );
                },
              }),
        };
        if (!props.helpText) {
          delete props.helpText;
        }
        return props;
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [snapshot],
    ),
  };
}
