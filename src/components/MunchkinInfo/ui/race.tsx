import { RACE_LIST } from "@/shared/constants";
import { useCounter } from "@/shared/hooks/use-counter";
import { useCounterId } from "@/shared/hooks/use-counter-id";
import type { RaceType } from "@/shared/types";
import { useCountersStore } from "@/store/counters-store";
import { InfoMenu } from "./info-menu";

export const Race = () => {
  const id = useCounterId();
  const { race } = useCounter();
  const setRace = useCountersStore((state) => state.setRace);

  const handleChange = (value: RaceType, isChecked: boolean) => {
    let newRace: RaceType[] = [];
    if (isChecked) {
      newRace = [...race, value];
    } else {
      newRace = race.filter((r) => r !== value);
    }

    if (newRace.length === 0) {
      newRace = ["Человек"];
    }

    setRace(id, newRace);
  };

  return <InfoMenu items={RACE_LIST} value={race} onChange={handleChange} />;
};
