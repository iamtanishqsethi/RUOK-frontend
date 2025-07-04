import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Sparkles, Brain, Heart, Zap } from "lucide-react";

const AnimatedIcons = () => {
    const [currentIcon, setCurrentIcon] = useState(0);

    const icons = [
        { Icon: Sparkles, color: "text-purple-500" },
        { Icon: Brain, color: "text-blue-500" },
        { Icon: Heart, color: "text-pink-500" },
        { Icon: Zap, color: "text-yellow-500" }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIcon((prev) => (prev + 1) % icons.length);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col justify-center items-center mb-3">

            <div className="relative w-20 h-20 flex items-center justify-center">
                <AnimatePresence mode="wait">
                    {icons.map((iconData, index) => {
                        const { Icon, color } = iconData;
                        return currentIcon === index ? (
                            <motion.div
                                key={index}
                                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                                exit={{ scale: 0, rotate: 180, opacity: 0 }}
                                transition={{
                                    duration: 0.5,
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 20
                                }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <Icon className={`w-20 h-20 ${color}`} />
                            </motion.div>
                        ) : null;
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default AnimatedIcons;