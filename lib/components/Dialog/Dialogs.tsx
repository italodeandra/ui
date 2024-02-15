import { useSnapshot } from "valtio";
import dialogsState, { closeDialog } from "./dialogs.state";
import { ReactNode, useEffect } from "react";
import Dialog from "./Dialog";

export default function Dialogs() {
  let { dialogs, setRendered } = useSnapshot(dialogsState);

  useEffect(() => {
    setRendered(true);
    return () => {
      setRendered(false);
    };
  }, [setRendered]);

  return (
    <>
      {dialogs.map((dialog) => (
        <Dialog
          key={dialog._id}
          title={dialog.props.title as ReactNode}
          description={dialog.props.description as ReactNode}
          open={dialog.open}
          onOpenChange={() => {
            closeDialog(dialog._id);
            dialog.props.onClose?.(dialog._id);
          }}
          contentClassName={dialog.props.contentClassName}
          contentOverflowClassName={dialog.props.contentOverflowClassName}
        >
          {dialog.props.content as ReactNode}
        </Dialog>
      ))}
    </>
  );
}
