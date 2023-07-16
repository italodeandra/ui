import Button from "../../lib/components/Button/Button";
import Stack from "../../lib/components/Stack/Stack";
import getPublicLayout from "../views/publicLayout";
import { CheckIcon } from "@heroicons/react/24/outline";
import { NextSeo } from "next-seo";
import { GetServerSideProps } from "next";
import { getCookies } from "cookies-next";
import Breadcrumbs from "../../lib/components/Breadcrumbs/Breadcrumbs";
import { closeDialog, showDialog } from "../../lib/components/Dialog";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: getCookies({ req, res }),
  },
});

const pages = [{ title: "Dialogs" }];

export default function Page() {
  return (
    <>
      <NextSeo title={pages[0].title} />
      <Breadcrumbs pages={pages} className="mb-2 md:mx-2" />
      <Stack className="p-2">
        <div>
          <Button
            onClick={() => {
              showDialog({
                icon: <CheckIcon />,
                actions: (_id) => (
                  <Button
                    variant="filled"
                    className="w-full"
                    onClick={() => closeDialog(_id)}
                  >
                    Go back to dashboard
                  </Button>
                ),
                title: "Payment successful",
                content:
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore.",
              });
            }}
          >
            Show dialog
          </Button>
        </div>
      </Stack>
    </>
  );
}

Page.getLayout = getPublicLayout;
