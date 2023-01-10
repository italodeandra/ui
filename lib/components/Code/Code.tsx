import { Fragment } from "react";
import Highlight, { defaultProps, Language } from "prism-react-renderer";
import clsx from "clsx";

export type CodeProps = {
  children: string;
  language: Language;
  className?: string;
};

export default function Code({ children, language, className }: CodeProps) {
  return (
    <div className={clsx("prose max-w-none", className)}>
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
  );
}
