import { type HTMLAttributes, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { twJoin } from "tailwind-merge";
import type { CounterType } from "@/shared/types";
import { DeleteCounterButton } from "./delete-counter-button";

type CounterItemProps = HTMLAttributes<HTMLElement> & {
  counter: CounterType;
};

export const CounterItem = ({
  counter,
  className,
  ...props
}: CounterItemProps) => {
  const [isSwiped, setIsSwiped] = useState<boolean>(false);
  const { items, level, modification, date, icons, isMale } = counter;
  const total = items + level + modification;

  const handlers = useSwipeable({
    onSwipedLeft: () => setIsSwiped(true),
    onSwipedRight: () => setIsSwiped(false),
  });

  const iconClassName = isMale ? icons.male : icons.female;

  return (
    <article
      {...props}
      {...handlers}
      className={twJoin(
        "relative",
        "px-4 py-2 border-2 border-primary-500",
        "transition-transform duration-300",
        isSwiped && "-translate-x-17.5",
        className,
      )}
    >
      <div className="flex gap-3">
        <p className="text-lg">Сила: {total}</p>
        <InfoDivider />
        <p className="text-lg">Ур: {level}</p>
        <InfoDivider />
        <i className={twJoin(iconClassName, "self-center", "text-xl")} />
      </div>
      <time>{date}</time>

      <DeleteCounterButton
        counterId={counter.id}
        className="absolute top-1/2 -translate-y-1/2 left-[calc(100%+3rem)]"
      />
    </article>
  );
};

const InfoDivider = () => (
  <span className="self-center w-px h-6 bg-primary-500" />
);
