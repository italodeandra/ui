import {
  cloneElement,
  ComponentPropsWithoutRef,
  Fragment,
  ReactElement,
  ReactNode,
} from "react";
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
  menuItemsClassName?: string;
  buttonProps?: ComponentPropsWithoutRef<typeof Button>;
  label?: ReactNode;
  children?: ReactNode;
  button?: ReactNode;
  unmount?: boolean;
};

export type MenuItemProps<Href extends string | undefined> =
  UnstyledButtonProps<Href> & {
    icon?: ReactElement;
  };

Menu.Item = function MenuItem<Href extends string | undefined>({
  className,
  icon,
  children,
  ...props
}: MenuItemProps<Href>) {
  return (
    <HuiMenu.Item>
      {({ active }) => (
        <UnstyledButton
          {...props}
          type="button"
          className={clsx(
            "flex w-full items-center text-left",
            active
              ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-700/50 dark:text-zinc-100"
              : "text-zinc-700 dark:text-zinc-200",
            "block px-4 py-2 text-sm",
            className
          )}
        >
          {icon &&
            cloneElement(icon, {
              className: clsx("w-5 mr-2", icon.props.className),
            })}
          {children}
        </UnstyledButton>
      )}
    </HuiMenu.Item>
  );
};

export type MenuLabelProps<
  Inline extends boolean | undefined,
  Href extends string | undefined
> = TextProps<Inline, Href>;

Menu.Label = function MenuLabel<
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
  buttonProps,
  unmount,
  menuItemsClassName,
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
            className={clsx("flex w-full", buttonProps?.className)}
            trailingIcon={<ChevronDownIcon className={iconClassName} />}
            {...buttonProps}
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
          unmount={unmount}
          className={clsx(
            defaultMenuItemsClassName,
            "absolute mt-2 min-w-[14rem]",
            {
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
            },
            menuItemsClassName
          )}
        >
          <div className="py-1">{children}</div>
        </HuiMenu.Items>
      </Transition>
    </HuiMenu>
  );
}
