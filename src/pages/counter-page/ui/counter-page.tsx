import { useEffect } from "react";
import { createPortal } from "react-dom";
import { twJoin } from "tailwind-merge";
import { Birthday } from "@/components/Birthday";
import { Controls } from "@/components/Controls";
import { Drawer } from "@/components/Drawer";
import { SideCount } from "@/components/ModificationCount";
import { Class, Race } from "@/components/MunchkinInfo";
import { Random } from "@/components/Random";
import { Total } from "@/components/Total";
import { useCounter } from "@/shared/hooks/use-counter";

const hexToRgb = (hex: string): [number, number, number] => {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

const mixColors = (colors: string[]): string => {
  const [r, g, b] = colors
    .map(hexToRgb)
    .reduce(([ar, ag, ab], [r, g, b]) => [ar + r, ag + g, ab + b], [0, 0, 0])
    .map((c) => Math.round(c / colors.length));
  return `rgb(${r},${g},${b})`;
};

const RACE_COLORS: Record<string, string> = {
  Эльф: "#6aab87",
  Дварф: "#b8965a",
  Хафлинг: "#c47060",
  Гном: "#4fa8b8",
  Орк: "#7aa040",
};

const CLASS_PATTERNS: Record<string, string> = {
  Воин: "pattern-warrior",
  Волшебник: "pattern-wizard",
  Вор: "pattern-rogue",
  Клирик: "pattern-cleric",
  Бард: "pattern-bard",
};

export const CounterPage = () => {
  const currentCounterState = useCounter();

  const raceKey = (currentCounterState?.race ?? []).join(",");
  const classKey = (currentCounterState?.classes ?? []).join(",");

  useEffect(() => {
    const races = raceKey ? raceKey.split(",") : [];

    const activeColors = races.map((r) => RACE_COLORS[r]).filter(Boolean);
    if (activeColors.length > 0) {
      document.body.style.setProperty("--color-text", mixColors(activeColors));
    } else {
      document.body.style.removeProperty("--color-text");
    }

    return () => {
      document.body.style.fontFamily = "";
      document.body.style.removeProperty("--color-text");
      document.body.style.letterSpacing = "";
      document.body.style.fontWeight = "";
    };
  }, [raceKey]);

  // Each active class gets its own overlay div (portaled into body, below #root)
  const patternOverlays = classKey
    ? classKey
        .split(",")
        .map((c) => CLASS_PATTERNS[c])
        .filter(Boolean)
    : [];

  return (
    <div className="flex flex-col gap-0 justify-around h-150 w-full max-w-175">
      {patternOverlays.map((cls) =>
        createPortal(
          <div className={`pattern-overlay ${cls}`} aria-hidden="true" />,
          document.body,
          cls,
        ),
      )}
      <header
        className={twJoin(
          "fixed top-0 left-0 w-full",
          "grid z-10 gap-3",
          "px-5 py-4",
        )}
      >
        <div className={twJoin("flex justify-between items-center")}>
          <SideCount />
          <Random />
        </div>
        <div className="grid justify-between">
          <Race />
          <Class />
        </div>
      </header>
      <Total />
      <Controls />
      <Birthday />
      <Drawer />
    </div>
  );
};
