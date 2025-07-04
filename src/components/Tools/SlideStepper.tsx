import { useState } from "react";
import { motion } from "framer-motion";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { FiRepeat } from "react-icons/fi";
import {ChevronLeft, ChevronRight} from "lucide-react";

interface Step {
  text: string;
  image?: string;
}

interface SlideStepperProps {
  steps: Step[];
  cardTitle: string;
}

function SlideStepper({ steps, cardTitle }: SlideStepperProps) {
  const [index, setIndex] = useState(0);
  const next = () => setIndex(i => Math.min(i + 1, steps.length - 1));
  const prev = () => setIndex(i => Math.max(i - 1, 0));

const WhooshExhale = () => {
  const lineData = [
    { x1: 70, y1: 100, x2: 20, y2: 30 },
    { x1: 100, y1: 100, x2: 100, y2: 20 },
    { x1: 130, y1: 100, x2: 180, y2: 30 }
  ];
  return (
    <svg width={200} height={120} className="mx-auto">
      {lineData.map((line, i) => (
        <motion.line
          key={i}
          x1={line.x1}
          y1={line.y1}
          x2={line.x1}
          y2={line.y1}
          stroke="#0b29ee"
          strokeWidth={10}
          strokeLinecap="round"
          animate={{ x2: line.x2, y2: line.y2 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.08 }}
        />
      ))}
    </svg>
  );
};

  // 4-7-8 Breathing animation
  const Breathing478 = () => {
    const step = index + 1;
    if (step === 1) {
        return (
          <div className="flex flex-col items-center gap-4">
            <WhooshExhale />
          </div>
        );
      }
    if (step >= 2 && step <= 4) {
      const duration = step === 2 ? 4 : step === 3 ? 7 : 8;
      return (
        <div className="relative w-36 h-36 mx-auto">
          <CountdownCircleTimer
            key={index}
            isPlaying
            duration={duration}
            strokeWidth={6}
            size={144}
            colors="#0b29ee"
            trailColor="#e5e5e5"
            onComplete={() => { next(); return { shouldRepeat: false }; }}
          >
            {({ remainingTime }) => <div className="text-3xl font-bold">{remainingTime}</div>}
          </CountdownCircleTimer>
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center gap-2">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
          <FiRepeat size={48} />
        </motion.div>
        <div className="text-lg font-bold">4×</div>
      </div>
    );
  };

  // Breathing animation 
  const BoxBreathing = () => {
    const step = index;
    const cycle = step % 4;
    const edgeMap = [
      { x1: 0, y1: 200, x2: 0, y2: 200, x2to: 0, y2to: 0 },
      { x1: 0, y1: 0, x2: 0, y2: 0, x2to: 200, y2to: 0 },
      { x1: 200, y1: 0, x2: 200, y2: 0, x2to: 200, y2to: 200 },
      { x1: 200, y1: 200, x2: 200, y2: 200, x2to: 0, y2to: 200 },
    ];

    if (step >= steps.length - 1) {
      return (
        <div className="flex flex-col items-center gap-2">
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
            <FiRepeat size={48} />
          </motion.div>
          <div className="text-lg font-bold">4x-6x</div>
        </div>
      );
    }

    const edge = edgeMap[cycle];

    return (
      <div className="relative w-[200px] h-[200px] mx-auto flex items-center justify-center scale-80">
        <svg width={200} height={200} className="absolute top-0 left-0">
          <rect x={0} y={0} width={200} height={200} fill="none" stroke="#ccc" strokeWidth={2} />
          <motion.line
            x1={edge.x1}
            y1={edge.y1}
            x2={edge.x2}
            y2={edge.y2}
            stroke="#0b29ee"
            strokeWidth={4}
            animate={{ x2: edge.x2to, y2: edge.y2to }}
            transition={{ duration: 4, ease: "linear" }}
          />
        </svg>
        <div className="absolute">
          <CountdownCircleTimer
            key={index}
            isPlaying
            duration={4}
            strokeWidth={0}
            size={0}
            colors="#0b29ee"
            // trailColor="transparent"
            onComplete={() => { next(); return { shouldRepeat: false }; }}
          >
            {({ remainingTime }) => <div className="text-3xl font-bold text-white">{remainingTime}</div>}
          </CountdownCircleTimer>
        </div>
      </div>
    );
  };

  const is478 = cardTitle === "4-7-8 Breathing";
  const isBox = cardTitle.includes("Square") || cardTitle.includes("Box");

  return (
    <div className="w-full text-center space-y-10 px-5"> 
      <div className="mx-auto">
        {is478 ? <Breathing478 /> : isBox ? <BoxBreathing /> : (
          steps[index].image && (
            <img
              src={steps[index].image}
              alt={`Step ${index + 1}`}
              className="mx-auto w-48 h-48 object-contain rounded-md"
            />
          )
        )}
      </div>
      <p className="text-lg text-zinc-700 dark:text-zinc-300 pt-sans-regular">
        {steps[index].text}
      </p>
      <div className="flex justify-between items-center mt-2">
        <button onClick={prev} disabled={index === 0} className="text-blue-500 disabled:text-gray-300 text-2xl p-2 cursor-pointer">
            <ChevronLeft className={'h-8 w-8'}/>
        </button>
        <div className="flex gap-1">
          {steps.map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full ${i === index ? "bg-white" : "bg-zinc-300 dark:bg-zinc-600"}`}
            />
          ))}
        </div>
        <button onClick={next} disabled={index === steps.length - 1} className="text-blue-500 disabled:text-gray-300 text-2xl p-2 cursor-pointer">
            <ChevronRight className={'h-8 w-8'}/>
        </button>
      </div>
    </div>
  );
}

export default SlideStepper