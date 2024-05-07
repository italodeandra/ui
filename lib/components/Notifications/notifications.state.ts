import { proxy, ref } from "valtio";
import isomorphicObjectId from "@italodeandra/next/utils/isomorphicObjectId";
import ms from "ms";
import { CSSProperties, ReactElement, ReactNode } from "react";

type Notification = {
  _id: string;
  message: string | ReactElement;
  title?: string;
  timeout?: number | string;
  icon?: "success" | "error" | ReactElement;
  dismissable?: boolean;
  actions?: ReactNode;
  suppress?: boolean;
  style?: CSSProperties;
  className?: string;
};

const notificationsState = proxy({
  rendered: false,
  setRendered(rendered: boolean) {
    notificationsState.rendered = rendered;
  },
  notifications: [] as Notification[],
  add({
    _id = isomorphicObjectId().toString(),
    dismissable = true,
    timeout,
    ...notification
  }: Pick<Partial<Notification>, "_id"> & Omit<Notification, "_id">) {
    if (!notificationsState.rendered) {
      console.error(
        "<Notifications /> is not rendered. The notification will be ignored.",
      );
    }
    notificationsState.notifications.push(
      ref({
        ...notification,
        dismissable,
        _id,
      }),
    );
    if (timeout) {
      setTimeout(
        () => {
          notificationsState.remove(_id);
        },
        typeof timeout === "string" ? ms(timeout) : timeout,
      );
    }
  },
  remove(_id: string) {
    notificationsState.notifications.splice(
      notificationsState.notifications.findIndex((n) => n._id === _id),
      1,
    );
  },
});

export function showNotification(
  notification:
    | string
    | (Pick<Partial<Notification>, "_id"> & Omit<Notification, "_id">),
) {
  const notificationObject =
    typeof notification === "string" ? { message: notification } : notification;
  if (
    notificationObject.suppress &&
    notificationsState.notifications.find(
      (n) =>
        n.message === notificationObject.message &&
        n.title === notificationObject.title,
    )
  ) {
    return;
  }
  notificationsState.add(notificationObject);
}

export function removeNotification(_id: string) {
  notificationsState.remove(_id);
}

export default notificationsState;
