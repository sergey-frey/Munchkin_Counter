import dayjs from "dayjs";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { storageConfig } from "@/config/storageConfig";

type BirthdayStore = {
  birthday: boolean;
  check: () => void;
};

const birthdayAlias: storageConfig = storageConfig.birthdayAlias;

const getInitialCheckedStatus = () => {
  const isApril = dayjs().month() === 3;
  const is9th = dayjs().date() === 9;
  const isBirthday = isApril && is9th;

  if (!isBirthday) return true;

  return false;
};

export const useBirthdayStore = create<BirthdayStore>()(
  persist(
    (set) => ({
      birthday: getInitialCheckedStatus(),
      check: () => set({ birthday: true }),
    }),
    {
      name: birthdayAlias,
    },
  ),
);
