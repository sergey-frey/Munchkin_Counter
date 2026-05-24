import { useCounter } from "@/shared/hooks/use-counter";
import { useCounterId } from "@/shared/hooks/use-counter-id";
import { useCountersStore } from "@/store/counters-store";

export const IconsToggle = () => {
  const id = useCounterId();
  const { icons } = useCounter();
  const toggleIcons = useCountersStore((store) => store.toggleIcons);

  return (
    <>
      <input
        type="checkbox"
        id="switchIcons"
        defaultChecked={icons.type === 1}
        className="peer"
        hidden
      />
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <label
        className="relative block w-[55px] h-[26px] bg-primary-500 rounded-[20px] cursor-pointer
                   before:content-[''] before:absolute before:top-[2px] before:left-[2px] before:w-[22px] before:h-[22px] before:rounded-full before:bg-bg before:transition-[left] before:duration-200
                   peer-checked:before:left-[31px]"
        htmlFor="switchIcons"
        onClick={() => toggleIcons(id)}
      />
    </>
  );
};
