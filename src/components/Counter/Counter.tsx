type CounterProps = {
	title: string;
	value: number;
	increment: () => void;
	decrement: () => void;
	reset: () => void;
};

export const Counter = ({
	title,
	value,
	increment,
	decrement,
	reset,
}: CounterProps) => {
	const btnBase = "bg-transparent text-text cursor-pointer border border-primary-500";

	return (
		<div className="flex flex-col justify-center items-center gap-5">
			<div className="p-2.5 text-[50px]">{value}</div>
			<div className="flex items-center gap-2.5">
				<button
					type="button"
					className={`${btnBase} p-[8px_8px_6px_8px]`}
					onClick={decrement}
				>
					<i className="bx bxs-down-arrow" />
				</button>
				<h3 className="text-[18px] tracking-[1px]">{title}</h3>
				<button
					type="button"
					className={`${btnBase} p-[8px_8px_6px_8px]`}
					onClick={increment}
				>
					<i className="bx bxs-up-arrow" />
				</button>
			</div>
			<button
				type="button"
				className={`${btnBase} p-[8px_18px]`}
				onClick={reset}
			>
				Сброс
			</button>
		</div>
	);
};
