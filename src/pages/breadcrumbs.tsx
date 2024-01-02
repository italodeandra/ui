import Stack from "../../lib/components/Stack";
import getPublicLayout from "../views/publicLayout";
import { GetServerSideProps } from "next";
import { getCookies } from "cookies-next";
import Breadcrumbs from "../../lib/components/Breadcrumbs";
import { NextSeo } from "next-seo";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

const pages = [
  { title: "Projects", href: "#" },
  { title: "Project Nero", href: "#" },
  { title: "Loading", loading: true },
];

export default function Page() {
  return (
    <>
      d
      <NextSeo title={pages[0].title} />
      <Breadcrumbs pages={pages} className="mb-2 md:mx-2" loading />
      <Stack className="p-2">
        <div>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Reprehenderit mollitia, quaerat, nostrum animi nisi nemo molestiae
          quae aspernatur nam assumenda et, autem rem. Incidunt molestias
          doloremque iusto voluptatum nulla. Consequatur.
        </div>
      </Stack>
    </>
  );
}

Page.getLayout = getPublicLayout;
