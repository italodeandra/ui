import Button from "../../../lib/components/Button";
import UiHeader from "../../../lib/components/Header";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { navigationDrawerState } from "../../../lib/components/NavigationDrawer";
import NextLink from "next/link";
import ModeToggle from "../../../lib/components/ModeToggle";

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
      <NextLink href="/" className="ml-3">
        <Image src="/favicon.ico" width={34} height={34} alt="Logo" />
      </NextLink>
      <span className="ml-2 text-xl font-medium">@italodeandra/ui</span>
      <div className="flex-grow" />
      <ModeToggle />
    </UiHeader>
  );
}
