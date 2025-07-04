import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

interface PlaceSlideProps {
    positiveHeadline: string;
    negativeHeadline: string;
}

const PlaceSlide = ({ positiveHeadline, negativeHeadline }: PlaceSlideProps) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative w-full h-full overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 p-8 shadow-2xl"
    >
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-black/20 z-0" />
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl z-0" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full blur-3xl z-0" />

        {/* Floating icon */}
        <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-6 left-6 text-white/30 z-10"
        >
            <MapPin className="w-8 h-8" />
        </motion.div>

        {/* Content */}
        <div className="relative z-20 text-white flex flex-col items-center justify-center h-full">
            <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-4xl font-black leading-tight mb-2 text-center"
            >
                What Place
            </motion.h1>
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-2xl font-bold opacity-90 mb-8 text-center"
            >
                Takes You Places
            </motion.div>
            <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 mb-4 w-full max-w-sm"
            >
                <div className="flex items-center mb-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full mr-3 shadow-lg shadow-green-400/50" />
                    <span className="text-sm font-bold uppercase tracking-wide opacity-80">The Good</span>
                </div>
                <h3 className="text-xl font-bold leading-tight">{positiveHeadline}</h3>
            </motion.div>
            <motion.div
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 w-full max-w-sm"
            >
                <div className="flex items-center mb-3">
                    <div className="w-3 h-3 bg-red-400 rounded-full mr-3 shadow-lg shadow-red-400/50" />
                    <span className="text-sm font-bold uppercase tracking-wide opacity-80">The Not So Good</span>
                </div>
                <h3 className="text-xl font-bold leading-tight">{negativeHeadline}</h3>
            </motion.div>

        </div>
    </motion.div>
);

export default PlaceSlide;