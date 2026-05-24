import { useState } from "react";
import { ProgressBar } from "@/components/ProgressBar";
import { random } from "@/shared/lib/random";

// Такой формат позволяет ререндерить компонент даже если random вернул такое же число
// Таким образом, например, обновляется прогресс
type RandomValue = {
  value: number | null;
};

const duration = 3000; // 2 sec

export const Random = () => {
  const [randomValue, setRandomValue] = useState<RandomValue>({ value: null });

  const getRandomValue = () => {
    setRandomValue({ value: random(1, 6) });
  };

  const resetRandomValue = () => {
    setRandomValue({ value: null });
  };

  return (
    <section className="flex items-center overflow-hidden">
      <button
        type="button"
        className="pt-[4px] border-none bg-transparent text-text text-[30px] cursor-pointer"
        onClick={getRandomValue}
      >
        <i className="bx bxs-dice-5" />
      </button>
      {randomValue.value && (
        <div className="fixed top-[50px] left-1/2 translate-x-[-50%] w-[80px] h-[80px] border border-primary-500 text-[40px] bg-bg grid place-items-center">
          <div className="grid place-items-center w-full h-full relative">
            {randomValue.value}
            <ProgressBar
              key={Date.now()}
              duration={duration}
              onFinish={resetRandomValue}
            />
          </div>
        </div>
      )}
    </section>
  );
};
