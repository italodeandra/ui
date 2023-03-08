import { Fragment } from "react";
import Highlight, { defaultProps, Language } from "prism-react-renderer";
import clsx from "clsx";
import CopyButton from "../CopyButton/CopyButton";

export type CodeProps = {
  children: string;
  language: Language;
  className?: string;
  copy?: boolean;
  copyText?: string;
  copiedText?: string;
};

export default function Code({
  children,
  language,
  className,
  copy,
  copyText,
  copiedText,
}: CodeProps) {
  return (
    <div className={clsx("dark group relative", className)}>
      <div className="prose max-w-none">
        <Highlight
          {...defaultProps}
          code={children.trimEnd()}
          language={language}
          theme={undefined}
        >
          {({ className, style, tokens, getTokenProps }) => (
            <pre className={className} style={style}>
              <code>
                {tokens.map((line, lineIndex) => (
                  <Fragment key={lineIndex}>
                    {line
                      .filter((token) => !token.empty)
                      .map((token, tokenIndex) => (
                        <span key={tokenIndex} {...getTokenProps({ token })} />
                      ))}
                    {"\n"}
                  </Fragment>
                ))}
              </code>
            </pre>
          )}
        </Highlight>
      </div>
      {copy && (
        <CopyButton
          text={children}
          copyText={copyText}
          copiedText={copiedText}
        />
      )}
    </div>
  );
}
