import { ReactNode } from "react";
import BottomBlurryPoint from "../../lib/components/BackgroundEffects/BottomBlurryPoint";
import TopBlurryPoint from "../../lib/components/BackgroundEffects/TopBlurryPoint";
import Header from "./Header/Header";
import NavigationDrawer from "./Header/NavigationDrawer";
import Footer from "../../lib/components/Footer/Footer";

export default function getPublicLayout(children: ReactNode) {
  return (
    <Footer companyName="Majapi">
      <Header />
      <div className="h-16" />
      <NavigationDrawer>
        <TopBlurryPoint />
        <BottomBlurryPoint />
        {children}
      </NavigationDrawer>
    </Footer>
  );
}
