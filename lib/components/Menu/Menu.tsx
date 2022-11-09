import { Fragment, ReactNode } from "react";
import { Menu as HuiMenu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import Button from "../Button/Button";
import UnstyledButton, { UnstyledButtonProps } from "../Button/UnstyledButton";

export type MenuProps = {
  className?: string;
  position?: "left" | "right";
  iconClassName?: string;
  label?: ReactNode;
  children?: ReactNode;
  button?: ReactNode;
};

export type MenuItemProps<Href extends string | undefined> =
  UnstyledButtonProps<Href>;

Menu.Item = function MenuItem<Href extends string | undefined>(
  props: MenuItemProps<Href>
) {
  return (
    <HuiMenu.Item>
      {({ active }) => (
        <UnstyledButton
          {...props}
          className={clsx(
            "w-full text-left",
            active ? "bg-gray-100 text-gray-900" : "text-gray-700",
            "block px-4 py-2 text-sm"
          )}
        />
      )}
    </HuiMenu.Item>
  );
};

export default function Menu({
  className,
  iconClassName,
  position = "right",
  children,
  label,
  button,
}: MenuProps) {
  return (
    <HuiMenu
      as="div"
      className={clsx("relative inline-block text-left", className)}
    >
      <div>
        {button ? (
          <HuiMenu.Button as={Fragment}>{button}</HuiMenu.Button>
        ) : (
          <HuiMenu.Button
            as={Button}
            className="flex w-full"
            trailingIcon={<ChevronDownIcon className={iconClassName} />}
          >
            {label}
          </HuiMenu.Button>
        )}
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <HuiMenu.Items
          className={clsx(
            "absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
            {
              "right-0": position === "right",
              "left-0": position === "left",
            }
          )}
        >
          <div className="py-1">{children}</div>
        </HuiMenu.Items>
      </Transition>
    </HuiMenu>
  );
}
