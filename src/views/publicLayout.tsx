import { ReactNode } from "react";
import BottomBlurryPoint from "../../lib/components/BackgroundEffects/BottomBlurryPoint";
import TopBlurryPoint from "../../lib/components/BackgroundEffects/TopBlurryPoint";
import Header from "./Header/Header";
import NavigationDrawer from "./Header/NavigationDrawer";
import Footer from "../../lib/components/Footer";
import Link from "next/link";

export default function getPublicLayout(children: ReactNode) {
  return (
    <>
      <Header />
      <NavigationDrawer>
        <TopBlurryPoint />
        <BottomBlurryPoint />
        {/* eslint-disable-next-line react/jsx-no-undef */}
        <Footer
          companyName={
            <Link href="https://italodeandra.de">Ítalo de Andrade</Link>
          }
        >
          <div className="h-16" />
          {children}
        </Footer>
      </NavigationDrawer>
    </>
  );
}
