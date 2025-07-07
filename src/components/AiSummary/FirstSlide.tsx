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
            className="relative w-full h-full overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-purple-700 to-blue-700 p-8 shadow-2xl"
        >


            {/* Floating sparkles */}
            <motion.div
                animate={{  scale: [1, 1.1, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute top-6 left-6 text-white/30 z-10"
            >
                <Sparkles className="w-6 h-6" />
            </motion.div>


            {/* Content */}
            <div className="relative z-20 text-white flex flex-col items-center justify-center h-full">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="flex items-center justify-center mb-3"
                >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
                        <Star className="w-8 h-8 text-white" />
                    </div>
                </motion.div>
                <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-lg font-medium text-center  opacity-90 text-zinc-300"
                >
                    Your Persona
                </motion.h2>
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="text-4xl md:text-5xl  text-center my-4 font-mynabali-serif font-semibold"
                >
                    {nickname}
                </motion.h1>
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="  p-4  max-w-sm w-full text-center"
                >
                    <p className="text-sm font-medium leading-relaxed opacity-90 font-secondary text-zinc-200">
                        {description}
                    </p>
                </motion.div>
            </div>

            {/* Gradient overlay for text contrast */}

        </motion.div>
    );
};

export default FirstSlide;