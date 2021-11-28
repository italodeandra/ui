import arrowLeft from "@iconify/icons-heroicons-solid/arrow-left";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "../Typography";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { VFC } from "react";
import useWindowScroll from "react-use/lib/useWindowScroll";
import DarkModeSelect from "../../../src/components/DarkModeSelect/DarkModeSelect";
import Button from "../../components/Button";
import Icon from "../../components/Icon";
import numericArray from "../../utils/numericArray";
import AppBar from "./AppBar";

const AppBarDemo: VFC = () => {
  const { y: scrollTop } = useWindowScroll();

  return (
    <>
      <NextSeo title={"App bar"} />
      <Box px={2} height={(theme) => theme.spacing(6)} />
      <AppBar
        elevation={
          scrollTop > 8 * 4 ? 3 : scrollTop > 8 * 2 ? 2 : scrollTop > 0 ? 1 : 0
        }
      >
        <Box
          px={2}
          height={(theme) => theme.spacing(6)}
          alignItems={"center"}
          display={"flex"}
        >
          <Typography variant={"h6"} display={"flex"} alignItems={"center"}>
            App bar
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
          </Typography>
        </Box>
      </AppBar>

      <Stack p={2} spacing={2} minHeight={"100vh"}>
        {numericArray(20).map((i) => (
          <Typography key={i} align={"justify"}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam
            autem commodi, cum cupiditate dicta dignissimos doloribus dolorum
            ducimus eius error fuga iusto laudantium nihil non perferendis sed
            sequi sint ullam.
          </Typography>
        ))}
        <Box flexGrow={1} />
        <Box mr={"auto"}>
          <DarkModeSelect />
        </Box>
      </Stack>
    </>
  );
};

export default AppBarDemo;
