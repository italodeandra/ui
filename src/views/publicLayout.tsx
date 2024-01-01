import { ReactNode } from "react";
import BottomBlurryPoint from "../../lib/components/BackgroundEffects/BottomBlurryPoint";
import TopBlurryPoint from "../../lib/components/BackgroundEffects/TopBlurryPoint";
import Header from "./Header/Header";
import Footer from "../../lib/components/Footer";
import Link from "next/link";
import dynamic from "next/dynamic";

const NavigationDrawer = dynamic(() => import("./Header/NavigationDrawer"), {
  ssr: false,
});

export default function getPublicLayout(children: ReactNode) {
  return (
    <>
      <Header />
      <NavigationDrawer>
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
