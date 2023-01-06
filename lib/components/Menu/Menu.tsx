import { Fragment, ReactNode } from "react";
import { Menu as HuiMenu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import Button from "../Button/Button";
import UnstyledButton, { UnstyledButtonProps } from "../Button/UnstyledButton";
import Text, { TextProps } from "../Text/Text";

export const defaultMenuItemsClassName =
  "z-10 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-zinc-800";

export type MenuProps = {
  className?: string;
  position?: "left" | "right" | "bottom-right" | "bottom-left";
  iconClassName?: string;
  label?: ReactNode;
  children?: ReactNode;
  button?: ReactNode;
};

export type MenuItemProps<Href extends string | undefined> =
  UnstyledButtonProps<Href>;

Menu.Item = function MenuItem<Href extends string | undefined>({
  className,
  ...props
}: MenuItemProps<Href>) {
  return (
    <HuiMenu.Item>
      {({ active }) => (
        <UnstyledButton
          {...props}
          type="button"
          className={clsx(
            "w-full text-left",
            active
              ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-700/50 dark:text-zinc-100"
              : "text-zinc-700 dark:text-zinc-200",
            "block px-4 py-2 text-sm",
            className
          )}
        />
      )}
    </HuiMenu.Item>
  );
};

export type MenuLabelProps<
  Inline extends boolean | undefined,
  Href extends string | undefined
> = TextProps<Inline, Href>;

Menu.Label = function MenuItem<
  Inline extends boolean | undefined,
  Href extends string | undefined
>(props: MenuLabelProps<Inline, Href>) {
  return (
    <Text
      {...props}
      variant="label"
      className={clsx(
        "w-full text-left",
        "block px-4 py-2 text-sm",
        props.className
      )}
    />
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
          className={clsx(defaultMenuItemsClassName, "absolute mt-2 w-56", {
            "right-0": position.includes("right"),
            "origin-top-right":
              position.includes("right") && !position.includes("bottom"),
            "origin-top-left":
              position.includes("left") && !position.includes("bottom"),
            "origin-bottom-right":
              position.includes("right") && position.includes("bottom"),
            "origin-bottom-left":
              position.includes("left") && position.includes("bottom"),
            "left-0": position.includes("left"),
            "bottom-0": position.includes("bottom"),
          })}
        >
          <div className="py-1">{children}</div>
        </HuiMenu.Items>
      </Transition>
    </HuiMenu>
  );
}
