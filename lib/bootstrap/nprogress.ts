import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";

export default function setupNProgress(color: string = "#0ea5e9") {
  const progress = new ProgressBar({
    size: 2,
    color,
    className: "bar-of-progress",
    delay: 100,
  });

  // this fixes safari jumping to the bottom of the page
  // when closing the search modal using the `esc` key
  if (typeof window !== "undefined") {
    progress.start();
    progress.finish();
  }

  Router.events.on("routeChangeStart", () => progress.start());
  Router.events.on("routeChangeComplete", () => progress.finish());
  Router.events.on("routeChangeError", () => progress.finish());
}
