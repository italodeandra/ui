import { useIsMutating } from "@tanstack/react-query";
import useBeforeUnload from "./useBeforeUnload";

export default function useMutationWindowCloseProtection() {
  const isMutating = useIsMutating();
  useBeforeUnload(
    isMutating
      ? "Mutation in progress. Are you sure you want to leave this page?"
      : false,
  );
}

// noinspection JSUnusedGlobalSymbols
export function MutationWindowCloseProtection() {
  useMutationWindowCloseProtection();
  return null;
}
