import { CLASS_LIST } from "@/shared/constants";
import { useCounter } from "@/shared/hooks/use-counter";
import { useCounterId } from "@/shared/hooks/use-counter-id";
import type { ClassType } from "@/shared/types";
import { useCountersStore } from "@/store/counters-store";
import { InfoMenu } from "./info-menu";

export const Class = () => {
  const id = useCounterId();
  const { classes } = useCounter();
  const setClass = useCountersStore((state) => state.setClass);

  const classesValue = classes.length === 0 ? ["(нет класса)"] : classes;

  const handleChange = (value: ClassType, isChecked: boolean) => {
    let newRace: ClassType[] = [];

    if (isChecked) {
      newRace = [...classes, value];
    } else {
      newRace = classes.filter((r) => r !== value);
    }

    setClass(id, newRace);
  };

  return (
    <InfoMenu items={CLASS_LIST} value={classesValue} onChange={handleChange} />
  );
};
