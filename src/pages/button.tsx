import getPublicLayout from "../views/publicLayout";
import { GetServerSideProps } from "next";
import { getCookies } from "cookies-next";
import React from "react";
import { ButtonDoc } from "../../lib/components/Button/Button.doc";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: await getCookies({ req, res }),
  },
});

export default function Page() {
  return <ButtonDoc />;
}

Page.getLayout = getPublicLayout;
