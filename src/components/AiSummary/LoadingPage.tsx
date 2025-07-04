import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const LoadingPage = () => {
    const [loadingText, setLoadingText] = useState("Reflecting on your year...");
    const [progress, setProgress] = useState(0);

    const loadingMessages = [
        "Reflecting on your year...",
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
        <div className="min-h-screen w-full bg-gradient-to-br from-teal-900 via-indigo-900 to-purple-900 relative overflow-hidden flex items-center justify-center px-4">
            {/* Floating Background Elements */}
            <div className="absolute inset-0 z-0">
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={`circle-${i}`}
                        className="absolute rounded-full bg-white/10 backdrop-blur-sm"
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
                        className="absolute text-white/20 text-2xl"
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
                        {['💚', '🧘‍♀️', '🧠', '🌱', '💖', '🌈'][i]}
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
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-green-400 to-cyan-500 flex items-center justify-center shadow-2xl">
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="text-white text-3xl"
                        >
                            🧘‍♀️
                        </motion.div>
                    </div>
                </motion.div>

                {/* Title & Subtitle */}
                <div>
                    <h1 className="text-3xl font-black text-white">Your Mental Health Journey</h1>
                </div>

                {/* Animated Loading Text */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={loadingText}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="text-lg text-white font-semibold mt-4"
                    >
                        {loadingText}
                    </motion.div>
                </AnimatePresence>

                {/* Progress Bar */}
                <div className="w-full">
                    <div className="bg-white/20 rounded-full h-2 overflow-hidden mb-2">
                        <motion.div
                            className="h-full bg-gradient-to-r from-teal-400 to-sky-500 rounded-full"
                            style={{ width: `${progress}%` }}
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                    <p className="text-sm text-white/60 font-medium">{Math.round(progress)}% complete</p>
                </div>

                {/* Loading Dots */}
                <div className="flex justify-center gap-2 mt-2">
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-3 h-3 bg-white rounded-full"
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                        />
                    ))}
                </div>

                {/* Preview Stats */}
                <div className="mt-8 w-full space-y-4">
                    {[
                        { label: "Mindful Days", value: "121", color: "from-green-400 to-lime-500" },
                        { label: "Moments Tracked", value: "32", color: "from-blue-400 to-cyan-500" },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 1 + i * 0.2 }}
                            className={`bg-gradient-to-r ${stat.color} rounded-2xl p-4 backdrop-blur-sm`}
                        >
                            <div className="text-2xl font-black text-white">{stat.value}</div>
                            <div className="text-sm text-white/80">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LoadingPage;
