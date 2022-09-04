import { Anchor, Box, Paper, Text, useMantineTheme } from "@mantine/core";
import { IconHome } from "@tabler/icons";
import NextLink from "next/link";
import { useRouter } from "next/router";

export interface IBreadcrumb {
  name: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: IBreadcrumb[] }) {
  const { route } = useRouter();
  const theme = useMantineTheme();

  const first = items[0];
  const rest = items.slice(1);

  return (
    <Paper
      sx={{
        background: "transparent",
        borderBottom: `1px solid ${theme.colors.dark[6]}`,
      }}
      shadow="sm"
      radius={0}
    >
      <Box
        component="ol"
        role="list"
        sx={{ display: "flex", margin: 0, padding: 0 }}
      >
        <Box
          component="li"
          sx={{
            listStyleType: "none",
            display: "flex",
            alignItems: "center",
            marginLeft: "1rem",
          }}
        >
          <NextLink href={first.href || ""} passHref>
            <Anchor
              variant="text"
              sx={{
                display: "flex",
                "body.hasHover &:hover": {
                  color: theme.colors.gray[1],
                },
              }}
            >
              <IconHome size={20} aria-label={first.name} />
            </Anchor>
          </NextLink>
        </Box>
        {rest.map((item) => (
          <Box
            component="li"
            sx={{
              listStyleType: "none",
              display: "flex",
              alignItems: "center",
              marginLeft: "1rem",
            }}
            key={item.name}
          >
            <Box
              component="svg"
              sx={{
                height: "100%",
                width: "1.5rem",
                color: theme.colors.dark[5],
                marginRight: "1rem",
              }}
              className="flex-shrink-0 w-6 h-full text-slate-200 dark:text-slate-800"
              viewBox="0 0 24 44"
              preserveAspectRatio="none"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
            </Box>
            {item.href ? (
              <NextLink href={item.href} passHref>
                <Anchor
                  size="sm"
                  aria-current={route === item.href ? "page" : undefined}
                >
                  {item.name}
                </Anchor>
              </NextLink>
            ) : (
              <Text size="sm" weight={500}>
                {item.name}
              </Text>
            )}
          </Box>
        ))}
      </Box>
    </Paper>
  );
}
