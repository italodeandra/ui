import { useSnapshot } from "valtio";
import dialogsState, { IDialog } from "./dialogs.state";
import { ComponentProps, ReactElement, ReactNode, useEffect } from "react";
import Modal from "../Modal/Modal";
import useModalState from "../Modal/useModalState";

function Dialog({ icon, open, title, content, actions, _id }: IDialog) {
  let [modalOpen, { openModal, closeModal }] = useModalState();

  useEffect(() => {
    if (open) {
      openModal();
    } else {
      closeModal();
    }
  }, [closeModal, open, openModal]);

  return (
    <Modal open={modalOpen} onClose={closeModal}>
      <Modal.Container>
        <Modal.CloseButton onClick={closeModal} />
        {icon && <Modal.Icon>{icon as ReactElement}</Modal.Icon>}
        {title && <Modal.Title>{title as ReactNode}</Modal.Title>}
        {content && (
          <Modal.Content>
            {typeof content === "function"
              ? content(_id)
              : (content as ReactNode)}
          </Modal.Content>
        )}
        {actions && (
          <Modal.Actions>
            {typeof actions === "function"
              ? actions(_id)
              : (actions as ReactNode)}
          </Modal.Actions>
        )}
      </Modal.Container>
    </Modal>
  );
}

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
          {...(dialog as ComponentProps<typeof Dialog>)}
        />
      ))}
    </>
  );
}
