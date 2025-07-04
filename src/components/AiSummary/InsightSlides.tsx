import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FirstSlide from "./FirstSlide";
import ActivitySlide from "./ActivitySlide";
import PlaceSlide from "./PlaceSlide";
import PeopleSlide from "./PeopleSlide";
import SuggestionSlide from "./SuggestionSlide";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface InsightSlidesProps {
    insight: any[];
    onClose?: () => void;
}

const InsightSlides = ({ insight, onClose }: InsightSlidesProps) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = insight?.length || 1;

    const currentItem = insight[currentSlide] || {};

    const renderSlide = () => {
        if (!insight || insight.length === 0) {
            return <div className="text-white text-center">No slides available</div>;
        }
        if (currentItem.nickname) return <FirstSlide {...currentItem} />;
        if (currentItem.tag === "activity") return <ActivitySlide {...currentItem} />;
        if (currentItem.tag === "place") return <PlaceSlide {...currentItem} />;
        if (currentItem.tag === "people") return <PeopleSlide {...currentItem} />;
        if (currentItem.tag === "suggestions") return <SuggestionSlide {...currentItem} />;
        return <FirstSlide {...currentItem} />;
    };

    const handleNext = () => {
        if (currentSlide < totalSlides - 1) {
            setCurrentSlide((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentSlide > 0) {
            setCurrentSlide((prev) => prev - 1);
        }
    };

    return (
        <div className="relative w-full max-w-md mx-auto h-[95vh] flex flex-col">
            {/* Slide Content */}
            <div className="relative flex-1 overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="h-full w-full"
                    >
                        {renderSlide()}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none z-30">
                {/* Close Button */}
                {onClose && (
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition pointer-events-auto"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>
                )}

                {/* Left/Right Navigation */}
                <div className="absolute bottom-8 left-0 right-0 flex items-center justify-between px-4 pointer-events-auto">
                    <button
                        onClick={handlePrev}
                        disabled={currentSlide === 0}
                        className="p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft className="w-6 h-6 text-white" />
                    </button>

                    {/* Slide Indicators */}
                    <div className="flex items-center space-x-2">
                        {insight.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 pointer-events-auto ${
                                    index === currentSlide
                                        ? "bg-white scale-125"
                                        : "bg-white/50 hover:bg-white/70"
                                }`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={handleNext}
                        disabled={currentSlide === totalSlides - 1}
                        className="p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronRight className="w-6 h-6 text-white" />
                    </button>
                </div>
            </div>

            {/* Decorative Background Elements */}
            <div className="absolute inset-0 bg-black/10 z-0" />
            <div className="absolute top-4 left-4 w-16 h-16 bg-white/10 rounded-full blur-xl z-0" />
            <div className="absolute bottom-20 right-4 w-24 h-24 bg-white/5 rounded-full blur-2xl z-0" />
        </div>
    );
};

export default InsightSlides;