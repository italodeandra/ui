import Code from "../../../lib/components/Code/Code";
import React, { useCallback } from "react";
import { proxy, useSnapshot } from "valtio";
import ms from "ms";

const exampleCodeState = proxy({
  timer: null as ReturnType<typeof setTimeout> | null,
  hoveredCode: "",
  setHoveredCode(code: string) {
    clearTimeout(exampleCodeState.timer as ReturnType<typeof setTimeout>);
    exampleCodeState.hoveredCode = code;
  },
  clearHoveredCode() {
    clearTimeout(exampleCodeState.timer as ReturnType<typeof setTimeout>);
    exampleCodeState.timer = setTimeout(() => {
      exampleCodeState.hoveredCode = "";
    }, ms("10s"));
  },
});

export function useExampleCodeCallback() {
  return useCallback(
    (code: string) => ({
      onMouseOver() {
        exampleCodeState.setHoveredCode(code);
      },
      onMouseOut() {
        exampleCodeState.clearHoveredCode();
      },
    }),
    []
  );
}

export function ExampleCode() {
  let { hoveredCode } = useSnapshot(exampleCodeState);

  return (
    <Code language="tsx" className="max-w-full" copy>
      {hoveredCode || `// hover a component to see it's source code`}
    </Code>
  );
}
