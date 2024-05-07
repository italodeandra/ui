import Code from "../../../lib/components/Code";
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
  // noinspection JSUnusedGlobalSymbols
  return useCallback(
    (code: string) => ({
      onMouseOver() {
        exampleCodeState.setHoveredCode(code);
      },
      onMouseOut() {
        exampleCodeState.clearHoveredCode();
      },
    }),
    [],
  );
}

export function ExampleCode() {
  const { hoveredCode } = useSnapshot(exampleCodeState);

  return (
    <Code language="tsx" className="max-w-full" copy>
      {hoveredCode || `// hover a component to see its source code`}
    </Code>
  );
}
