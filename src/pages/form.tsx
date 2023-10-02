import Text from "../../lib/components/Text";
import Stack from "../../lib/components/Stack";
import getPublicLayout from "../views/publicLayout";
import { NextSeo } from "next-seo";
import { useForm } from "react-hook-form";
import Input from "../../lib/components/Input";
import emailRegExp from "../../lib/utils/emailRegExp";
import Checkbox from "../../lib/components/Checkbox";
import Button from "../../lib/components/Button";
import { Json } from "../../lib/components/Code";
import { GetServerSideProps } from "next";
import { getCookies } from "cookies-next";
import Breadcrumbs from "../../lib/components/Breadcrumbs";
import CleaveInput from "../../lib/components/Input/CleaveInput";
import { useEffect } from "react";

type FieldValues = {
  email: string;
  password: string;
  remember: boolean;
  price: number;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

const pages = [{ title: "Form" }];

export default function FormDemoPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<FieldValues>();

  const onSubmit = (data: FieldValues) => console.info(data);

  useEffect(() => {
    setTimeout(() => {
      setValue("price", 10.5);
    }, 1000);
  }, [setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <NextSeo title={pages[0].title} />
      <Breadcrumbs pages={pages} className="mb-2 md:mx-2" />
      <Stack className="max-w-xl p-2">
        <div>
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            required
            {...register("email", {
              required: "Please fill with your email",
              pattern: {
                value: emailRegExp,
                message: "Please fill with a valid email",
              },
            })}
            error={!!errors.email}
            helpText={errors.email?.message}
          />
        </div>

        <div className="space-y-1">
          <div className="mt-1">
            <Input
              label="Password"
              type="password"
              autoComplete="current-password"
              required
              {...register("password", {
                required: "Please fill with your password",
              })}
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="mt-1">
            <CleaveInput
              label="Price"
              required
              {...register("price", {
                required: "Please fill with the price",
              })}
              options={{
                prefix: "R$",
                numeral: true,
                numeralDecimalMark: ",",
                delimiter: ".",
                noImmediatePrefix: true,
                rawValueTrimPrefix: true,
              }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Checkbox label="Remember" {...register("remember")} />

          <div className="text-sm">
            <Text href="/">Forgot your password?</Text>
          </div>
        </div>

        <div>
          <Button type="submit" variant="filled" className="w-full">
            Sign in
          </Button>
        </div>

        <div>
          <Json json={watch()} />
        </div>
      </Stack>
    </form>
  );
}

FormDemoPage.getLayout = getPublicLayout;
