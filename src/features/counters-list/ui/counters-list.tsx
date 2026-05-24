import type { HTMLAttributes } from "react";
import { NavLink } from "react-router-dom";
import { twJoin } from "tailwind-merge";
import { useCountersStore } from "@/store/counters-store";
import { CounterItem } from "./counter-item";

type CountersListProps = HTMLAttributes<HTMLUListElement>;

export const CountersList = ({ className, ...props }: CountersListProps) => {
  const counters = useCountersStore((store) => store.counters);

  return (
    <ul
      {...props}
      className={twJoin("grid gap-3 overflow-x-hidden", className)}
    >
      {counters.map((counter) => {
        return (
          <NavLink to={`counter/${counter.id}`} key={counter.id}>
            <CounterItem counter={counter} />
          </NavLink>
        );
      })}
    </ul>
  );
};
