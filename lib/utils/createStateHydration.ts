import { setCookie } from "cookies-next";
import ms from "ms";
import { snapshot, subscribe } from "valtio";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function createStateHydration(cookieName: string, state: any) {
  subscribe(state, () => {
    setCookie(cookieName, snapshot(state), {
      maxAge: ms("30d"),
      path: "/",
    });
  });

  return function hydrate(cookies?: { state?: string }) {
    if (cookies?.[cookieName as keyof typeof cookies]) {
      try {
        const cookieValueString = cookies[
          cookieName as keyof typeof cookies
        ] as string;
        const cookieValue = JSON.parse(cookieValueString);
        if (typeof cookieValue === "object") {
          Object.assign(state, cookieValue);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        // do nothing
      }
    }
  };
}
