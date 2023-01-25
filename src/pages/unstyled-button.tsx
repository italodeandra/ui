import getPublicLayout from "../views/publicLayout";
import { GetServerSideProps } from "next";
import { getCookies } from "cookies-next";
import React from "react";
import { UnstyledButtonDoc } from "../../lib/components/Button/UnstyledButton.doc";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

export default function UnstyledButtonPage() {
  return <UnstyledButtonDoc />;
}

UnstyledButtonPage.getLayout = getPublicLayout;
