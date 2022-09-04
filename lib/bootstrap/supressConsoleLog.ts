import { isBrowser } from "../utils/isBrowser";

const consoleLog = console.log;

if (isBrowser && process.env.NODE_ENV === "production") {
  console.log = () => {
    return consoleLog("Suppressed log in production");
  };
}
