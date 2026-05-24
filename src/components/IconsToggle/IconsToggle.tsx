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
        hidden
      />
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <label
        className="iconsToggle"
        htmlFor="switchIcons"
        onClick={() => toggleIcons(id)}
      />
    </>
  );
};
