import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { SlideStepper } from "@/components/Tools/SlideStepper";
import { MagicCard } from "@/components/magicui/magic-card";
import butterflyhug from "@/assets/butterfly-hug.png"
import breathe1 from "@/assets/breathe-1.png"
import anchor from "@/assets/happy-moments.png"
import nervous from "@/assets/nervous-body.png"
import namaste from "@/assets/namaste.png"
import grounding from "@/assets/huh.png"
import breathe2 from "@/assets/breathe-2.png"
import bellybreathe from "@/assets/heart-hug.png"
import type { User } from "@/utils/types.ts";
import { useSelector } from "react-redux";

type Category =
  | "High Energy Unpleasant"
  | "Low Energy Unpleasant"
  | "High Energy Pleasant"
  | "Low Energy Pleasant";

const colorMapping: Record<Category, {
  primary: string;
  secondary: string;
  accent: string;
  glow: string;
}> = {
  "High Energy Unpleasant": {
    primary: "#bf1b1b",
    secondary: "#bd3636",
    accent: "#8c0000",
    glow: "#bd7171",
  },
  "Low Energy Unpleasant": {
    primary: "#1851d1",
    secondary: "#3276e4",
    accent: "#003b81",
    glow: "#729fd3",
  },
  "High Energy Pleasant": {
    primary: "#cc6e02",
    secondary: "#e49207",
    accent: "#9c7000",
    glow: "#e8c03f",
  },
  "Low Energy Pleasant": {
    primary: "#01875d",
    secondary: "#0ea875",
    accent: "#008c5a",
    glow: "#54bd94",
  },
};

interface TechniqueCard {
  title: string;
  description: string;
  src: string;
  category: Category;
  steps: { text: string; image?: string }[];
}

// const user=useSelector((store:{user:null|User})=>store.user);

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
    <>
      <div className="flex flex-col ml-16">
        <div className={`flex-1 overflow-y-auto py-10 ${active ? "overflow-hidden" : ""}`}>
          <div className="px-4 sm:px-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl italic font-bold pb-6">
              Welcome back, {user?.firstName ?? "Guest"}
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
              <div className="fixed inset-0 grid place-items-center z-[100]">
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
                  className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
                  onClick={() => setActive(null)}
                >
                  <CloseIcon />
                </motion.button>
                <motion.div
                  layoutId={`card-${active.title}-${id}`}
                  ref={ref}
                  className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
                >
                  <div>
                    <div className="flex justify-between items-start p-4">
                      <div className="">
                        <motion.h3
                          layoutId={`title-${active.title}-${id}`}
                          className="font-medium text-neutral-700 dark:text-neutral-200 text-base"
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
                        className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                      >
                        {active.steps && (
                          <>
                            <SlideStepper steps={active.steps} />
                          </>
                        )}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ) : null}
          </AnimatePresence>

          <ul className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-12">
            {cards.map((card, index) => {
              const colors = colorMapping[card.category];
              return (
                <MagicCard
                  key={card.title}
                  className="rounded-xl"
                  gradientSize={150}
                  gradientFrom={colors.primary}
                  gradientTo={colors.secondary}
                  gradientColor={colors.glow}
                  gradientOpacity={0.3}
                >
                  <motion.div
                    layoutId={`card-${card.title}-${id}`}
                    onClick={() => setActive(card)}
                    // className="p-4 flex flex-col s rounded-xl cursor-pointer"
                  >
                    <div className="flex gap-4 flex-col w-full">
                      <motion.div layoutId={`image-${card.title}-${id}`}>
                        <img
                          width={100}
                          height={100}
                          src={card.src}
                          alt={card.title}
                          className="h-60 w-full rounded-lg object-cover object-top"
                        />
                      </motion.div>
                      <div className="flex justify-center items-center flex-col">
                        <motion.h3
                          layoutId={`title-${card.title}-${id}`}
                          className="font-bold text-neutral-800 dark:text-neutral-200 text-center md:text-left text-xl"
                        >
                          {card.title}
                        </motion.h3>
                        <motion.p
                          layoutId={`category-${card.category}-${id}`}
                          className="text-neutral-600 dark:text-neutral-400 text-center md:text-left text-base"
                        >
                          {card.category}
                        </motion.p>
                      </div>
                    </div>
                  </motion.div>
                </MagicCard>
              );
            })}
          </ul>
        </div>
      </div>
    </>
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

