import clsx from "clsx";
import {
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
  useRef,
} from "react";
import { Transition } from "react-transition-group";

type ModelSectionProps = HTMLAttributes<HTMLElement>;
type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onOverlayClick: () => void;
};

export const Modal = ({
  children,
  isOpen,
  onClose,
  onOverlayClick,
}: ModalProps) => {
  const modalRef = useRef(null);

  const handleOverlayClick = (e: MouseEvent<HTMLElement>) => {
    if (!(e.target instanceof HTMLElement)) return;

    const isModal = e.target.closest("[data-id=modal-window]");

    if (isModal) {
      return;
    }

    onOverlayClick();
  };

  return (
    <Transition
      in={isOpen}
      timeout={150}
      classNames={"modal"}
      nodeRef={modalRef}
    >
      {(state) => (
        <section
          className={clsx("modal__overlay", `modal-${state}`)}
          onClick={handleOverlayClick}
          ref={modalRef}
        >
          <button type="button" className="modal__close btn" onClick={onClose}>
            <i className="bx bx-x" />
          </button>
          <section className="modal__window" data-id={"modal-window"}>
            {children}
          </section>
        </section>
      )}
    </Transition>
  );
};

Modal.Header = ({ children, className, ...props }: ModelSectionProps) => {
  return (
    <header {...props} className={clsx("modal__header", className)}>
      {children}
    </header>
  );
};

Modal.Body = ({ children, className, ...props }: ModelSectionProps) => {
  return (
    <section {...props} className={clsx("modal__body", className)}>
      {children}
    </section>
  );
};

Modal.Footer = ({ children, className, ...props }: ModelSectionProps) => {
  return (
    <footer {...props} className={clsx("modal__footer", className)}>
      {children}
    </footer>
  );
};
