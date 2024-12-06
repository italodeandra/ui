import Stack from "../../lib/components/Stack";
import getPublicLayout from "../views/publicLayout";
import { NextSeo } from "next-seo";
import { GetServerSideProps } from "next";
import { getCookies } from "cookies-next";
import Breadcrumbs from "../../lib/components/Breadcrumbs";
import { useState } from "react";
import PictureCropInput from "../../lib/components/PictureCropInput";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: await getCookies({ req, res }),
  },
});

const pages = [{ title: "Picture Crop Image" }];

export default function Page() {
  const [image, setImage] = useState("");

  return (
    <>
      <NextSeo title={pages[0].title} />
      <Breadcrumbs pages={pages} className="mb-2 md:mx-2" />
      <Stack className="p-2">
        <PictureCropInput
          value={image}
          onChange={async (value) => {
            setImage(value);
          }}
        />
      </Stack>
    </>
  );
}

Page.getLayout = getPublicLayout;
