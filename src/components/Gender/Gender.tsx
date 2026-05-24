import { GenderButton } from "@/components/GenderButton";
import { IconsToggle } from "@/components/IconsToggle";

export const Gender = () => {
  return (
    <ul className="flex flex-col items-center justify-center gap-6.25 list-none">
      <li>
        <GenderButton />
      </li>
      <li>
        <IconsToggle />
      </li>
    </ul>
  );
};
