import { useCallback, useMemo, useState } from "react";

export default function useModalState() {
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalToggle = useCallback(
    () => setModalOpen((open) => !open),
    [],
  );
  const handleModalOpen = useCallback(() => setModalOpen(true), []);
  const handleModalClose = useCallback(() => setModalOpen(false), []);

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
    [handleModalClose, handleModalOpen, handleModalToggle, modalOpen],
  );
}
