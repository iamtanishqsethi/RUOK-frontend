import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FirstSlide from "./FirstSlide";
import ActivitySlide from "./ActivitySlide";
import PlaceSlide from "./PlaceSlide";
import PeopleSlide from "./PeopleSlide";
import SuggestionSlide from "./SuggestionSlide";
import { Button } from "@/components/ui/button";

interface InsightSlidesProps {
    insight: any[];
}

const InsightSlides = ({ insight }: InsightSlidesProps) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = insight.length;

    const handleNext = () => {
        if (currentSlide < totalSlides - 1) setCurrentSlide(currentSlide + 1);
    };

    const handlePrev = () => {
        if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
    };

    const currentItem = insight[currentSlide];

    const renderSlide = () => {
        if (currentItem.nickname) return <FirstSlide {...currentItem} />;
        if (currentItem.tag === "activity") return <ActivitySlide {...currentItem} />;
        if (currentItem.tag === "place") return <PlaceSlide {...currentItem} />;
        if (currentItem.tag === "people") return <PeopleSlide {...currentItem} />;
        if (currentItem.tag === "suggestions") return <SuggestionSlide {...currentItem} />;
        return null;
    };

    return (
        <div className="w-full max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.4 }}
                >
                    {renderSlide()}
                </motion.div>
            </AnimatePresence>

            <div className="flex justify-between items-center mt-6">
                <Button onClick={handlePrev} disabled={currentSlide === 0}>
                    Previous
                </Button>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
          Slide {currentSlide + 1} of {totalSlides}
        </span>
                <Button onClick={handleNext} disabled={currentSlide === totalSlides - 1}>
                    Next
                </Button>
            </div>
        </div>
    );
};

export default InsightSlides;
