import { ReactNode } from "react";
import BottomBlurryPoint from "../pages/BackgroundEffects/BottomBlurryPoint";
import TopBlurryPoint from "../pages/BackgroundEffects/TopBlurryPoint";
import Header from "./Header/Header";
import NavigationDrawer from "./Header/NavigationDrawer";

export default function getPublicLayout(children: ReactNode) {
  return (
    <>
      <Header />
      <NavigationDrawer>
        <TopBlurryPoint />
        <BottomBlurryPoint />
        {children}
      </NavigationDrawer>
    </>
  );
}
