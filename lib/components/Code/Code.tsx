import { Fragment, ReactNode } from "react";
import Highlight, { defaultProps, Language } from "prism-react-renderer";

export type CodeProps = {
  children: string;
  language: Language;
};

export default function Code({ children, language }: CodeProps) {
  return (
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
  );
}
