import { memo } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card.tsx";
import { MagicCard } from "@/components/magicui/magic-card.tsx";
import { X } from "lucide-react";
import type { CheckIn } from "@/utils/types.ts";
import { useSelector } from "react-redux";
import useGetFeedbackInsight from "./useGetGeminiFeedbackInsights.ts";
import { useState, useEffect } from "react";
import RecommendationCarousel from "./RecommendationCarousel.tsx";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button.tsx";
import { useNavigate } from "react-router-dom";

interface FeedbackModalProps {
    toolName: string;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RecommendedToolModal = ({ toolName, setIsModalOpen }: FeedbackModalProps) => {
    const navigate = useNavigate();
    const latestCheckIn = useSelector(
        (state: { checkIns: { latestCheckIn: CheckIn | null } }) => state.checkIns.latestCheckIn
    );
    const { insight, loading, error, getInsight } = useGetFeedbackInsight();

    const [selectedTool, setSelectedTool] = useState<string | null>(toolName || null);

    useEffect(() => {
        if (latestCheckIn) {
            getInsight();
        }
    }, [latestCheckIn, getInsight]);

    // Get emotion color dynamically based on latest check-in
    const emotionColor = latestCheckIn?.emotion.title === "Happy" ? "#10B981" : "#3B82F6"; // Adjust as needed

    const suggestions = insight
        ? [
            insight.emotionSuggestion,
            insight.emotionTypeSuggestion,
            ...(insight.activitySuggestion ? [insight.activitySuggestion] : []),
            ...(insight.placeSuggestion ? [insight.placeSuggestion] : []),
            ...(insight.peopleSuggestion ? [insight.peopleSuggestion] : []),
        ]
        : [];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-lg h-full w-full flex items-center justify-center"
            onClick={() => setIsModalOpen(false)}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="relative w-[22rem] md:w-[40rem] max-w-[90vw] h-auto max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-4 right-4 z-60 bg-zinc-200 dark:bg-zinc-700 rounded-full p-2 text-zinc-600 hover:text-zinc-800 dark:text-zinc-300 dark:hover:text-zinc-100 transition"
                    onClick={() => setIsModalOpen(false)}
                >
                    <X className="h-8 w-8" />
                </button>
                <Card className="p-0 rounded-2xl overflow-hidden">
                    <MagicCard className="flex flex-col items-center justify-start text-center p-6 sm:p-8 w-full h-full">
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                            className="mb-4"
                        >
                            <h1 className="font-mynabali-serif text-2xl sm:text-3xl md:text-4xl font-medium text-zinc-800 dark:text-zinc-100 mb-2">
                                Recommended Tools
                            </h1>
                            <p className="text-zinc-600 dark:text-zinc-300 font-secondary text-base sm:text-lg">
                                Based on your latest check-in
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.4 }}
                            className="w-full mb-4"
                        >
                            <p className="font-secondary text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-medium mb-3">
                                You felt{" "}
                                <span
                                    className="font-mynabali-serif text-xl sm:text-2xl md:text-3xl font-semibold"
                                    style={{ color: emotionColor }}
                                >
                  {latestCheckIn?.emotion.title || "Unknown"}
                </span>{" "}
                                on{" "}
                                {new Date(latestCheckIn?.createdAt || Date.now()).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </p>
                        </motion.div>

                        {loading && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.4 }}
                                className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base text-center my-8"
                            >
                                Loading recommendations...
                            </motion.p>
                        )}

                        {error && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.4 }}
                                className="text-red-500 dark:text-red-400 text-sm sm:text-base text-center my-8"
                            >
                                {error}
                            </motion.p>
                        )}

                        {!loading && !error && (
                            <RecommendationCarousel
                                suggestions={suggestions}
                                selectedTool={selectedTool}
                                setSelectedTool={setSelectedTool}
                            />
                        )}

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.4 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <InteractiveHoverButton
                                className="text-lg px-8 py-3 font-medium"
                                onClick={() => navigate("/main/tools")}
                                style={{
                                    background: `linear-gradient(135deg, ${emotionColor}20, ${emotionColor}10)`,
                                    borderColor: emotionColor + "40",
                                }}
                            >
                                Go To Tools
                            </InteractiveHoverButton>
                        </motion.div>
                    </MagicCard>
                </Card>
            </motion.div>
        </motion.div>
    );
};

export default memo(RecommendedToolModal);