import Button from "../../lib/components/Button";
import Stack from "../../lib/components/Stack";
import getPublicLayout from "../views/publicLayout";
import { NextSeo } from "next-seo";
import { GetServerSideProps } from "next";
import { getCookies } from "cookies-next";
import Breadcrumbs from "../../lib/components/Breadcrumbs";
import { closeDialog, showDialog } from "../../lib/components/Dialog";
import { showNotification } from "../../lib/components/Notifications";
import Group from "../../lib/components/Group";
import { useState } from "react";
import Dialog from "../../lib/components/Dialog/Dialog";
import isomorphicObjectId from "@italodeandra/next/utils/isomorphicObjectId";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => ({
  props: {
    cookies: await getCookies({ req, res }),
  },
});

const pages = [{ title: "Dialogs" }];

export default function Page() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <NextSeo title={pages[0].title} />
      <Breadcrumbs pages={pages} className="mb-2 md:mx-2" />
      <Stack className="p-2">
        <div>
          <Button
            onClick={() => {
              const _id = isomorphicObjectId().toString();
              showDialog({
                _id,
                title: "Payment successful",
                description:
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore.",
                content: (
                  <Group>
                    <Button
                      variant="filled"
                      className="w-full"
                      onClick={() => showNotification("Test")}
                    >
                      Show notification
                    </Button>
                    <Button
                      variant="filled"
                      className="w-full"
                      onClick={() => closeDialog(_id)}
                    >
                      Go back to dashboard
                    </Button>
                  </Group>
                ),
              });
            }}
          >
            Show dialog using `showDialog`
          </Button>
        </div>
        <div>
          <Button onClick={() => setOpen(!isOpen)}>Show dialog</Button>
          <Dialog
            title="Payment successful"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore."
            open={isOpen}
            onOpenChange={(open) => setOpen(open)}
          >
            <Group>
              <Button
                variant="filled"
                className="w-full"
                onClick={() => showNotification("Test")}
              >
                Show notification
              </Button>
              <Button
                variant="filled"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                Go back to dashboard
              </Button>
            </Group>
          </Dialog>
        </div>
      </Stack>
    </>
  );
}

Page.getLayout = getPublicLayout;
