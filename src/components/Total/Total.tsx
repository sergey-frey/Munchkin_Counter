import { Gender } from "@/components/Gender";
import { useCounter } from "@/shared/hooks/use-counter";

export const Total = () => {
	const { level, items, modification } = useCounter();

	const isShowModification = modification !== 0;
	const modificationSymbol = modification > 0 ? "+" : "";

	return (
		<div className="flex flex-col justify-center items-center gap-[10px] z-[1]">
			<div className="relative text-[100px]">
				{isShowModification && (
					<div className="absolute top-[-10px] right-[-35px] text-[1.3rem] bg-primary-500 text-bg p-[3px_7px] font-[600] rounded-[7px]">
						{modificationSymbol}
						{modification}
					</div>
				)}
				<div className="max-w-[90vw] overflow-x-auto">{level + items + modification}</div>
			</div>
			<Gender />
		</div>
	);
};
