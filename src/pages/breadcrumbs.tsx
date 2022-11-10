import Stack from "../../lib/components/Stack/Stack";
import getPublicLayout from "../views/publicLayout";
import { GetServerSideProps } from "next";
import { getCookies } from "cookies-next";
import Breadcrumbs from "../../lib/components/Breadcrumbs/Breadcrumbs";
import { NextSeo } from "next-seo";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

const pages = [
  { title: "Projects", href: "#" },
  { title: "Project Nero", href: "#" },
];

export default function BreadcrumbsDemoPage() {
  return (
    <Stack>
      <NextSeo title="Breadcrumbs" />
      <Breadcrumbs pages={pages} className="mb-4" />
      <div>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit
        mollitia, quaerat, nostrum animi nisi nemo molestiae quae aspernatur nam
        assumenda et, autem rem. Incidunt molestias doloremque iusto voluptatum
        nulla. Consequatur.
      </div>
    </Stack>
  );
}

BreadcrumbsDemoPage.getLayout = getPublicLayout;
