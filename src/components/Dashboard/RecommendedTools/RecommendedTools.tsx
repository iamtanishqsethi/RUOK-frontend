import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Wrench } from "lucide-react";
import { cards } from "../../Tools/Cards.tsx";
import type {CheckIn, TechniqueCard, User} from "@/utils/types.ts";
import RecommendedToolModal from "./RecommendedToolModal.tsx";
import {toast} from "sonner";

const RecommendedTools = () => {
    const [filteredTools, setFilteredTools] = useState<TechniqueCard[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const user = useSelector((state: { user: User | null }) => state.user);
    const [isGuest, setIsGuest] = useState(false);
    const latest = useSelector((store: { checkIns: { latestCheckIn: CheckIn | null } }) => store.checkIns.latestCheckIn);
    const emotionType = latest?.emotion.type;

    const handleGuestClick = () => {
        toast.error('Login To access this feature')
    }
    const handleClick=()=>{
        setIsModalOpen(true);
    }

    useEffect(() => {
        if(user?.isGuest){
            setIsGuest(true);
        }
    }, [user]);

    useEffect(() => {
        if (!emotionType) {
            setFilteredTools([]);
            return;
        }
        const filtered = cards.filter((card) => card.category === emotionType);
        setFilteredTools(filtered);
        setCurrentIndex(0);
    }, [emotionType]);

    useEffect(() => {
        if (filteredTools.length === 0 || isPaused) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % filteredTools.length);
        }, 3500);

        return () => clearInterval(interval);
    }, [filteredTools, isPaused]);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + filteredTools.length) % filteredTools.length);
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % filteredTools.length);
    };

    const currentTool = filteredTools[currentIndex];

    return (
        <>
            <div
                className={
                    "group relative flex flex-col items-center overflow-hidden rounded-xl " +
                    "col-span-1 sm:col-span-2 lg:col-start-3 lg:col-end-7 lg:row-start-4 lg:row-end-7 " +
                    "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] " +
                    "transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] " +
                    "lg:h-[18rem] bg-background p-3 sm:p-5 cursor-pointer"
                }
                onClick={isGuest?handleGuestClick:handleClick}
            >
                <h1 className="text-2xl font-semibold ">Recommended Tools</h1>
                <h1 className="text-sm sm:text-base text-center font-medium mb-4 text-zinc-400">Click to get Personalized Insights for tools </h1>

                <div className="absolute bottom-4 w-full flex items-center justify-between px-8 z-10">
                    <div className="p-1">
                        <button onClick={handlePrev}>
                            <ChevronLeft className="h-8 w-8 cursor-pointer transition" />
                        </button>
                    </div>
                    <div className="p-1">
                        <button onClick={handleNext}>
                            <ChevronRight className="h-8 w-8 cursor-pointer transition" />
                        </button>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {currentTool ? (
                        <motion.div
                            key={currentTool.title}
                            className="flex flex-col items-center justify-center"
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                            <h2 className="text-zinc-200 font-medium mb-4">{currentTool.title}</h2>
                            <motion.div className="flex-shrink-0">
                                <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 flex items-center justify-center my-2">
                                    <div className="relative w-full h-full group">
                                        <img
                                            src={currentTool.src}
                                            alt={currentTool.title}
                                            className="w-full h-full object-contain absolute top-0 left-0 transition-opacity duration-300 ease-in-out group-hover:opacity-0"
                                        />
                                        {currentTool.afterSrc && (
                                            <img
                                                src={currentTool.afterSrc}
                                                alt={`${currentTool.title} after`}
                                                className="w-full h-full object-contain absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                                            />
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    ) : (
                        <motion.p
                            key="no-tool"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-muted-foreground text-sm text-center m-10 flex flex-col items-center justify-center"
                        >
                            <Wrench className="m-2 h-12 md:h-16 w-12 md:w-16" />
                            No tools available. <br />
                            Please check in to get personalized suggestions.
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>

            {isModalOpen && (
                <RecommendedToolModal
                    toolName={currentTool?.title || ""}
                    setIsModalOpen={setIsModalOpen}
                />
            )}
        </>
    );
};

export default RecommendedTools;