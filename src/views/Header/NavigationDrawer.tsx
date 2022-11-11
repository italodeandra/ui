import { ReactNode } from "react";
import { components } from "../../components";
import UiNavigationDrawer from "../../../lib/components/NavigationDrawer/NavigationDrawer";
import NavigationItem from "../../../lib/components/NavigationDrawer/NavigationItem";

export default function NavigationDrawer({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <UiNavigationDrawer
      navigationChildren={
        <>
          {components.map((route) => (
            <NavigationItem
              key={route.href}
              icon={route.icon}
              href={route.href}
              exact={route.exact}
            >
              {route.title}
            </NavigationItem>
          ))}
        </>
      }
    >
      {children}
    </UiNavigationDrawer>
  );
}
