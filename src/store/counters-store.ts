import dayjs from "dayjs";
import { nanoid } from "nanoid";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  ClassType,
  CounterType,
  IconsSet,
  RaceType,
} from "@/shared/types";

type CountersStore = {
  counters: CounterType[];
  add: (counter: CounterType) => void;
  remove: (id: string) => void;
  getById: (id: string) => CounterType | undefined;

  updateCounterField: <T extends CounterType[keyof CounterType]>(
    id: string,
    field: keyof CounterType,
    update: (prev: T) => T,
  ) => void;

  incrementItems: (id: string) => void;
  decrementItems: (id: string) => void;
  resetItems: (id: string) => void;

  incrementLevel: (id: string) => void;
  decrementLevel: (id: string) => void;
  resetLevel: (id: string) => void;

  setModification: (id: string, modification: number) => void;
  resetModification: (id: string) => void;

  toggleGender: (id: string) => void;
  toggleIcons: (id: string) => void;

  setRace: (id: string, race: RaceType[]) => void;
  setClass: (id: string, classType: ClassType[]) => void;
};

export const useCountersStore = create<CountersStore>()(
  persist(
    (set, get) => ({
      counters: [],
      add: (counter) =>
        set((store) => ({
          counters: [...store.counters, counter],
        })),
      remove: (id) =>
        set((store) => ({
          counters: store.counters.filter((counter) => counter.id !== id),
        })),
      getById: (id) => get().counters.find((counter) => counter.id === id),

      updateCounterField: (id, field, update) => {
        const counter = get().getById(id);
        if (!counter) return;
        set({
          counters: [...get().counters].map((c) =>
            c.id === id ? { ...c, [field]: update(c[field]) } : c,
          ),
        });
      },

      incrementItems: (id) => {
        get().updateCounterField<number>(id, "items", (prev) => prev + 1);
      },
      decrementItems: (id) => {
        get().updateCounterField<number>(id, "items", (prev) => prev - 1);
      },
      resetItems: (id) => {
        get().updateCounterField<number>(id, "items", () => 0);
      },

      incrementLevel: (id) => {
        get().updateCounterField<number>(id, "level", (prev) => prev + 1);
      },
      decrementLevel: (id) => {
        get().updateCounterField<number>(id, "level", (prev) =>
          Math.max(1, prev - 1),
        );
      },
      resetLevel: (id) => {
        get().updateCounterField<number>(id, "level", () => 1);
      },

      setModification: (id, modification) => {
        get().updateCounterField<number>(
          id,
          "modification",
          () => modification,
        );
      },

      resetModification: (id) => {
        get().updateCounterField<number>(id, "modification", () => 0);
      },

      toggleGender: (id) => {
        get().updateCounterField<boolean>(id, "isMale", (prev) => !prev);
      },

      toggleIcons: (id) => {
        get().updateCounterField<IconsSet>(id, "icons", (prev) => {
          if (prev.type === 1) {
            return {
              type: 2,
              male: "bx bx-male-sign",
              female: "bx bx-female-sign",
            };
          }

          return {
            type: 1,
            male: "bx bx-male",
            female: "bx bx-female",
          };
        });
      },

      setRace: (id, race) => {
        get().updateCounterField<RaceType[]>(id, "race", () => race);
      },
      setClass: (id, classType) => {
        get().updateCounterField<ClassType[]>(id, "classes", () => classType);
      },
    }),
    {
      name: "counters",
    },
  ),
);

export const getDefaultCounter = (): CounterType => {
  return {
    id: nanoid(),
    items: 0,
    level: 1,
    modification: 0,
    isMale: true,
    icons: { type: 1, male: "bx bx-male", female: "bx bx-female" },
    date: dayjs().format("DD.MM.YYYY"),
    race: ["Человек"],
    classes: [],
  };
};
