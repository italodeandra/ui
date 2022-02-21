import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { duration, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { NextSeo } from "next-seo";
import { VFC } from "react";
import useToggle from "react-use/lib/useToggle";
import DemoTemplate from "../../../src/components/DemoTemplate/DemoTemplate";
import defaultTheme from "../../styles/defaultTheme";
import Button from "../Button";
import Typography from "../Typography";
import Drawer from "./Drawer";

const drawerSize = defaultTheme.spacing(32);

const DrawerDemo: VFC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));
  const [isOpen, toggleOpen] = useToggle(false);
  return (
    <>
      <Box
        sx={{
          ml: !isMobile && isOpen ? drawerSize : 0,
          transition: (theme2) =>
            theme2.transitions.create("margin-left", {
              duration: isOpen
                ? duration.enteringScreen
                : duration.leavingScreen,
            }),
        }}
      >
        <DemoTemplate title header={"Drawer"}>
          <Grid container spacing={1} direction={"row"}>
            <Grid item>
              <Button onClick={toggleOpen}>Toggle drawer</Button>
            </Grid>
          </Grid>
        </DemoTemplate>
      </Box>

      <Drawer
        open={isOpen}
        onClose={() => toggleOpen(false)}
        onOpen={() => toggleOpen(true)}
      >
        <NextSeo title={"Drawer"} />
        <Box px={2} height={(theme) => theme.spacing(6)} />
        <Toolbar>
          <Typography
            as="div"
            fontWeight={500}
            sx={{
              flexGrow: 1,
              ml: {
                sm: -1,
              },
            }}
          >
            News
          </Typography>
        </Toolbar>
        <Box role="presentation" sx={{ width: drawerSize }}>
          <List>
            <ListItem button>
              <ListItemText primary={"Menu 1"} />
            </ListItem>
          </List>
          <Divider light />
          <List>
            <ListItem button>
              <ListItemText primary={"Menu 2"} />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default DrawerDemo;