import { ReactNode } from "react";
import BottomBlurryPoint from "../../lib/components/BackgroundEffects/BottomBlurryPoint";
import TopBlurryPoint from "../../lib/components/BackgroundEffects/TopBlurryPoint";
import Header from "./Header/Header";
import NavigationDrawer from "./Header/NavigationDrawer";

export default function getPublicLayout(children: ReactNode) {
  return (
    <>
      <Header />
      <div className="h-16" />
      <NavigationDrawer>
        <TopBlurryPoint />
        <BottomBlurryPoint />
        {children}
      </NavigationDrawer>
    </>
  );
}
