import { useCounter } from "@/shared/hooks/use-counter";
import { useCounterId } from "@/shared/hooks/use-counter-id";
import { useCountersStore } from "@/store/counters-store";

export const GenderButton = () => {
  const { isMale, icons } = useCounter();
  const id = useCounterId();
  const toggleGender = useCountersStore((store) => store.toggleGender);

  return (
    <button
      type="button"
      className="grid items-center justify-center w-13.75 h-13.75 p-[8px_9px_6px_9px] bg-transparent text-text cursor-pointer border border-primary-500 text-[30px]"
      onClick={() => toggleGender(id)}
    >
      <i className={isMale ? icons.male : icons.female} />
    </button>
  );
};
