import { ReactNode } from "react";
import BottomBlurryPoint from "../../lib/components/BackgroundEffects/BottomBlurryPoint";
import TopBlurryPoint from "../../lib/components/BackgroundEffects/TopBlurryPoint";
import Header from "./Header/Header";
import NavigationDrawer from "./Header/NavigationDrawer";
import Footer from "../../lib/components/Footer/Footer";

export default function getPublicLayout(children: ReactNode) {
  return (
    <>
      <Header />
      <NavigationDrawer>
        <TopBlurryPoint />
        <BottomBlurryPoint />
        <Footer companyName="Majapi">
          <div className="h-16" />
          {children}
        </Footer>
      </NavigationDrawer>
    </>
  );
}
