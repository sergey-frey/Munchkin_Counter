import { PlusIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { twJoin } from "tailwind-merge";
import { getDefaultCounter, useCountersStore } from "@/store/counters-store";

export const AddCounterButton = () => {
  const addCounter = useCountersStore((store) => store.add);
  const navigate = useNavigate();

  const handleClickAddCounter = () => {
    const newCounter = getDefaultCounter();
    addCounter(newCounter);
    navigate(`counter/${newCounter.id}`);
  };

  return (
    <button
      type="button"
      className={twJoin(
        "fixed bottom-5 right-5",
        "grid place-items-center w-12 h-12",
        "border-2 border-primary-500 text-primary-500",
      )}
      onClick={handleClickAddCounter}
    >
      <span className="sr-only">Add counter</span>
      <PlusIcon className="w-7 h-7" />
    </button>
  );
};
