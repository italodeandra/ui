import Text from "../../lib/components/Text/Text";
import Stack from "../../lib/components/Stack/Stack";
import getPublicLayout from "../views/publicLayout";
import { NextSeo } from "next-seo";
import { useForm } from "react-hook-form";
import Input from "../../lib/components/Input/Input";
import emailRegExp from "../../lib/utils/emailRegExp";
import Checkbox from "../../lib/components/Checkbox/Checkbox";
import Button from "../../lib/components/Button/Button";
import Json from "../../lib/components/Code/Json";
import { GetServerSideProps } from "next";
import { getCookies } from "cookies-next";

type FieldValues = {
  email: string;
  password: string;
  remember: boolean;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

export default function TextPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit = (data: FieldValues) => console.log(data);

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <NextSeo title="Form" />
      <Stack className="max-w-xl p-2">
        <div>
          <div className="mt-1">
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

TextPage.getLayout = getPublicLayout;