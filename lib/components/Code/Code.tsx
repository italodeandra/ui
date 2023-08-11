import { Fragment } from "react";
import Highlight, {
  defaultProps,
  Language,
  PrismTheme,
} from "prism-react-renderer";
import clsx from "clsx";
import CopyButton from "../CopyButton/CopyButton";

export type CodeProps = {
  children: string;
  language: Language;
  className?: string;
  copy?: boolean;
  copyText?: string;
  copiedText?: string;
  theme?: PrismTheme;
};

export default function Code({
  children,
  language,
  className,
  copy,
  copyText,
  copiedText,
  theme,
}: CodeProps) {
  return (
    <div
      className={clsx("group relative", className, {
        dark: !theme,
      })}
    >
      <div className="prose max-w-none">
        <Highlight
          {...defaultProps}
          code={children.trimEnd()}
          language={language}
          theme={theme}
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
