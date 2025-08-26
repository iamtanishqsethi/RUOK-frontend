import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

interface Suggestion {
    context: string;
    tool: string;
    rating: number;
}

interface RecommendationCarouselProps {
    suggestions: Suggestion[];
    selectedTool: string | null;
    setSelectedTool: (tool: string | null) => void;
}

const RecommendationCarousel = ({ suggestions, setSelectedTool }: RecommendationCarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (suggestions.length === 0 || isPaused) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % suggestions.length);
        }, 3500);

        return () => clearInterval(interval);
    }, [suggestions, isPaused]);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % suggestions.length);
    };

    const currentSuggestion = suggestions[currentIndex];

    return (
        <div className="w-full my-6 relative">
            <AnimatePresence mode="wait">
                {currentSuggestion ? (
                    <motion.div
                        key={currentSuggestion.tool}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className={`p-3 rounded-lg cursor-pointer  transition `}
                        onClick={() => setSelectedTool(currentSuggestion.tool)}
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        <p className="text-sm sm:text-base font-secondary text-zinc-700 dark:text-zinc-300">
                            {currentSuggestion.context}
                        </p>
                        <p className="text-sm sm:text-base font-secondary text-zinc-700 dark:text-zinc-300 mt-1">
                            <span className="font-bold text-lg ">Recommended Tool:</span><br/> {currentSuggestion.tool} (Rating: {currentSuggestion.rating})
                        </p>
                    </motion.div>
                ) : (
                    <motion.p
                        key="no-suggestion"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base text-center my-8"
                    >
                        No recommendations available.
                    </motion.p>
                )}
            </AnimatePresence>

            {suggestions.length > 1 && (
                <div className="absolute bottom-4 w-full flex items-center justify-between px-4">
                    <button onClick={handlePrev}>
                        <ChevronLeft className="h-6 w-6 text-zinc-600 hover:text-zinc-800 dark:text-zinc-300 dark:hover:text-zinc-100 transition cursor-pointer" />
                    </button>
                    <button onClick={handleNext}>
                        <ChevronRight className="h-6 w-6 text-zinc-600 hover:text-zinc-800 dark:text-zinc-300 dark:hover:text-zinc-100 transition cursor-pointer" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default memo(RecommendationCarousel);