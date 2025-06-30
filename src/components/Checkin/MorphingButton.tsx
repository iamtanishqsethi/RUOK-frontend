import { motion, type Variants } from 'framer-motion';

interface WaveButtonProps{
    text: string;
    primary:string;
    secondary:string;
    accent:string,
    glow:string,

}


const MorphingWaveButton = ({text,primary,secondary,accent,glow}:WaveButtonProps) => {
    // Custom color palette
    const colors = {
        primary: primary,
        secondary: secondary,
        accent: accent,
        glow: glow,
    };

    // Wave animation variants for different layers
    const waveVariants: Variants = {
        wave1: {
            borderRadius: [
                '60% 40% 30% 70%',
                '30% 60% 70% 40%',
                '70% 30% 40% 60%',
                '40% 70% 60% 30%',
                '60% 40% 30% 70%'
            ],
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.05, 0.95, 1.02, 1],
            transition: {
                duration: 10,
                ease: "easeInOut",
                repeat: Infinity,
                delay:1.5
            }
        },
        wave2: {
            borderRadius: [
                '50% 70% 80% 40%',
                '80% 40% 50% 70%',
                '40% 60% 70% 50%',
                '70% 50% 40% 80%',
                '50% 70% 80% 40%'
            ],
            rotate: [0, -120, -240, -360],
            scale: [0.98, 1.03, 0.97, 1.01, 0.98],
            transition: {
                duration: 10,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 1.5
            }
        },
        wave3: {
            borderRadius: [
                '50% 50% 50% 50%',
                '30% 70% 40% 60%',
                '70% 30% 60% 40%',
                '40% 60% 30% 70%',
                '50% 50% 50% 50%'
            ],

            scale: [1.02, 0.96, 1.04, 0.99, 1.02],
            transition: {
                duration: 10,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 1
            }
        }
    };

    const hoverVariants: Variants = {
        hover: {
            scale: 1.1,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className="flex items-center justify-center m-2  text-white">
            <motion.div
                className="relative cursor-pointer"
                whileHover="hover"
                variants={hoverVariants}
            >
                {/* Layer 1 - Outermost with lowest opacity */}
                <motion.div
                    className="absolute inset-0 w-40 h-40 md:w-48 md:h-48 opacity-30"
                    style={{
                        background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`,
                        filter: 'blur(1px)'
                    }}
                    variants={waveVariants}
                    animate="wave1"
                />

                {/* Layer 2 - Middle layer with medium opacity */}
                <motion.div
                    className="absolute inset-0 w-38 h-38 md:w-44 md:h-44 opacity-60"
                    style={{
                        background: `linear-gradient(-45deg, ${colors.secondary}, ${colors.accent})`,
                        filter: 'blur(0.5px)'
                    }}
                    variants={waveVariants}
                    animate="wave2"
                />

                {/* Layer 3 - Innermost with highest opacity */}
                <motion.div
                    className="relative w-38 h-38 md:w-44 md:h-44 opacity-90 flex items-center justify-center overflow-hidden"
                    style={{
                        background: `linear-gradient(135deg, ${colors.accent}, ${colors.primary})`,
                    }}
                    variants={waveVariants}
                    animate="wave3"
                >
                    {/* Inner glow effect */}
                    <motion.div
                        className="absolute inset-2 opacity-40"
                        style={{
                            background: `radial-gradient(circle at center, ${colors.glow}60, transparent 70%)`,
                        }}
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.4, 0.7, 0.4],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    {/* Button content */}
                    <motion.div
                        className="relative z-10  text-sm sm:text-base font-medium sm:font-semibold tracking-widest text-center"
                        animate={{
                            textShadow: [
                                `0 0 10px ${colors.glow}`,
                                `0 0 20px ${colors.glow}`,
                                `0 0 10px ${colors.glow}`
                            ]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        {text}
                    </motion.div>
                </motion.div>

                {/* Outer glow ring */}
                <motion.div
                    className="absolute -inset-4 rounded-full opacity-20"
                    style={{
                        background: `conic-gradient(from 0deg, ${colors.primary}, ${colors.secondary}, ${colors.accent}, ${colors.glow}, ${colors.primary})`,
                        filter: 'blur(8px)'
                    }}

                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            </motion.div>
        </div>
    );
};

export default MorphingWaveButton;