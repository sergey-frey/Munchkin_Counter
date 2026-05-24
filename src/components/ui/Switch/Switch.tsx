import { Switch } from "@headlessui/react";
import type { HTMLAttributes } from "react";
import { twJoin } from "tailwind-merge";

type MCSwitchProps = {
	checked: boolean;
	onChangeToggle?: (checked: boolean) => void;
	srText?: string;
} & HTMLAttributes<HTMLElement>;

export const MCSwitch = ({
	checked = true,
	srText = "Switch",
	onChangeToggle,
	className,
	...props
}: MCSwitchProps) => {
	return (
		<Switch
			{...props}
			checked={checked}
			onChange={onChangeToggle}
			className={twJoin(
				"rounded-full bg-neutral-900 border border-primary-500 outline-none transition-colors",
				"w-11 h-5.5 relative",
				checked && "bg-primary-500",
				className,
			)}
		>
			<span className="sr-only">{srText}</span>
			<span
				className={twJoin(
					"absolute left-1 top-1",
					"inline-block h-3 w-3 transform rounded-full bg-primary-500 transition-all",
					checked && "left-6! bg-neutral-900!",
				)}
			/>
		</Switch>
	);
};
