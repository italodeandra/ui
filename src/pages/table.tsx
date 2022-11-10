import Stack from "../../lib/components/Stack/Stack";
import getPublicLayout from "../views/publicLayout";
import { GetServerSideProps } from "next";
import { getCookies } from "cookies-next";
import Table from "../../lib/components/Table/Table";
import { PencilIcon } from "@heroicons/react/24/outline";
import { useCallback } from "react";
import Button from "../../lib/components/Button/Button";
import fakeArray from "../../lib/utils/fakeArray";
import { NextSeo } from "next-seo";
import Breadcrumbs from "../../lib/components/Breadcrumbs/Breadcrumbs";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

const pages = [{ title: "Table" }];

export default function TableDemoPage() {
  return (
    <Stack className="md:p-2">
      <NextSeo title="Table" />
      <Breadcrumbs pages={pages} className="mb-4" />
      <Table.Header
        title="Users"
        subtitle="A list of all the users in your account including their name, title, email and role."
      >
        <Button variant="filled">Add user</Button>
      </Table.Header>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Cell>Name</Table.Cell>
            <Table.Cell>Title</Table.Cell>
            <Table.Cell>Email</Table.Cell>
            <Table.Cell>Role</Table.Cell>
            <Table.Cell />
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row
            onClick={useCallback(
              () => window.open("https://italodeandra.de", "_blank"),
              []
            )}
          >
            <Table.Cell>Ítalo Andrade</Table.Cell>
            <Table.Cell>King</Table.Cell>
            <Table.Cell>italodeandra@gmail.com</Table.Cell>
            <Table.Cell>Give orders</Table.Cell>
            <Table.Cell actions>
              <Table.ActionButton title="Edit">
                <PencilIcon />
              </Table.ActionButton>
            </Table.Cell>
          </Table.Row>
          {fakeArray(30).map((n) => (
            <Table.Row key={n}>
              <Table.Cell>Lindsay Walton ({n})</Table.Cell>
              <Table.Cell>Front-end Developer</Table.Cell>
              <Table.Cell>lindsay.walton@example.com</Table.Cell>
              <Table.Cell>Member</Table.Cell>
              <Table.Cell actions>
                <Table.ActionButton title="Edit">
                  <PencilIcon />
                </Table.ActionButton>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Stack>
  );
}

TableDemoPage.getLayout = getPublicLayout;
