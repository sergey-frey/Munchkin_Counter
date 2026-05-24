import { TrashIcon } from "@heroicons/react/24/outline";
import type { ButtonHTMLAttributes, MouseEvent } from "react";
import { twJoin } from "tailwind-merge";
import { useCountersStore } from "@/store/counters-store";

type DeleteCounterButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  counterId: string;
};

export const DeleteCounterButton = ({
  counterId,
  className,
  onClick,
  ...props
}: DeleteCounterButtonProps) => {
  const removeCounter = useCountersStore((store) => store.remove);
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    if (onClick) {
      onClick(e);
    }
    removeCounter(counterId);
  };

  return (
    <button
      {...props}
      type="button"
      className={twJoin("text-danger-500", className)}
      onClick={handleClick}
    >
      <TrashIcon className="w-6 h-6" />
    </button>
  );
};
