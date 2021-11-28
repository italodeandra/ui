import arrowLeft from "@iconify/icons-heroicons-solid/arrow-left";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, VFC } from "react";
import Button from "../../../lib/components/Button";
import Icon from "../../../lib/components/Icon";
import DarkModeSelect from "../DarkModeSelect/DarkModeSelect";

interface DemoTemplateProps {
  title?: string | true;
  header: string;
  children: ReactNode;
}

const DemoTemplate: VFC<DemoTemplateProps> = ({ children, title, header }) => {
  const router = useRouter();
  const isHome = router.route === "/";
  return (
    <>
      <NextSeo title={title === true ? header : title} />
      <Stack p={2} spacing={2} minHeight={"100vh"}>
        <Typography variant={"h6"} display={"flex"} alignItems={"center"}>
          {header}
          {!isHome && (
            <Link href={"/"} passHref>
              <Button
                size={"small"}
                color={"gray"}
                variant={"text"}
                startIcon={<Icon icon={arrowLeft} />}
                sx={{ ml: 2 }}
              >
                Go back
              </Button>
            </Link>
          )}
        </Typography>
        <Box>{children}</Box>
        <Box flexGrow={1} />
        <Box mr={"auto"}>
          <DarkModeSelect />
        </Box>
      </Stack>
    </>
  );
};

export default DemoTemplate;