const cards: TechniqueCard[] = [
  {
    title: "Emotional Freedom Technique",
    description: "",
    src: "https://zariyaa.in/wp-content/uploads/2020/07/Zariyaa-Home-Page-For-Corporates.svg",
    category: "High Energy Unpleasant",
    steps: [
      {
        text: "Identify the issue you want to address (e.g. I feel anxious).",
        image: "/images/tapping/step1.png",
      },
      {
        text: "Rate distress from 0–10.",
        image: "/images/tapping/step2.png",
      },
      {
        text: "Tap the side of your hand while saying: Even though I feel __, I deeply and completely accept myself.",
        image: "/images/tapping/step3.png",
      },
      {
        text: "Tap 5-7 times each- your eyebrow, side of eye, under eye, chin, collar bone, side of torso.",
        image: "/images/tapping/step4.png",
      },
      {
        text: "Repeat a reminder phrase (This anxiety, This Stress, etc) while tapping each point.",
        image: "/images/tapping/step5.png",
      },
      {
        text: "Take a deep breath, and then re-rate distress 0-10, repeat until distress is less than or 2.",
        image: "/images/tapping/step6.png",
      },
    ],
  },
  {
    title: "4-7-8 Breathing",
    description: "",
    src: breathe1,
    category: "Low Energy Unpleasant",
    steps: [
      {
        text: "Exhale fully through your mouth, making a whoosh.",
        image: "/images/478breathing/step1.png",
      },
      {
        text: "Close your mouth and inhale quietly through your nose for a count of 4.",
        image: "/images/478breathing/step2.png",
      },
      {
        text: "Hold your breath for a count of 7.",
        image: "/images/478breathing/step3.png",
      },
      {
        text: "Exhale completely through your mouth for a count of 8.",
        image: "/images/478breathing/step4.png",
      },
      {
        text: "Repeat cycle up to 4 times.",
        image: "/images/478breathing/step5.png",
      },
    ],
  },
  {
    title: "Square (Box) Breathing",
    description: "",
    src: breathe2,
    category: "Low Energy Unpleasant",
    steps: [
      {
        text: "Inhale through your nose for 4 counts.",
        image: "/images/squarebreathing/step1.png",
      },
      {
        text: "Hold for 4 counts.",
        image: "/images/squarebreathing/step2.png",
      },
      {
        text: "Exhale through your mouth for 4 counts.",
        image: "/images/squarebreathing/step3.png",
      },
      {
        text: "Hold for 4 counts.",
        image: "/images/squarebreathing/step4.png",
      },
      {
        text: "Repeat for 4–6 cycles.",
        image: "/images/squarebreathing/step5.png",
      },
    ],
  },
  {
    title: "Grounding (5-4-3-2-1)",
    description: "",
    src: grounding,
    category: "Low Energy Unpleasant",
    steps: [
      {
        text: "Identify 5 things you can see (e.g., a lamp, your hands).",
        image: "/images/grounding/step1.png",
      },
      {
        text: "Identify 4 things you can touch (e.g., your chair, your foot).",
        image: "/images/grounding/step2.png",
      },
      {
        text: "Identify 3 things you can hear (e.g., clock ticking, birds).",
        image: "/images/grounding/step3.png",
      },
      {
        text: "Identify 2 things you can smell (or two you like).",
        image: "/images/grounding/step4.png",
      },
      {
        text: "Identify 1 thing you can taste (or one you want).",
        image: "/images/grounding/step5.png",
      },
    ],
  },
  {
    title: "Anchoring Happy Emotions",
    description: "",
    src: anchor,
    category: "High Energy Pleasant",
    steps: [
      {
        text: "Recall a vivid positive memory.",
        image: "/images/anchoring/step1.png",
      },
      {
        text: "Notice where you feel it in your body.",
        image: "/images/anchoring/step2.png",
      },
      {
        text: "Apply pressure (e.g., pinch thumb and forefinger together).",
        image: "/images/anchoring/step3.png",
      },
      {
        text: "Hold the happy feeling for 10–15 seconds.",
        image: "/images/anchoring/step4.png",
      },
      {
        text: "Release the pinch and let feeling dissipate.",
        image: "/images/anchoring/step5.png",
      },
      {
        text: "Repeat 3 times to anchor the positive state.",
        image: "/images/anchoring/step6.png",
      },
    ],
  },
  {
    title: "Butterfly Hug",
    description: "",
    src: butterflyhug,
    category: "Low Energy Pleasant",
    steps: [
      {
        text: "Cross your arms over your chest.",
        image: "/images/butterflyhug/step1.png",
      },
      {
        text: "Place your hands on opposite upper arms.",
        image: "/images/butterflyhug/step2.png",
      },
      {
        text: "Alternately tap left then right shoulder gently.",
        image: "/images/butterflyhug/step3.png",
      },
      {
        text: "Breathe deeply and evenly.",
        image: "/images/butterflyhug/step4.png",
      },
      {
        text: "Continue for 1-2 minutes or until calm.",
        image: "/images/butterflyhug/step5.png",
      },
    ],
  },
  {
    title: "Progressive Muscle Relaxation",
    description: "",
    src: namaste,
    category: "Low Energy Pleasant",
    steps: [
      {
        text: "Find a quiet seat or lie down. Close eyes and inhale deeply.",
        image: "/images/pmr/step1.png",
      },
      {
        text: "Visualize golden light at your feet - feel warmth.",
        image: "/images/pmr/step2.png",
      },
      {
        text: "Scan upward: legs → hips → torso → arms → hands → neck → head.",
        image: "/images/pmr/step3.png",
      },
      {
        text: "At each area, tense muscles for 5 sec, then release, imagining golden light flooding and relaxing.",
        image: "/images/pmr/step4.png",
      },
      {
        text: "Finish with full-body glow, breathe slowly for 2 more breaths.",
        image: "/images/pmr/step5.png",
      },
    ],
  },
  {
    title: "Balloon Technique for Anger",
    description: "",
    src: "https://ci6.googleusercontent.com/proxy/CwXCbU5zoQ1XZ4UHFYjUi1NwqvefbndsidCeQxlxv9JNYfoZnF34YJ_2r6EROnFiMxitd6rf3bcTCncMYEvoMmyHVrR3X5rRX-N7dxeEerJ0L-ADhRFWTaT4Gw_TQrdTO7Lcf0SMHQenIR_TTDs=s0-d-e1-ft#https://bucket.mlcdn.com/a/3212/3212803/images/e8ba6627fa73aa0b6b9264e9b4cd6fbb11114b5f.png",
    category: "High Energy Unpleasant",
    steps: [
      {
        text: "Sit comfortably and close eyes.",
        image: "/images/balloon/step1.png",
      },
      {
        text: "Inhale and gather your anger/sadness into your belly.",
        image: "/images/balloon/step2.png",
      },
      {
        text: "Visualize a balloon in front of you.",
        image: "/images/balloon/step3.png",
      },
      {
        text: "Blow the balloon with your breath, filling it with your emotion.",
        image: "/images/balloon/step4.png",
      },
      {
        text: "Tie the balloon's neck firmly.",
        image: "/images/balloon/step5.png",
      },
      {
        text: "Watch it float away until it's out of sight.",
        image: "/images/balloon/step6.png",
      },
      {
        text: "Breathe deeply and open your eyes.",
        image: "/images/balloon/step7.png",
      },
    ],
  },
  {
    title: "Nervous System Body Shakes",
    description: "",
    src: nervous,
    category: "High Energy Unpleasant",
    steps: [
      {
        text: "Stand with feet hip-width apart.",
        image: "/images/bodyshakes/step1.png",
      },
      {
        text: "Relax knees slightly.",
        image: "/images/bodyshakes/step2.png",
      },
      {
        text: "Allow your body to shake or tremble gently.",
        image: "/images/bodyshakes/step3.png",
      },
      {
        text: "Let the movement start from your feet, travel up legs, torso, arms.",
        image: "/images/bodyshakes/step4.png",
      },
      {
        text: "Continue until shaking subsides (30 sec-2 min).",
        image: "/images/bodyshakes/step5.png",
      },
      {
        text: "Stand still, notice how you feel.",
        image: "/images/bodyshakes/step6.png",
      },
    ],
  },
  {
    title: "Belly Breathing",
    description: "",
    src: bellybreathe,
    category: "Low Energy Pleasant",
    steps: [
      {
        text: "Lie on your back or sit upright.",
        image: "/images/bellybreathing/step1.png",
      },
      {
        text: "Place one hand on your chest, one on your belly.",
        image: "/images/bellybreathing/step2.png",
      },
      {
        text: "Inhale through nose, directing air into your belly - feel your hand rise.",
        image: "/images/bellybreathing/step3.png",
      },
      {
        text: "Exhale through pursed lips, feel belly fall.",
        image: "/images/bellybreathing/step4.png",
      },
      {
        text: "Repeat for 1–2 minutes, keeping chest still.",
        image: "/images/bellybreathing/step5.png",
      },
    ],
  },
];

export default ExpandableCards;