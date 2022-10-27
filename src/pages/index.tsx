import { Container, Skeleton } from "@mantine/core";
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
            children: <Skeleton height={12} width={40} />,
          },
          {
            name: "Demo",
          },
        ]}
      />
    </Container>
  );
}
