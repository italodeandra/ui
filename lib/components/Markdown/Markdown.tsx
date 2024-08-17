import React, { useMemo } from "react";
import clsx from "../../utils/clsx";
import showdown, { ConverterOptions } from "showdown";

export type MarkdownProps = {
  children?: string;
  className?: string;
  options?: ConverterOptions;
};

export default function Markdown({
  children,
  className,
  options,
}: MarkdownProps) {
  const converter = useMemo(
    () => new showdown.Converter(options),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(options)],
  );

  return (
    <div
      className={clsx(
        "prose prose-zinc max-w-full dark:prose-invert",
        className,
      )}
      dangerouslySetInnerHTML={
        children
          ? {
              __html: converter.makeHtml(children),
            }
          : undefined
      }
    />
  );
}
