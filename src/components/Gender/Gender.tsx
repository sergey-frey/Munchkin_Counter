import { GenderButton } from "@/components/GenderButton";
import { IconsToggle } from "@/components/IconsToggle";

export const Gender = () => {
  return (
    <ul className="options">
      <li>
        <GenderButton />
      </li>
      <li>
        <IconsToggle />
      </li>
    </ul>
  );
};
