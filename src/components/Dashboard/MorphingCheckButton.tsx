import { motion, type Variants } from 'framer-motion';
import { Plus } from "lucide-react";

const colorConfig = {
    background: {
        main: 'from-zinc-50 to-zinc-200',
        wave: 'from-zinc-100 to-zinc-300',
        glow: 'from-zinc-200 via-white to-zinc-100'
    },
    text: 'text-zinc-900',
    shadow: '#f3f4f6'
};

const MorphingCheckButton = () => {
    const waveVariants: Variants = {
        wave1: {
            borderRadius: [
                '55% 45% 40% 60%',
                '40% 60% 65% 35%',
                '65% 35% 45% 55%',
                '45% 55% 60% 40%',
                '60% 40% 35% 65%',
                '35% 65% 55% 45%',
                '55% 45% 40% 60%'
            ],
            rotate: [0, 60, 120, 180, 240, 300, 360],
            scale: [1, 1.05, 0.95, 1.03, 0.98, 1.02, 1],
            transition: {
                duration: 12,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 1.5
            }
        },
    };

    const hoverVariants: Variants = {
        hover: {
            scale: 1.08,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className="flex items-center justify-center m-2">
            <motion.div
                className="relative cursor-pointer"
                whileHover="hover"
                variants={hoverVariants}
            >
                {/* Morphing wave background */}
                <motion.div
                    className={`absolute inset-0 w-32 h-32 opacity-40 bg-gradient-to-br ${colorConfig.background.wave}`}
                    style={{
                        filter: 'blur(2px)'
                    }}
                    variants={waveVariants}
                    animate="wave1"
                />

                {/* Main button */}
                <motion.div
                    className={`relative w-28 h-28 opacity-95 flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-br ${colorConfig.background.main} shadow-lg`}
                    style={{
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6)'
                    }}
                >
                    {/* Button content */}
                    <motion.div
                        className={`relative z-10 font-bold tracking-wider text-center ${colorConfig.text}`}
                    >
                        <Plus size={32} strokeWidth={2.5} />
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default MorphingCheckButton;