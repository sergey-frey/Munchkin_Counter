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

const RACE_FONTS: Record<string, string> = {
  Эльф: "'Cinzel'",
  Дварф: "'Rye'",
  Хафлинг: "'Nunito'",
  Гном: "'VT323'",
  Орк: "'Oswald'",
};

const RACE_COLORS: Record<string, string> = {
  Эльф: "#86efac",
  Дварф: "#fbbf24",
  Хафлинг: "#d97706",
  Гном: "#22d3ee",
  Орк: "#a3e635",
};

const RACE_EXTRAS: Record<string, { letterSpacing?: string; fontWeight?: string }> = {
  Гном: { letterSpacing: "0.06em" },
  Орк: { letterSpacing: "0.1em", fontWeight: "700" },
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

    // Combine all active race fonts into a single stack
    const fonts = races.map((r) => RACE_FONTS[r]).filter(Boolean);
    document.body.style.fontFamily =
      fonts.length > 0 ? `${fonts.join(", ")}, monospace` : "";

    // Primary race (first) determines the text color
    const color = races.map((r) => RACE_COLORS[r]).find(Boolean) ?? "";
    if (color) {
      document.body.style.setProperty("--textColor", color);
    } else {
      document.body.style.removeProperty("--textColor");
    }

    // Extra styles (letter-spacing, font-weight) from first matching race
    const extras = races.map((r) => RACE_EXTRAS[r]).find(Boolean) ?? {};
    document.body.style.letterSpacing = extras.letterSpacing ?? "";
    document.body.style.fontWeight = extras.fontWeight ?? "";

    return () => {
      document.body.style.fontFamily = "";
      document.body.style.removeProperty("--textColor");
      document.body.style.letterSpacing = "";
      document.body.style.fontWeight = "";
    };
  }, [raceKey]);

  // Each active class gets its own overlay div (portaled into body, below #root)
  const patternOverlays = classKey
    ? classKey.split(",").map((c) => CLASS_PATTERNS[c]).filter(Boolean)
    : [];

  return (
    <div className="App">
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
