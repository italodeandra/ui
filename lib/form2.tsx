import {
  Controller as RHFController,
  ControllerFieldState,
  ControllerProps,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  useForm as useRHForm,
  UseFormProps,
  UseFormStateReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import React from "react";

export function useForm<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TSchema extends z.Schema<any, any>,
  TFieldValues extends FieldValues = z.infer<TSchema>,
>({
  schema,
  ...props
}: UseFormProps<TFieldValues> & {
  schema?: TSchema;
}) {
  const formReturn = useRHForm({
    resolver: schema ? zodResolver(schema) : undefined,
    ...props,
  });
  const register = formReturn.register;
  formReturn.register = function (name, options) {
    const registerReturn = register(name, options);
    const zodProperty = (schema as z.ZodObject<z.infer<TSchema>> | undefined)
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
