import { useCallback, useMemo, useState } from "react";

export default function useModalState() {
  let [modalOpen, setModalOpen] = useState(false);
  let handleModalToggle = useCallback(() => setModalOpen((open) => !open), []);
  let handleModalOpen = useCallback(() => setModalOpen(true), []);
  let handleModalClose = useCallback(() => setModalOpen(false), []);

  return useMemo(
    () =>
      [
        modalOpen,
        {
          setModalOpen,
          openModal: handleModalOpen,
          closeModal: handleModalClose,
          toggleModal: handleModalToggle,
        },
      ] as const,
    [handleModalClose, handleModalOpen, handleModalToggle, modalOpen]
  );
}
