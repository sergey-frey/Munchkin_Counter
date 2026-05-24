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

  const btnBase = "bg-transparent text-text cursor-pointer border border-primary-500";

  return (
    <section>
      <button
        type="button"
        className={`${btnBase} p-[8px_10px] tracking-[1px]`}
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
        <Modal.Body className="pb-[15px]">
          <Input
            placeholder={String(modification)}
            inputMode="numeric"
            className="w-full text-[1.1rem]"
            value={inputValue}
            onChange={handleChangeInput}
            ref={inputRef}
          />
        </Modal.Body>
        <Modal.Footer>
          <div className="flex gap-[7px] justify-end">
            <button
              type="button"
              className={`${btnBase} p-[6px_8px] text-[0.9rem]`}
              onClick={handleClickResetCount}
            >
              Сбросить
            </button>
            <button
              type="button"
              className={`${btnBase} p-[6px_8px] text-[0.9rem]`}
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
