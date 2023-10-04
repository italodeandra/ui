import { proxy, ref } from "valtio";
import isomorphicObjectId from "@italodeandra/next/utils/isomorphicObjectId";
import { ReactElement, ReactNode } from "react";
import { find } from "lodash";

export type IDialog = {
  _id: string;
  actions?: ReactNode | ((_id: string) => ReactNode);
  title?: ReactNode;
  content: ReactNode | ((_id: string) => ReactNode);
  icon?: ReactElement;
  open?: boolean;
  hideCloseButton?: boolean;
  panelClassName?: string;
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
  }: Pick<Partial<IDialog>, "_id"> & Omit<IDialog, "_id">) {
    if (!dialogsState.rendered) {
      console.error("<Dialogs /> is not rendered. The dialog will be ignored.");
    }
    dialogsState.dialogs.push(
      ref({
        ...dialog,
        open,
        _id,
      })
    );
  },
  remove(_id: string) {
    dialogsState.dialogs.splice(
      dialogsState.dialogs.findIndex((n) => n._id === _id),
      1
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
  dialog: Pick<Partial<IDialog>, "_id"> & Omit<IDialog, "_id">
) {
  dialogsState.add(dialog);
}

export function closeDialog(_id: string) {
  dialogsState.update({
    _id,
    open: false,
  });
  setTimeout(() => dialogsState.remove(_id), 200);
}

export default dialogsState;
