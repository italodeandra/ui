import { useEffect, useState } from "react";
import clsx from "clsx";
import { ClipboardIcon } from "@heroicons/react/24/outline";
import Button from "../Button/Button";

export type CopyButtonProps = {
  text: string;
  copyText?: string;
  copiedText?: string;
};

export default function CopyButton({
  text,
  copyText = "Copy",
  copiedText = "Copied!",
}: CopyButtonProps) {
  let [copyCount, setCopyCount] = useState(0);
  let copied = copyCount > 0;

  useEffect(() => {
    if (copyCount > 0) {
      let timeout = setTimeout(() => setCopyCount(0), 1000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [copyCount]);

  return (
    <Button
      type="button"
      className={clsx(
        "group/button absolute top-2.5 right-2.5 overflow-hidden rounded-full !py-1 !px-2 !text-xs opacity-0 backdrop-blur transition focus:opacity-100 group-hover:opacity-100",
        copied
          ? "bg-primary-400/10 ring-primary-400/20"
          : "hover:bg-white/7.5 dark:bg-white/2.5 bg-white/5 dark:hover:bg-white/5"
      )}
      onClick={() => {
        window.navigator.clipboard.writeText(text).then(() => {
          setCopyCount((count) => count + 1);
        });
      }}
    >
      <span
        aria-hidden={copied}
        className={clsx(
          "pointer-events-none flex items-center gap-0.5 text-zinc-400 transition duration-300",
          copied && "-translate-y-1.5 opacity-0"
        )}
      >
        <ClipboardIcon className="mr-1 h-5 w-5 fill-zinc-500/20 stroke-zinc-500 transition-colors group-hover/button:stroke-zinc-400" />
        {copyText}
      </span>
      <span
        aria-hidden={!copied}
        className={clsx(
          "pointer-events-none absolute inset-0 flex items-center justify-center text-primary-500 transition duration-300",
          !copied && "translate-y-1.5 opacity-0"
        )}
      >
        {copiedText}
      </span>
    </Button>
  );
}
