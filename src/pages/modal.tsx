import Button from "../../lib/components/Button";
import getPublicLayout from "../views/publicLayout";
import { NextSeo } from "next-seo";
import { GetServerSideProps } from "next";
import { getCookies } from "cookies-next";
import Breadcrumbs from "../../lib/components/Breadcrumbs";
import Modal, { useModalState } from "../../lib/components/Modal";
import { CheckIcon } from "@heroicons/react/24/outline";
import Stack from "../../lib/components/Stack";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

const pages = [{ title: "Modal" }];

export default function Page() {
  let [modalOpen, { openModal, closeModal }] = useModalState();

  return (
    <>
      <NextSeo title={pages[0].title} />
      <Breadcrumbs pages={pages} className="mb-2 md:mx-2" />
      <Stack className="p-2">
        <Button onClick={openModal}>Open modal</Button>
      </Stack>
      <Modal open={modalOpen} onClose={closeModal}>
        <Modal.Container>
          <Modal.CloseButton onClick={closeModal} />
          <Modal.Icon>
            <CheckIcon />
          </Modal.Icon>
          <Modal.Title>Payment successful</Modal.Title>
          <Modal.Content>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            amet labore.
          </Modal.Content>
          <Modal.Actions>
            <Button variant="filled" className="w-full" onClick={closeModal}>
              Go back to dashboard
            </Button>
          </Modal.Actions>
        </Modal.Container>
      </Modal>
    </>
  );
}

Page.getLayout = getPublicLayout;
