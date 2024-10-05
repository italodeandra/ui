import {
  Controller as RHFController,
  useForm as useRHForm,
} from "react-hook-form";
import {
  ControllerProps,
  FieldPath,
  FieldValues,
  UseFormProps,
  UseFormStateReturn,
} from "react-hook-form/dist/types";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import React from "react";
import {
  ControllerFieldState,
  ControllerRenderProps,
} from "react-hook-form/dist/types/controller"; // eslint-disable-next-line @typescript-eslint/no-explicit-any

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;

export function useForm<
  TFieldValues extends FieldValues = FieldValues,
  TContext = Any,
>(
  props?: UseFormProps<TFieldValues, TContext> & {
    schema: z.Schema<TFieldValues, Any>;
  },
) {
  const formReturn = useRHForm({
    resolver: props?.schema ? zodResolver(props.schema) : undefined,
    ...props,
  });
  const register = formReturn.register;
  formReturn.register = function (name, options) {
    const registerReturn = register(name, {
      ...options,
      // setValueAs: (value) => (value === "" ? undefined : value),
    });
    const zodProperty = (props?.schema as z.ZodObject<Any> | undefined)
      ?.shape?.[name];
    return {
      ...registerReturn,
      error: formReturn.formState.errors[name]?.message,
      required: !!zodProperty && !zodProperty.isOptional(),
    };
  };
  return formReturn;
}

export function Controller<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: Omit<ControllerProps<TFieldValues, TName>, "render"> & {
    render: ({
      field,
      fieldState,
      formState,
    }: {
      field: ControllerRenderProps<TFieldValues, TName> & {
        error?: string;
      };
      fieldState: ControllerFieldState;
      formState: UseFormStateReturn<TFieldValues>;
    }) => React.ReactElement;
  },
) {
  return <RHFController<TFieldValues, TName> {...props} />;
}
