import { motion } from "framer-motion";
import { Sparkles, Star } from "lucide-react";

interface FirstSlideProps {
    nickname: string;
    description: string;
}

const FirstSlide = ({ nickname, description }: FirstSlideProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-full overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 p-8 shadow-2xl"
        >
            {/* Decorative background elements */}
            <div className="absolute inset-0 bg-black/10 z-0" />
            <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl z-0" />
            <div className="absolute bottom-6 left-6 w-16 h-16 bg-white/5 rounded-full blur-2xl z-0" />

            {/* Floating sparkles */}
            <motion.div
                animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute top-6 left-6 text-white/30 z-10"
            >
                <Sparkles className="w-6 h-6" />
            </motion.div>
            <motion.div
                animate={{ rotate: [360, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 1 }}
                className="absolute bottom-8 right-8 text-white/20 z-10"
            >
                <Star className="w-5 h-5" />
            </motion.div>

            {/* Content */}
            <div className="relative z-20 text-white flex flex-col items-center justify-center h-full">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="flex items-center justify-center mb-6"
                >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
                        <Star className="w-8 h-8 text-white" />
                    </div>
                </motion.div>
                <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-lg font-medium text-center mb-2 opacity-90"
                >
                    Your Persona
                </motion.h2>
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="text-4xl md:text-5xl font-black text-center mb-6 leading-tight"
                >
                    {nickname}
                </motion.h1>
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 max-w-sm w-full text-center"
                >
                    <p className="text-lg font-medium leading-relaxed opacity-90">{description}</p>
                </motion.div>
            </div>

            {/* Gradient overlay for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none z-10" />
        </motion.div>
    );
};

export default FirstSlide;