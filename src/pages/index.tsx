import { Container } from "@mantine/core";
import Breadcrumbs from "../../lib/components/Breadcrumbs";

// noinspection JSUnusedGlobalSymbols
export default function IndexPage() {
  return (
    <Container py="md">
      <Breadcrumbs
        items={[
          {
            name: "Home",
            href: "/",
          },
          {
            name: "Test",
            href: "/test",
          },
          {
            name: "Demo",
          },
        ]}
      />
    </Container>
  );
}
