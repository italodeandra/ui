import Button from "../../../lib/components/Button/Button";
import UiHeader from "../../../lib/components/Header/Header";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import navigationDrawerState from "../../../lib/components/NavigationDrawer/navigationDrawer.state";
import NextLink from "next/link";

export default function Header() {
  return (
    <UiHeader className="gap-2">
      <Button
        icon
        variant="text"
        className="-my-2 -ml-2"
        onClick={navigationDrawerState.toggle}
      >
        <Bars3BottomLeftIcon />
      </Button>
      <NextLink href="">
        <Image
          src="/favicon.ico"
          width={34}
          height={34}
          alt="Logo"
          className="ml-3"
        />
      </NextLink>
      <span className="ml-2 text-xl font-medium">@italodeandra/ui</span>
    </UiHeader>
  );
}
