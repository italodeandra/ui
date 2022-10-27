import {
  Anchor,
  Box,
  MediaQuery,
  Paper,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconHome } from "@tabler/icons";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

export interface IBreadcrumb {
  name: string;
  children?: ReactNode;
  href?: string;
}

export default function Breadcrumbs({
  items,
  action,
}: {
  items: IBreadcrumb[];
  action?: ReactNode;
}) {
  const { route } = useRouter();
  const theme = useMantineTheme();

  const first = items[0];
  const rest = items.slice(1);

  return (
    <MediaQuery
      smallerThan="xs"
      styles={{
        display: "none",
      }}
    >
      <Paper
        sx={{
          background: "transparent",
          borderBottom: `1px solid ${
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[3]
          }`,
          display: "flex",
          alignItems: "center",
        }}
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
            <Anchor
              component={NextLink}
              href={first.href || ""}
              variant="text"
              sx={{
                display: "flex",
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors.gray[5]
                    : theme.colors.gray[6],
                "body.hasHover &:hover": {
                  color:
                    theme.colorScheme === "dark"
                      ? theme.colors.gray[2]
                      : theme.colors.gray[8],
                },
              }}
            >
              <IconHome size={20} aria-label={first.name} />
            </Anchor>
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
                  color:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[5]
                      : theme.colors.gray[3],
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
              {item.children ? (
                item.children
              ) : item.href ? (
                <Anchor
                  component={NextLink}
                  href={item.href}
                  size="sm"
                  aria-current={route === item.href ? "page" : undefined}
                  color={theme.colorScheme === "dark" ? "gray.5" : "gray.7"}
                >
                  {item.name}
                </Anchor>
              ) : (
                <Text
                  size="sm"
                  weight={500}
                  color={theme.colorScheme === "dark" ? "gray.5" : "gray.7"}
                >
                  {item.name}
                </Text>
              )}
            </Box>
          ))}
        </Box>
        {action && (
          <Box sx={{ marginLeft: "auto", marginRight: "1rem" }}>{action}</Box>
        )}
      </Paper>
    </MediaQuery>
  );
}
