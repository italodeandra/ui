/* eslint-disable no-console */
import { isBrowser } from "../utils/isBrowser";

const consoleLog = console.log;

if (isBrowser && process.env.NODE_ENV !== "development") {
  console.log = () => {
    return consoleLog("Suppressed log in production");
  };
}
