import { ReactNode } from "react";
import { menu } from "../../menu";
import UiNavigationDrawer from "../../../lib/components/NavigationDrawer/NavigationDrawer";
import NavigationItem from "../../../lib/components/NavigationDrawer/NavigationItem";
import Text from "../../../lib/components/Text/Text";
import { Disclosure } from "@headlessui/react";
import Button from "../../../lib/components/Button/Button";
import clsx from "clsx";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

export default function NavigationDrawer({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <UiNavigationDrawer
      navigationChildren={
        <>
          {menu.map((route) =>
            route.submenus ? (
              <div key={route.title}>
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                        as={Button}
                        variant="text"
                        className={clsx(
                          "w-full !justify-start !border-transparent"
                        )}
                      >
                        {route.title}
                        <ChevronUpIcon
                          className={`${
                            open ? "rotate-180 transform" : ""
                          } ml-auto h-5 w-5`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel
                        className={clsx({
                          "mb-5": open,
                        })}
                      >
                        {route.submenus.map((submenu) =>
                          submenu.href ? (
                            <NavigationItem
                              key={submenu.href}
                              // icon={submenu.icon}
                              href={submenu.href}
                              exact={submenu.exact}
                            >
                              {submenu.title}
                            </NavigationItem>
                          ) : (
                            <Text
                              key={submenu.title}
                              variant="secondary"
                              size="xs"
                              className="mt-4 mb-1 px-3 first:mt-1"
                            >
                              {submenu.title}
                            </Text>
                          )
                        )}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
            ) : (
              <NavigationItem
                key={route.href}
                icon={route.icon}
                href={route.href}
                exact={route.exact}
              >
                {route.title}
              </NavigationItem>
            )
          )}
        </>
      }
    >
      {children}
    </UiNavigationDrawer>
  );
}
