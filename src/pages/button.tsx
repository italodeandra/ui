import getPublicLayout from "../views/publicLayout";
import { GetServerSideProps } from "next";
import { getCookies } from "cookies-next";
import React from "react";
import { ButtonDoc } from "../../lib/components/Button/Button.doc";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

export default function ButtonDemoPage() {
  return <ButtonDoc />;
}

ButtonDemoPage.getLayout = getPublicLayout;
