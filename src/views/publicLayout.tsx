import { ReactNode } from "react";
import Header from "./Header/Header";
import NavigationDrawer from "./Header/NavigationDrawer";

export default function getPublicLayout(children: ReactNode) {
  return (
    <>
      <Header />
      <NavigationDrawer>{children}</NavigationDrawer>
    </>
  );
}
