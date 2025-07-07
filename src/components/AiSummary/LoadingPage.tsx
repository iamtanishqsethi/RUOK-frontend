import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {BookHeart, ChartLine, Heart, HeartHandshake, Sparkles, Zap} from "lucide-react";

const LoadingPage = () => {
    const [loadingText, setLoadingText] = useState("Reflecting on your year...");
    const [progress, setProgress] = useState(0);

    const loadingMessages = [
        "Reflecting on your check ins...",
        "Gathering mindful moments...",
        "Tracking emotional growth...",
        "Balancing highs and lows...",
        "Embracing your journey...",
        "Almost there..."
    ];

    useEffect(() => {
        const messageInterval = setInterval(() => {
            setLoadingText(prev => {
                const currentIndex = loadingMessages.indexOf(prev);
                const nextIndex = (currentIndex + 1) % loadingMessages.length;
                return loadingMessages[nextIndex];
            });
        }, 2500);

        const progressInterval = setInterval(() => {
            setProgress(prev => Math.min(prev + Math.random() * 10, 100));
        }, 300);

        return () => {
            clearInterval(messageInterval);
            clearInterval(progressInterval);
        };
    }, []);

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-cyan-500 dark:from-cyan-900 via-indigo-500 dark:via-indigo-900 to-blue-500 dark:to-blue-900 relative overflow-hidden flex items-center justify-center px-4">
            {/* Floating Background Elements */}
            <div className="absolute inset-0 z-0">
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={`circle-${i}`}
                        className="absolute rounded-full bg-white/30 dark:bg-white/10 backdrop-blur-sm"
                        style={{
                            width: Math.random() * 100 + 50,
                            height: Math.random() * 100 + 50,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            x: [0, Math.random() * 40 - 20, 0],
                            scale: [1, 1.1, 1],
                            opacity: [0.3, 0.7, 0.3],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}

                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={`emoji-${i}`}
                        className="absolute  text-2xl text-white"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -100, 0],
                            opacity: [0, 1, 0],
                            rotate: [0, 360],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            delay: Math.random() * 4,
                        }}
                    >
                        {[<Sparkles/>, <Heart/>, <Zap/>, <BookHeart/>, <ChartLine/>][i]}
                    </motion.div>
                ))}
            </div>

            {/* Foreground Content */}
            <div className="relative z-10 max-w-screen-sm w-full text-center flex flex-col items-center gap-y-6 px-4 py-10 sm:px-6 sm:py-12">
                {/* Logo */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                    className="mb-4"
                >
                    <div className="w-20 h-20 mx-auto  flex items-center justify-center ">
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="text-white text-3xl"
                        >
                            <HeartHandshake className={'h-20 w-20 '}/>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Title & Subtitle */}
                <div>
                    <h1 className="text-3xl font-mynabali-serif tracking-wide font-bold text-white">
                        Your Mental Health Journey
                    </h1>
                </div>

                {/* Animated Loading Text */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={loadingText}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="text-lg text-white  font-medium mt-5 font-secondary"
                    >
                        {loadingText}
                    </motion.div>
                </AnimatePresence>

                {/* Progress Bar */}
                <div className="w-full">
                    <div className="bg-white/20 rounded-full h-2 overflow-hidden mb-2">
                        <motion.div
                            className="h-full bg-gradient-to-r from-teal-500 to-sky-500 rounded-full"
                            style={{ width: `${progress}%` }}
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>

                {/* Loading Dots */}
                <div className="flex justify-center gap-2 mt-2">
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-3 h-3 bg-zinc-200 rounded-full"
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default LoadingPage;
