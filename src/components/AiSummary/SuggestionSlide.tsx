import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Activity, MapPin, Users, Lightbulb, Play, Pause, ChevronRight, ChevronLeft } from "lucide-react";

interface SuggestionSlideProps {
    activitySuggestions: string[];
    placeSuggestions: string[];
    peopleSuggestions: string[];
    generalSuggestions: string[];
}

const SuggestionSlide = ({activitySuggestions, placeSuggestions, peopleSuggestions, generalSuggestions,}: SuggestionSlideProps) => {

    const [currentCategory, setCurrentCategory] = useState(0);
    const [currentSuggestion, setCurrentSuggestion] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState(0);

    const categories = [
        {
            name: "Activities",
            icon: Activity,
            suggestions: activitySuggestions,
            gradient: "from-orange-400 to-red-500",
            bgGradient: "from-orange-500 via-red-600 to-pink-600",
            color: "text-orange-300",
        },
        {
            name: "Places",
            icon: MapPin,
            suggestions: placeSuggestions,
            gradient: "from-blue-400 to-purple-500",
            bgGradient: "from-blue-500 via-purple-600 to-indigo-600",
            color: "text-blue-300",
        },
        {
            name: "People",
            icon: Users,
            suggestions: peopleSuggestions,
            gradient: "from-green-400 to-teal-500",
            bgGradient: "from-green-500 via-teal-600 to-cyan-600",
            color: "text-green-300",
        },
        {
            name: "General",
            icon: Lightbulb,
            suggestions: generalSuggestions,
            gradient: "from-blue-400 to-indigo-500",
            bgGradient: "from-blue-500 via-indigo-600 to-violet-600",
            color: "text-blue-300",
        },
    ];

    const currentCat = categories[currentCategory];
    const suggestionDuration = 6000;

    useEffect(() => {
        if (!isPlaying) return;
        const interval = setInterval(() => {
            setProgress(0);
            if (currentSuggestion < currentCat.suggestions.length - 1) {
                setCurrentSuggestion((prev) => prev + 1);
            } else {
                setCurrentSuggestion(0);
                setCurrentCategory((prev) => (prev + 1) % categories.length);
            }
        }, suggestionDuration);
        return () => clearInterval(interval);
    }, [currentCategory, currentSuggestion, isPlaying, currentCat.suggestions.length]);

    useEffect(() => {
        if (!isPlaying) return;
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) return 0;
                return prev + 100 / (suggestionDuration / 50);
            });
        }, 50);
        return () => clearInterval(progressInterval);
    }, [currentCategory, currentSuggestion, isPlaying]);

    const handlePrevious = () => {
        setProgress(0);
        if (currentSuggestion > 0) {
            setCurrentSuggestion((prev) => prev - 1);
        } else {
            const prevCategory = (currentCategory - 1 + categories.length) % categories.length;
            setCurrentCategory(prevCategory);
            setCurrentSuggestion(categories[prevCategory].suggestions.length - 1);
        }
    };

    const handleNext = () => {
        setProgress(0);
        if (currentSuggestion < currentCat.suggestions.length - 1) {
            setCurrentSuggestion((prev) => prev + 1);
        } else {
            setCurrentSuggestion(0);
            setCurrentCategory((prev) => (prev + 1) % categories.length);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={`relative w-full h-full overflow-hidden rounded-3xl bg-gradient-to-br ${currentCat.bgGradient} p-8 shadow-2xl transition-all duration-1000 ease-in-out`}
        >
            {/* Decorative background elements */}
            <div className="absolute inset-0 bg-black/10 z-0" />
            <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-4 left-4 w-16 h-16 bg-white/10 rounded-full blur-xl z-0"
            />
            <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}
                className="absolute bottom-6 left-6 w-20 h-20 bg-white/5 rounded-full blur-2xl z-0"
            />

            {/* Floating icon */}
            <motion.div
                key={currentCategory}
                animate={{ y: [0, -12, 0], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-6 left-6 text-white/45 z-10"
            >
                <currentCat.icon className="w-8 h-8" />
            </motion.div>

            {/* Secondary floating icon */}
            <motion.div
                animate={{ y: [0, -18, 0], rotate: [0, -15, 15, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                className="absolute top-20 right-4 text-white/35 z-10"
            >
                <Lightbulb className="w-6 h-6" />
            </motion.div>

            {/* Progress bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-white/20 z-10">
                <motion.div
                    className="h-full bg-white"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1, ease: "linear" }}
                />
            </div>

            {/* Content */}
            <div className="relative z-20 text-white flex flex-col items-center justify-center h-full">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="flex items-center justify-center mb-6"
                >
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${currentCat.gradient} flex items-center justify-center shadow-lg`}>
                        <currentCat.icon className="w-8 h-8 text-white" />
                    </div>
                </motion.div>

                <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="font-medium text-center opacity-90 text-zinc-200"
                >
                    Your Path Forward
                </motion.h2>

                <motion.h1
                    key={currentCategory}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="text-2xl md:text-3xl text-center mt-2 mb-8 font-mynabali-serif font-bold"
                >
                    {currentCat.name} to Explore
                </motion.h1>

                <motion.div
                    initial={{ x: 0, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className={`bg-gradient-to-r ${currentCat.gradient.replace('to-', 'to-').replace('from-', 'from-')}/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 mb-6 w-full max-w-sm min-h-[120px] flex flex-col items-center justify-center relative overflow-hidden`}
                >
                    <div className="flex items-center gap-3 mb-3">
                        <motion.div
                            animate={{ scale: [1, 1.15, 1] }}
                            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <currentCat.icon className={`w-6 h-6 ${currentCat.color}`} />
                        </motion.div>
                        <h3 className={`text-sm font-medium ${currentCat.color} uppercase tracking-wide`}>
                            Next Steps
                        </h3>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`${currentCategory}-${currentSuggestion}`}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 1.05 }}
                            transition={{ duration: 0.5 }}
                            className="text-center"
                        >
                            <p className="text-white font-semibold text-lg leading-relaxed">
                                {currentCat.suggestions[currentSuggestion]}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.6 }}
                    className="flex items-center justify-center gap-4"
                >
                    <motion.button
                        onClick={handlePrevious}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="cursor-pointer p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200 border border-white/10"
                    >
                        <ChevronLeft className="w-5 h-5 text-white" />
                    </motion.button>
                    <motion.button
                        onClick={() => setIsPlaying(!isPlaying)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="cursor-pointer p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200 border border-white/10"
                    >
                        {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
                    </motion.button>
                    <motion.button
                        onClick={handleNext}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="cursor-pointer p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200 border border-white/10"
                    >
                        <ChevronRight className="w-5 h-5 text-white" />
                    </motion.button>
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    className="flex items-center justify-center mt-4 gap-2"
                >
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${currentCat.gradient}`} />
                    <span className="text-sm font-medium opacity-80">
                        {currentSuggestion + 1} of {currentCat.suggestions.length}
                    </span>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default SuggestionSlide;