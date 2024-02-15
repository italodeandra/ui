import { proxy, ref } from "valtio";
import isomorphicObjectId from "@italodeandra/next/utils/isomorphicObjectId";
import { ReactNode } from "react";
import { find } from "lodash";

export type IDialog = {
  _id: string;
  open: boolean;
  props: {
    title?: ReactNode;
    description?: ReactNode;
    content: ReactNode;
    contentClassName?: string;
    contentOverflowClassName?: string;
    onClose?: (_id: string) => void;
  };
};

const dialogsState = proxy({
  rendered: false,
  setRendered(rendered: boolean) {
    dialogsState.rendered = rendered;
  },
  dialogs: [] as IDialog[],
  add({
    _id = isomorphicObjectId().toString(),
    open = true,
    ...dialog
  }: Partial<Omit<IDialog, "props">> & IDialog["props"]) {
    if (!dialogsState.rendered) {
      console.error("<Dialogs /> is not rendered. The dialog will be ignored.");
    }
    dialogsState.dialogs.push({
      _id,
      open,
      props: ref(dialog),
    });
  },
  remove(_id: string) {
    dialogsState.dialogs.splice(
      dialogsState.dialogs.findIndex((n) => n._id === _id),
      1,
    );
  },
  update(dialog: Pick<IDialog, "_id"> & Partial<Omit<IDialog, "_id">>) {
    let updateDialog = find(dialogsState.dialogs, { _id: dialog._id });
    if (updateDialog) {
      Object.assign(updateDialog, dialog);
    }
  },
});

export function showDialog(
  dialog: Partial<Omit<IDialog, "props">> & IDialog["props"],
) {
  dialogsState.add(dialog);
}

export function closeDialog(_id: string) {
  dialogsState.update({
    _id,
    open: false,
  });
  setTimeout(() => dialogsState.remove(_id), 300);
}

export default dialogsState;
