import { Counter } from "@/components/Counter";
import { useCounter } from "@/shared/hooks/use-counter";
import { useCounterId } from "@/shared/hooks/use-counter-id";
import { useCountersStore } from "@/store/counters-store";

export const Controls = () => {
	const id = useCounterId();

	const {
		incrementLevel,
		decrementLevel,
		resetLevel,
		incrementItems,
		decrementItems,
		resetItems,
	} = useCountersStore((store) => store);

	const { level, items } = useCounter();

	return (
		<div className="flex flex-wrap gap-0 justify-around">
			<Counter
				title={"Уровень"}
				value={level}
				increment={() => incrementLevel(id)}
				decrement={() => decrementLevel(id)}
				reset={() => resetLevel(id)}
			/>
			<Counter
				title={"Шмотки"}
				value={items}
				increment={() => incrementItems(id)}
				decrement={() => decrementItems(id)}
				reset={() => resetItems(id)}
			/>
		</div>
	);
};
