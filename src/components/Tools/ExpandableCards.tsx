import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/utils/hooks/use-outside-click.tsx";
import { SlideStepper } from "@/components/Tools/SlideStepper";
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
        overflow-y-auto py-10
        ${active ? "overflow-hidden" : ""}`}
    >
        <div className="px-4 sm:px-6">
          <h1 className={'text-2xl sm:text-4xl lg:text-5xl font-bold p-4 sm:p-6 font-mynabali-serif'}>
            Need some help, <span className={'font-mynabali'}>{user?.firstName}</span>?
          </h1>
        </div>
          
        <AnimatePresence>
          {active && typeof active === "object" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 h-full w-full z-10"
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
                className="flex absolute top-6 right-6 sm:top-8 sm:right-8 items-center justify-center bg-white rounded-full h-8 w-8 shadow-lg z-10"
                onClick={() => setActive(null)}
              >
                <CloseIcon />
              </motion.button>
              <motion.div
                layoutId={`card-${active.title}-${id}`}
                ref={ref}
                className="w-full max-w-[500px] h-[60vh] max-h-[90vh] md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden py-6"
              >
                <div>
                  <div className="flex justify-center items-start p-4">
                    <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="text-2xl sm:text-3xl font-bold text-neutral-700 dark:text-neutral-200 text-base pt-sans-regular"
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
                      className="text-neutral-600 text-xs md:text-sm lg:text-base h-auto md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
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
          px-2 md:px-6 lg:px-8
          "
        >
          {cards.map((card, index) => {
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
                  // whileHover={{ scale: 1.05 }}
                  // whileTap={{ scale: 0.98 }}
                  // transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                   <div className="h-48 sm:h-56 md:h-64 lg:h-70 flex flex-col items-center justify-center p-4 sm:p-6">
                   <div className="flex-1"></div>
                    <motion.div 
                      layoutId={`image-${card.title}-${id}`} 
                      className="flex-shrink-0 mb-4"
                    >
                      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 flex items-center justify-center">
                        <div className="relative w-full h-full group">
                          <img
                            src={card.src}
                            alt={card.title}
                            className="w-full h-full object-contain absolute top-0 left-0 transition-opacity duration-300 ease-in-out group-hover:opacity-0"
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
                    <div className="flex-1 flex items-end justify-center pb-2">
                    <motion.h3
                      layoutId={`title-${card.title}-${id}`}
                      className="font-medium text-neutral-800 dark:text-neutral-200 text-center text-xs sm:text-sm md:text-base leading-tight pt-sans-regular"
                    >
                      {card.title}
                    </motion.h3>
                      <motion.p
                        layoutId={`category-${card.category}-${id}`}
                        className="text-neutral-600 dark:text-neutral-400 text-center md:text-left text-base"
                      >                          
                      </motion.p>
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

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

export default ExpandableCards;