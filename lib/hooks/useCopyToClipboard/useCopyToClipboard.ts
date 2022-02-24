import { useCallback } from "react";
import useMountedState from "react-use/lib/useMountedState";
import useSetState from "react-use/lib/useSetState";
import writeText from "copy-to-clipboard";

export interface CopyToClipboardState {
  value?: string;
  noUserInteraction: boolean;
  error?: Error;
}

/**
 * Copy text to a user's clipboard.
 * This hook returns an array with:
 * 1 - the clipboard state with three properties: "error", "noUserInteraction" and "value".
 * 2 - the function that is called with the value that should be copied.
 * 3 - the function that should be called to reset the clipboard state
 */
export default function useCopyToClipboard(): [
  CopyToClipboardState,
  (value: string) => void,
  () => void
] {
  const isMounted = useMountedState();
  const [state, setState] = useSetState<CopyToClipboardState>({
    error: undefined,
    noUserInteraction: true,
    value: undefined,
  });

  const copyToClipboard = useCallback((value) => {
    if (!isMounted()) {
      return;
    }
    let noUserInteraction;
    let normalizedValue;
    try {
      // only strings and numbers can be copied to clipboard
      if (typeof value !== "string" && typeof value !== "number") {
        const error = new Error(
          `Cannot copy typeof ${typeof value} to clipboard, must be a string`
        );
        setState({
          error,
          noUserInteraction: true,
          value,
        });
        return;
      }
      // empty strings are also considered invalid
      else if (value === "") {
        const error = new Error(`Cannot copy empty string to clipboard.`);
        setState({
          error,
          noUserInteraction: true,
          value,
        });
        return;
      }
      normalizedValue = value.toString();
      noUserInteraction = writeText(normalizedValue);
      setState({
        error: undefined,
        noUserInteraction,
        value: normalizedValue,
      });
    } catch (error) {
      setState({
        error,
        noUserInteraction,
        value: normalizedValue,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reset = (): void => {
    setState({
      error: undefined,
      noUserInteraction: true,
      value: undefined,
    });
  };

  return [state, copyToClipboard, reset];
}
