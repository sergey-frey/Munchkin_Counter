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

  const transitionStyles: Record<string, string> = {
    entering: "opacity-0 translate-y-[-10px] pointer-events-none",
    entered: "opacity-100 translate-y-0 transition-all duration-150 ease-in pointer-events-auto",
    exiting: "opacity-100 translate-y-0 pointer-events-auto",
    exited: "opacity-0 translate-y-[-10px] transition-all duration-150 ease-out pointer-events-none",
  };

  return (
    <Transition in={isOpen} timeout={150} nodeRef={modalRef}>
      {(state) => (
        <section
          className={clsx(
            "fixed inset-0 z-[100] w-[100dvw] h-[100dvh] bg-black/20 p-[25px] backdrop-blur-[8px]",
            transitionStyles[state],
          )}
          onClick={handleOverlayClick}
          ref={modalRef}
        >
          <button
            type="button"
            className="fixed top-[20px] right-[20px] w-[28px] h-[28px] grid place-items-center text-[23px] bg-transparent text-text cursor-pointer border border-primary-500"
            onClick={onClose}
          >
            <i className="bx bx-x" />
          </button>
          <section
            className="w-full max-w-[600px] mx-auto mt-[120px] bg-bg border border-primary-500 p-[20px_25px] text-[1rem] flex flex-col"
            data-id={"modal-window"}
          >
            {children}
          </section>
        </section>
      )}
    </Transition>
  );
};

Modal.Header = ({ children, className, ...props }: ModelSectionProps) => {
  return (
    <header
      {...props}
      className={clsx("text-[1.3rem] pb-[15px]", className)}
    >
      {children}
    </header>
  );
};

Modal.Body = ({ children, className, ...props }: ModelSectionProps) => {
  return (
    <section {...props} className={clsx(className)}>
      {children}
    </section>
  );
};

Modal.Footer = ({ children, className, ...props }: ModelSectionProps) => {
  return (
    <footer {...props} className={clsx("mt-auto", className)}>
      {children}
    </footer>
  );
};
