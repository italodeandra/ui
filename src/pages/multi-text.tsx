import Stack from "../../lib/components/Stack";
import getPublicLayout from "../views/publicLayout";
import { NextSeo } from "next-seo";
import { GetServerSideProps } from "next";
import { getCookies } from "cookies-next";
import Breadcrumbs from "../../lib/components/Breadcrumbs";
import MultiText from "../../lib/components/MultiText/MultiText";
import { useForm } from "react-hook-form";
import { Json } from "../../lib/components/Code";
import Button from "../../lib/components/Button";
import emailRegExp from "../../lib/utils/emailRegExp";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

const pages = [{ title: "MultiText" }];

export default function Page() {
  const { register, watch, handleSubmit } = useForm({
    defaultValues: {
      names: [],
    },
  });

  return (
    <>
      <NextSeo title={pages[0].title} />
      <Breadcrumbs pages={pages} className="mb-2 md:mx-2" />
      <Stack className="max-w-xl p-2">
        <form onSubmit={handleSubmit(console.info)}>
          <MultiText
            label="Emails"
            helpText="Type more than one"
            {...register("names")}
            validate={(value) => emailRegExp.test(value)}
            invalidHelpText="Invalid email"
          />
        </form>
        <Button type="submit">Submit</Button>
        <Json json={watch()} />
      </Stack>
    </>
  );
}

Page.getLayout = getPublicLayout;
