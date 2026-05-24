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
      className={`${isMale ? "male " : "female "}btn`}
      onClick={() => toggleGender(id)}
    >
      <i className={isMale ? icons.male : icons.female} />
    </button>
  );
};
