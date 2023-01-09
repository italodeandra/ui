import { NextSeo } from "next-seo";
import Breadcrumbs from "../../lib/components/Breadcrumbs/Breadcrumbs";
import getPublicLayout from "../views/publicLayout";
import Stack from "../../lib/components/Stack/Stack";
import ConfirmationButton from "../../lib/components/ConfirmationButton/ConfirmationButton";
import { showNotification } from "../../lib/components/Notifications/notifications.state";

const pages = [{ title: "Confirmation button" }];

export default function ConfirmationButtonPage() {
  return (
    <>
      <NextSeo title="Confirmation button" />
      <Breadcrumbs pages={pages} className="mb-2 md:mx-2" />
      <Stack className="p-2">
        <div>
          <ConfirmationButton
            label="Delete"
            confirmation="Are you sure you want to delete?"
            onConfirm={() => showNotification({ message: "Deleted!" })}
            loading={true}
          />
        </div>
      </Stack>
    </>
  );
}

ConfirmationButtonPage.getLayout = getPublicLayout;