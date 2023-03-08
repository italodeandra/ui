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
      color={copied ? "success" : undefined}
      size="sm"
      className="absolute top-2.5 right-2.5 opacity-0 backdrop-blur focus:opacity-100 group-hover:opacity-100"
      onClick={() => {
        window.navigator.clipboard.writeText(text).then(() => {
          setCopyCount((count) => count + 1);
        });
      }}
      rounded
    >
      <span
        aria-hidden={copied}
        className={clsx(
          "pointer-events-none flex items-center gap-0.5 transition-[transform,opacity]",
          copied && "-translate-y-1.5 opacity-0"
        )}
      >
        <ClipboardIcon className="mr-2 h-4 w-4" />
        {copyText}
      </span>
      <span
        aria-hidden={!copied}
        className={clsx(
          "pointer-events-none absolute inset-0 flex items-center justify-center transition-[transform,opacity]",
          !copied && "translate-y-1.5 opacity-0"
        )}
      >
        {copiedText}
      </span>
    </Button>
  );
}
