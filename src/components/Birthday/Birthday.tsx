import { motion } from "framer-motion";
import { useBirthdayStore } from "@/store/birthdayStore";

export const Birthday = () => {
  const { birthday, check } = useBirthdayStore();

  if (birthday) return null;

  const handleClick = () => {
    check();
  };

  return (
    <article className="fixed inset-0 w-full h-dvh flex flex-col p-5 bg-[#FAEDCD] font-['Kelly_Slab',sans-serif] text-black z-10 tracking-[0.5px] leading-[130%]">
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{
          x: 0,
          opacity: 1,
        }}
      >
        <h1>Привет. Я Ларри 📱</h1>
        <p className="mt-2.5 text-[0.9rem]">
          Да, у бежевого экрана есть имя. Какие-то проблемы?
        </p>
      </motion.div>

      <motion.p
        className="mt-3.25 text-[1rem]"
        initial={{
          x: 200,
          opacity: 0,
        }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        Понимаю ваше недоумение. Если по какой-то причине вы решили зайти сюда,
        то это значит лишь одно!
      </motion.p>

      <motion.p
        className="mt-3.25 text-[1rem]"
        initial={{
          x: 200,
          opacity: 0,
        }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Или другое. Не важно.
      </motion.p>

      <motion.p
        className="mt-3.25 text-[1rem]"
        initial={{
          x: 200,
          opacity: 0,
        }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Я не отниму у вас много времени. Сегодня вы видите меня по одной
        простой, но бесконечно важной причине - у <b>Лизоньки</b> день рождения!
      </motion.p>

      <motion.p
        className="mt-3.25 text-[1rem]"
        initial={{
          x: 200,
          opacity: 0,
        }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Все мы знаем <b>Лизоньку</b>. Да ведь? (если нет - встал и вышел
        отседова) Светлый и прекрасный человечек, озаряющий светом всех
        окружающих её людей.
      </motion.p>

      <motion.p
        className="mt-3.25 text-[1rem]"
        initial={{
          x: 200,
          opacity: 0,
        }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Давайте поздравим её с этим замечательным днём. Я люблю тебя,{" "}
        <b>Шарапова Елизавета Андреевна</b> 💖 <br /> (Бежевые экраны тоже могут
        любить)
      </motion.p>

      <motion.button
        type="button"
        className="mt-auto w-full border-none outline-none p-2.5 text-white bg-[#a9ba70] rounded-1.5 font-['Kelly_Slab',sans-serif] tracking-[0.5px]"
        onClick={handleClick}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        С днём рождения! 🎉
      </motion.button>
    </article>
  );
};
