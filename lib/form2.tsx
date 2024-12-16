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
import React, { useMemo } from "react";
import { get } from "lodash-es";

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
  const jsonProps = JSON.stringify(props);
  const config = useMemo(
    () => ({
      resolver: schema ? zodResolver(schema) : undefined,
      ...props,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [jsonProps, schema],
  );
  const formReturn = useRHForm(config);
  const register = formReturn.register;
  formReturn.register = function (name, options) {
    const registerReturn = register(name, options);
    const zodProperty = (schema as z.ZodObject<z.infer<TSchema>> | undefined)
      ?.shape?.[name];
    return {
      ...registerReturn,
      error: get(formReturn.formState.errors, name)?.message,
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
