import Text from "../../lib/components/Text";
import Stack from "../../lib/components/Stack";
import getPublicLayout from "../views/publicLayout";
import { NextSeo } from "next-seo";
import Input from "../../lib/components/Input";
import Checkbox from "../../lib/components/Checkbox";
import Button from "../../lib/components/Button";
import { Json } from "../../lib/components/Code";
import { GetServerSideProps } from "next";
import { getCookies } from "cookies-next";
import Breadcrumbs from "../../lib/components/Breadcrumbs";
import NumericInput from "../../lib/components/Input/NumericInput";
import { useEffect } from "react";
import { z } from "zod";
import { Controller, useForm } from "../../lib/form2";

const schema = z.object({
  email: z.string().email().optional(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  remember: z.boolean(),
  price: z.number().optional(),
  name: z.string().optional(),
});

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: await getCookies({ req, res }),
  },
});

const pages = [{ title: "Form" }];

export default function Page() {
  const form = useForm({
    schema,
  });

  const onSubmit = () => console.info(form.getValues());

  useEffect(() => {
    setTimeout(() => {
      form.setValue("price", 200);
    }, 1000);
  }, [form]);

  useEffect(() => {
    form.register("price", {
      required: "Please fill with the price",
    });
  }, [form]);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <NextSeo title={pages[0].title} />
      <Breadcrumbs pages={pages} className="mb-2 md:mx-2" />
      <Stack className="max-w-xl p-2">
        <div>
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            {...form.register("email")}
          />
        </div>

        <div className="space-y-1">
          <div className="mt-1">
            <Input
              label="Password"
              type="password"
              autoComplete="current-password"
              {...form.register("password")}
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="mt-1">
            <Input label="Name" {...form.register("name")} />
          </div>
        </div>

        {form.watch("remember") && (
          <div className="space-y-1">
            <div className="mt-1">
              <Controller
                name="price"
                control={form.control}
                // defaultValue=""
                render={({ field }) => (
                  <NumericInput
                    label="Price"
                    required
                    value={field.value}
                    onValueChange={({ floatValue }) =>
                      field.onChange(floatValue)
                    }
                    error={field.error}
                    trailing="km"
                  />
                )}
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <Checkbox label="Remember" {...form.register("remember")} />

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
          <Json json={form.watch()} />
        </div>
      </Stack>
    </form>
  );
}

Page.getLayout = getPublicLayout;
