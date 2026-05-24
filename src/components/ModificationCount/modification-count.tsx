import { type ChangeEvent, useEffect, useRef, useState } from "react";
import { Input, Modal } from "@/components/ui";
import { useCounter } from "@/shared/hooks/use-counter";
import { useCounterId } from "@/shared/hooks/use-counter-id";
import { useCountersStore } from "@/store/counters-store";

export const ModificationCount = () => {
  const { setModification, resetModification } = useCountersStore(
    (store) => store,
  );
  const id = useCounterId();
  const { modification } = useCounter();

  const [inputValue, setInputValue] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpenModal && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpenModal]);

  const handleClickSideCountBtn = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setInputValue("");
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^-?\d*\.?\d*$/.test(value)) {
      setInputValue(value);
    }
  };

  const handleClickSaveCount = () => {
    setModification(id, Number(inputValue));
    handleCloseModal();
  };

  const handleClickResetCount = () => {
    resetModification(id);
    handleCloseModal();
  };

  return (
    <section className="side-count__wrapper">
      <button
        type="button"
        className="side-count__btn btn"
        onClick={handleClickSideCountBtn}
      >
        Модификаторы
      </button>
      <Modal
        isOpen={isOpenModal}
        onClose={handleCloseModal}
        onOverlayClick={handleCloseModal}
      >
        <Modal.Header>Модификаторы</Modal.Header>
        <Modal.Body className="side-count__modal__body">
          <Input
            placeholder={String(modification)}
            inputMode="numeric"
            className="side-count__modal__input"
            value={inputValue}
            onChange={handleChangeInput}
            ref={inputRef}
          />
        </Modal.Body>
        <Modal.Footer>
          <div className="side-count__modal__actions">
            <button
              type="button"
              className="btn"
              onClick={handleClickResetCount}
            >
              Сбросить
            </button>
            <button
              type="button"
              className="btn"
              onClick={handleClickSaveCount}
            >
              Сохранить
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </section>
  );
};
