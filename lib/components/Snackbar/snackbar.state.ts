import remove from "lodash/remove";
import { createRef, Ref } from "react";
import { v4 as uuid } from "uuid";
import { proxy, ref } from "valtio";

export type IMessage = {
  id: string;
  content: string;
  nodeRef: Ref<HTMLDivElement>;
  variant?: MessageVariant;
};

export type MessageVariant = "default" | "error";

const snackbarState = proxy({
  messages: [] as IMessage[],
});

export default snackbarState;

/**
 * The Snackbar API that creates a new message on the snackbar.
 */
export const notify = (
  message: string,
  options?: { suppress?: boolean; variant?: MessageVariant }
): string => {
  if (options?.suppress) {
    const existingMessage = snackbarState.messages.find(
      (m) => m.content === message
    );
    if (existingMessage) {
      return existingMessage.id;
    }
  }
  const id = uuid();
  snackbarState.messages.push({
    content: message,
    id,
    nodeRef: ref(createRef()),
    variant: options?.variant,
  });
  return id;
};

/**
 * The Snackbar API that removes an existing message on the snackbar.
 */
export const removeNotification = (id: string): void => {
  remove(snackbarState.messages, (m) => m.id === id);
};
