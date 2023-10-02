import Button from "../../lib/components/Button";
import getPublicLayout from "../views/publicLayout";
import { NextSeo } from "next-seo";
import { GetServerSideProps } from "next";
import { getCookies } from "cookies-next";
import Breadcrumbs from "../../lib/components/Breadcrumbs";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Spotlight from "../../lib/components/Spotlight";
import { useModalState } from "../../lib/components/Modal";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

const pages = [{ title: "Spotlight" }];

const people = [
  { _id: "1", name: "Leslie Alexander", url: "#" },
  { _id: "3", name: "Leslie 2", url: "#" },
  { _id: "2", name: "Leslie 3", url: "#" },
];

export default function SpotlightDemoPage() {
  const [open, { openModal, closeModal }] = useModalState();

  return (
    <>
      <NextSeo title={pages[0].title} />
      <Breadcrumbs pages={pages} className="mb-2 md:mx-2" />
      <div className="p-2">
        <Button onClick={openModal}>
          <MagnifyingGlassIcon className="mr-2 w-5" />
          Search
        </Button>
      </div>
      <Spotlight
        open={open}
        onClose={closeModal}
        items={people}
        onSelect={console.info}
        filterProperty="name"
        renderProperty="name"
        loading
      />
    </>
  );
}

SpotlightDemoPage.getLayout = getPublicLayout;
