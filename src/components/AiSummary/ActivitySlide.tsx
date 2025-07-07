import { motion } from "framer-motion";
import { Activity, Zap, ThumbsUp, AlertTriangle } from "lucide-react";

interface ActivitySlideProps {
    positiveHeadline: string;
    negativeHeadline: string;
}

const ActivitySlide = ({ positiveHeadline, negativeHeadline }: ActivitySlideProps) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative w-full h-full overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 p-8 shadow-2xl"
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

        {/* Floating icons */}
        <motion.div
            animate={{ y: [0, -12, 0], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-6 left-6 text-white/45 z-10"
        >
            <Activity className="w-8 h-8" />
        </motion.div>
        <motion.div
            animate={{ y: [0, -18, 0], rotate: [0, -15, 15, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
            className="absolute top-20 right-4 text-white/35 z-10"
        >
            <Zap className="w-6 h-6" />
        </motion.div>


        {/* Content */}
        <div className="relative z-20 text-white flex flex-col items-center justify-center h-full">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex items-center justify-center mb-6"
            >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-lg">
                    <Activity className="w-8 h-8 text-white" />
                </div>
            </motion.div>
            <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className=" font-medium text-center  opacity-90 text-zinc-200"
            >
                Your Movement Matters
            </motion.h2>
            <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-2xl md:text-3xl  text-center mt-2 mb-8 font-mynabali-serif font-bold "
            >
                What Fueled Your Days
            </motion.h1>
            <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="bg-gradient-to-r from-emerald-400/20 to-green-500/20 backdrop-blur-sm rounded-2xl p-4 border border-emerald-300/30 mb-4 w-full max-w-sm relative overflow-hidden"
            >

                <div className="flex items-center gap-3 mb-2">
                    <motion.div
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ThumbsUp className="w-6 h-6 text-emerald-300" />
                    </motion.div>
                    <h3 className="text-sm font-medium text-emerald-200 uppercase tracking-wide">
                        Energy Boosters
                    </h3>
                </div>
                <p className="text-white font-semibold text-lg leading-relaxed">{positiveHeadline}</p>
            </motion.div>
            <motion.div
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="bg-gradient-to-r from-amber-400/20 to-orange-500/20 backdrop-blur-sm rounded-2xl p-4 border border-amber-300/30 w-full max-w-sm relative overflow-hidden"
            >


                <div className="flex items-center gap-3 mb-2">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
                    >
                        <AlertTriangle className="w-6 h-6 text-amber-300" />
                    </motion.div>
                    <h3 className="text-sm font-medium text-amber-200 uppercase tracking-wide">
                        Energy Drains
                    </h3>
                </div>
                <p className="text-white font-semibold text-lg leading-relaxed">{negativeHeadline}</p>
            </motion.div>
        </div>

    </motion.div>
);

export default ActivitySlide;