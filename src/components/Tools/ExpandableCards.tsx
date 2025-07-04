import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/utils/hooks/use-outside-click.tsx";
import SlideStepper from "@/components/Tools/SlideStepper";
import { MagicCard } from "@/components/magicui/magic-card";
import { cards } from "@/components/Tools/Cards";
import type { User } from "@/utils/types.ts";
import { useSelector } from "react-redux";
import type { TechniqueCard, Category } from "@/utils/types";
import {
  highEnergyPleasantAccent,
  highEnergyPleasantGlow,
  highEnergyPleasantPrimary,
  highEnergyPleasantSecondary,
  highEnergyUnpleasantAccent,
  highEnergyUnpleasantGlow,
  highEnergyUnpleasantPrimary,
  highEnergyUnpleasantSecondary,
  lowEnergyPleasantAccent,
  lowEnergyPleasantGlow,
  lowEnergyPleasantPrimary,
  lowEnergyPleasantSecondary,
  lowEnergyUnpleasantAccent,
  lowEnergyUnpleasantGlow,
  lowEnergyUnpleasantPrimary,
  lowEnergyUnpleasantSecondary
} from "@/utils/constants";
import { X } from "lucide-react";

const colorMapping: Record<Category, {
  primary: string;
  secondary: string;
  accent: string;
  glow: string;
}> = {
  "High Energy Unpleasant": {
    primary: highEnergyUnpleasantPrimary,
    secondary: highEnergyUnpleasantSecondary,
    accent: highEnergyUnpleasantAccent,
    glow: highEnergyUnpleasantGlow,
  },
  "Low Energy Unpleasant": {
    primary: lowEnergyUnpleasantPrimary,
    secondary: lowEnergyUnpleasantSecondary,
    accent: lowEnergyUnpleasantAccent,
    glow: lowEnergyUnpleasantGlow,
  },
  "High Energy Pleasant": {
    primary: highEnergyPleasantPrimary,
    secondary: highEnergyPleasantSecondary,
    accent: highEnergyPleasantAccent,
    glow: highEnergyPleasantGlow,
  },
  "Low Energy Pleasant": {
    primary: lowEnergyPleasantPrimary,
    secondary: lowEnergyPleasantSecondary,
    accent: lowEnergyPleasantAccent,
    glow: lowEnergyPleasantGlow,
  },
};

export function ExpandableCards() {
  const user = useSelector((store: { user: User | null }) => store.user);
  const [active, setActive] = useState<TechniqueCard | boolean | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <div
      className={`
        w-full
        flex flex-col items-start justify-start
        min-h-screen
        overflow-y-auto py-6 sm:py-10
        ${active ? "overflow-hidden" : ""}`}
    >

          <h1 className={'text-2xl sm:text-4xl lg:text-5xl font-bold p-5 sm:px-10 sm:py-7 font-mynabali-serif'}>
            Need some help, <span className={'font-mynabali'}>{user?.firstName}</span>?
          </h1>

          
        <AnimatePresence>
          {active && typeof active === "object" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-lg h-full w-full z-10"
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {active && typeof active === "object" ? (
            <div className="fixed inset-4 sm:inset-0 p-4 sm:p-8 grid place-items-center z-[100]">
              <motion.button
                key={`button-${active.title}-${id}`}
                layout
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                  transition: {
                    duration: 0.05,
                  },
                }}
                className="flex absolute top-6 -right-2 sm:top-8 sm:right-8 items-center justify-center  rounded-full h-10 w-10 shadow-lg z-10 cursor-pointer "
                onClick={() => setActive(null)}
              >
                <X />
              </motion.button>
              <motion.div
                layoutId={`card-${active.title}-${id}`}
                ref={ref}
                className="w-full max-w-[500px] h-[60vh] max-h-[90vh] md:h-fit md:max-h-[90%] flex flex-col bg-zinc-100 dark:bg-zinc-900 rounded-xl sm:rounded-3xl overflow-hidden py-6"
              >
                <div>
                  <div className="flex justify-center items-start p-4">
                    <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="text-center text-2xl sm:text-3xl font-bold text-zinc-700 dark:text-zinc-200 pt-sans-regular"
                    > 
                      {active.title}
                    </motion.h3>

                    </div>
                  </div>
                  <div className="pt-4 relative px-4">
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-zinc-600 text-xs md:text-sm lg:text-base h-auto md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-zinc-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                    >
                      {active.steps && (
                          <SlideStepper 
                            steps={active.steps} 
                            cardTitle={active.title}
                          />
                      )}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : null}
        </AnimatePresence>

        <ul 
          className="
          w-full 
          grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
          gap-4 
          px-10 pb-12 md:p-6 lg:p-8
          "
        >
          {cards.map((card) => {
            const colors = colorMapping[card.category];
            return (
              <motion.div
                key={card.title}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="rounded-xl"         
              >
              <MagicCard
                key={card.title}
                className="rounded-xl"
                gradientSize={250}
                gradientFrom={colors.primary}
                gradientTo={colors.secondary}
                gradientColor={colors.accent}
                gradientOpacity={0.7}
              >

                <motion.div
                  layoutId={`card-${card.title}-${id}`}
                  onClick={() => setActive(card)}
                  className="cursor-pointer"  
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                   <div className="h-44 sm:h-56 md:h-64 lg:h-70 flex flex-col  items-center  p-4 sm:p-6 space-y-4">
                    <motion.div 
                      layoutId={`image-${card.title}-${id}`} 
                      className="flex-shrink-0 "
                    >
                      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 flex items-center justify-center my-2">
                        <div className="relative w-full h-full group">
                          <img
                            src={card.src}
                            alt={card.title}
                            className="w-full h-full object-contain   absolute top-0 left-0 transition-opacity duration-300 ease-in-out group-hover:opacity-0"
                          />
                          {card.afterSrc && (
                            <img
                              src={card.afterSrc}
                              alt={`${card.title} after`}
                              className="w-full h-full object-contain absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                            />
                          )}
                        </div>

                      </div>
                    </motion.div>
                    <div className="flex-1 flex items-center justify-center ">
                    <motion.h3
                      layoutId={`title-${card.title}-${id}`}
                      className="font-medium text-zinc-800 dark:text-zinc-200 text-center text-base sm:text-lg md:text-xl leading-tight pt-sans-regular"
                    >
                      {card.title}
                    </motion.h3>
                    </div>
                  </div>
                </motion.div>
              </MagicCard>
              </motion.div>
            );
          })}
        </ul>
    </div>
  );
}



export default ExpandableCards;