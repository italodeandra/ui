import { ReactNode } from "react";
import { menu } from "../../menu";
import UiNavigationDrawer, {
  NavigationItem,
} from "../../../lib/components/NavigationDrawer";
import Text from "../../../lib/components/Text";
import Button from "../../../lib/components/Button";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import * as Accordion from "@radix-ui/react-accordion";

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
                <Accordion.Root type="multiple">
                  <Accordion.Item value={route.title}>
                    <Accordion.Header>
                      <Accordion.Trigger asChild>
                        <Button
                          variant="text"
                          className="w-full justify-start border-transparent group"
                        >
                          {route.title}
                          <ChevronUpIcon className="group-data-[state=open]:rotate-180 transition-transform ml-auto h-5 w-5" />
                        </Button>
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="mb-5">
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
                        ),
                      )}
                    </Accordion.Content>
                  </Accordion.Item>
                </Accordion.Root>
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
            ),
          )}
        </>
      }
    >
      {children}
    </UiNavigationDrawer>
  );
}
