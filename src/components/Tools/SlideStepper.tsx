import { useState } from "react";
import { motion } from "framer-motion";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { FiRepeat } from "react-icons/fi";
import {ChevronLeft, ChevronRight} from "lucide-react";
import { useStartDelay } from "../../utils/hooks/useStartDelay";
import type { SlideStepperProps } from "@/utils/types.ts";

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
        const delayMs = 1500;
        const started = useStartDelay(index, delayMs);

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
                        isPlaying={started}
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
        const delayMs = 1500;
        const started = useStartDelay(index, delayMs);
        const delaySec = delayMs / 1000;
        
        const step = index;
        const edgeMap = [
            { x1: 0, y1: 200, x2: 0, y2: 200, x2to: 0, y2to: 0 },
            { x1: 0, y1: 0, x2: 0, y2: 0, x2to: 200, y2to: 0 },
            { x1: 200, y1: 0, x2: 200, y2: 0, x2to: 200, y2to: 200 },
            { x1: 200, y1: 200, x2: 200, y2: 200, x2to: 0, y2to: 200 },
        ];

        if (step === 0) {
            return (
                <div className="flex flex-col items-center gap-4">
                    <WhooshExhale />
                </div>
            );
        }

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
        const adjustedCycle = (step - 1) % 4;
        const edge = edgeMap[adjustedCycle];

        return (
            <div className="relative w-[200px] h-[200px] mx-auto flex items-center justify-center scale-80">
                <svg width={200} height={200} className="absolute top-0 left-0">
                    <rect x={0} y={0} width={200} height={200} fill="none" stroke="#ccc" strokeWidth={20} />
                    <motion.line
                        x1={edge.x1}
                        y1={edge.y1}
                        x2={edge.x2}
                        y2={edge.y2}
                        stroke="#0b29ee"
                        strokeWidth={20}
                        animate={{ x2: edge.x2to, y2: edge.y2to }}
                        transition={{ duration: 4, ease: "linear", delay: delaySec }}
                    />
                </svg>
                <div className="absolute">
                    <CountdownCircleTimer
                        key={index}
                        isPlaying={started}
                        duration={4}
                        strokeWidth={0}
                        size={0}
                        colors="#0b29ee"
                        // trailColor="transparent"
                        onComplete={() => { next(); return { shouldRepeat: false }; }}
                    >
                        {({ remainingTime }) => <div className="text-3xl font-bold">{remainingTime}</div>}
                    </CountdownCircleTimer>
                </div>
            </div>
        );
    };

    const is478 = cardTitle === "4-7-8 Breathing";
    const isBox = cardTitle.includes("Square") || cardTitle.includes("Box");
    const isLast = index === steps.length - 1;

    return (
        <div className="relative w-full h-full flex flex-col">
            <div className="flex-1 flex flex-col min-h-0 px-4">
                <div className="flex-1 flex items-center justify-center min-h-0 py-4">
                    {is478 ? <Breathing478 /> : isBox ? <BoxBreathing /> : (
                        steps[index].image && (
                            <img
                                src={steps[index].image}
                                alt={`Step ${index + 1}`}
                                className="max-h-full max-w-full object-contain"
                            />
                        )
                    )}
                </div>
                <div className="flex-shrink-0 pt-4 pb-4 lg:px-6">
                    <p className="text-center sm:text-sm md:text-xl lg:text-3xl xl:text-xl text-zinc-700 dark:text-zinc-300 pt-sans-regular text-center">
                        {steps[index].text}
                    </p>
                </div>
            </div>
            <div className="flex-shrink-0 flex items-center justify-between px-6 bg-zinc-100/50 dark:bg-zinc-900/50 backdrop-blur-sm">
                <button onClick={prev} disabled={index === 0} className="p-2 disabled:opacity-50">
                    <ChevronLeft className="sm:h-7 sm:w-7 lg:h-12 lg:w-12 xl:h-10 xl:w-10"/>
                </button>
                <div className="flex gap-1 lg:gap-2 xl:gap-1">
                    {steps.map((_, i) => (
                        <span
                            key={i}
                            className={`h-2 w-2 lg:h-4 lg:w-4 xl:h-2 xl:w-2 rounded-full ${i === index ? "bg-blue-500" : "bg-zinc-300 dark:bg-zinc-600"}`}
                        />
                    ))}
                </div>
                {isLast ? (
                    <button
                        onClick={() => setIndex(0)}
                        className="p-2 text-blue-500"
                        title="Restart"
                    >
                        <FiRepeat className="h-5 w-5 sm:h-7 sm:w-7 lg:h-12 lg:w-12 xl:h-10 xl:w-10" />
                    </button>
                ) : (
                    <button onClick={next} disabled={index === steps.length - 1} className="text-blue-500 disabled:text-gray-300 text-2xl p-2 cursor-pointer">
                    <ChevronRight className="sm:h-7 sm:w-7 lg:h-12 lg:w-12 xl:h-10 xl:w-10"/>
                </button>
                )}
            </div>
        </div>
    );
}

export default SlideStepper