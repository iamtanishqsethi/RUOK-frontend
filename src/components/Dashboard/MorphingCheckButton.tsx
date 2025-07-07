import { motion, type Variants } from 'framer-motion';
import { Plus } from "lucide-react";
import {
    highEnergyPleasantAccent,
    highEnergyPleasantGlow,
    highEnergyPleasantPrimary,
    highEnergyPleasantSecondary,
    highEnergyUnpleasantAccent,
    highEnergyUnpleasantGlow,
    highEnergyUnpleasantPrimary,
    highEnergyUnpleasantSecondary,
    lowEnergyPleasantAccent,
    lowEnergyPleasantGlow,
    lowEnergyPleasantPrimary,
    lowEnergyPleasantSecondary,
    lowEnergyUnpleasantAccent,
    lowEnergyUnpleasantGlow,
    lowEnergyUnpleasantPrimary,
    lowEnergyUnpleasantSecondary
} from "@/utils/constants.ts";



interface Props {
    emotionType:string|undefined
}

const MorphingCheckButton = ({emotionType}:Props) => {

    const getColorsByText = (type: string|undefined) => {
        switch (type) {
            case 'High Energy Unpleasant':
                return {
                    primary: highEnergyUnpleasantPrimary,
                    secondary: highEnergyUnpleasantSecondary,
                    accent: highEnergyUnpleasantAccent,
                    glow: highEnergyUnpleasantGlow
                };
            case 'Low Energy Unpleasant':
                return {
                    primary: lowEnergyUnpleasantPrimary,
                    secondary: lowEnergyUnpleasantSecondary,
                    accent: lowEnergyUnpleasantAccent,
                    glow: lowEnergyUnpleasantGlow
                };
            case 'High Energy Pleasant':
                return {
                    primary: highEnergyPleasantPrimary,
                    secondary: highEnergyPleasantSecondary,
                    accent: highEnergyPleasantAccent,
                    glow: highEnergyPleasantGlow
                };
            case 'Low Energy Pleasant':
                return {
                    primary: lowEnergyPleasantPrimary,
                    secondary: lowEnergyPleasantSecondary,
                    accent: lowEnergyPleasantAccent,
                    glow: lowEnergyPleasantGlow
                };
            default:
                return {
                    primary: '#4e545e', // Gray-500
                    secondary: '#888d98', // Gray-400
                    accent: '#939398', // Gray-300
                    glow: '#e5e7eb' // Gray-200
                };
        }
    };
    const colors = getColorsByText(emotionType)


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
                    className="absolute inset-0 w-32 h-32 opacity-40"
                    style={{
                        background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`,
                        filter: 'blur(2px)'
                    }}
                    variants={waveVariants}
                    animate="wave1"
                />

                {/* Main button */}
                <motion.div
                    className="relative w-28 h-28 opacity-95 flex items-center justify-center overflow-hidden rounded-full shadow-lg"
                    style={{
                        background: `linear-gradient(135deg, ${colors.accent}, ${colors.primary})`,
                    }}
                >
                    {/* Button content */}
                    <motion.div
                        className="relative z-10 font-bold tracking-wider text-center"
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
                        <Plus size={32} strokeWidth={2.5} />
                    </motion.div>
                </motion.div>

                {/* Outer glow ring */}
                <motion.div
                    className="absolute -inset-4 rounded-full opacity-20"
                    style={{
                        background: `conic-gradient(from 0deg, ${colors.primary}, ${colors.secondary}, ${colors.accent}, ${colors.glow}, ${colors.primary})`,
                        filter: 'blur(8px)'
                    }}
                    animate={{
                        rotate: [0, 360]
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

export default MorphingCheckButton;