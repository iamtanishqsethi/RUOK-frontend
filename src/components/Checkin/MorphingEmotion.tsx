import { motion, type Variants } from 'framer-motion';
import type {Emotion} from "@/utils/types.ts";

const MorphingEmotion=(props:Emotion)=>{
    const {title,type} = props

    const getColorsByText = (type: string) => {
        switch (type) {
            case 'High Energy Unpleasant':
                return {
                    primary: '#bf1b1b',
                    secondary: '#bd3636',
                    accent: '#8c0000',
                    glow: '#bd7171'
                };
            case 'Low Energy Unpleasant':
                return {
                    primary: '#1851d1',
                    secondary: '#3276e4',
                    accent: '#003b81',
                    glow: '#729fd3'
                };
            case 'High Energy Pleasant':
                return {
                    primary: '#cc6e02',
                    secondary: '#e49207',
                    accent: '#9c7000',
                    glow: '#e8c03f'
                };
            case 'Low Energy Pleasant':
                return {
                    primary: '#01875d',
                    secondary: '#0ea875',
                    accent: '#008c5a',
                    glow: '#54bd94'
                };
            default:
                // Return a default color set if text doesn't match
                return {
                    primary: '#6b7280', // Gray-500
                    secondary: '#9ca3af', // Gray-400
                    accent: '#d1d5db', // Gray-300
                    glow: '#e5e7eb' // Gray-200
                };
        }
    };

    const colors = getColorsByText(type);

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
        <div className="flex items-center justify-center m-2 ">
            <motion.div
                className="relative cursor-pointer"
                whileHover="hover"
                variants={hoverVariants}
            >

                <motion.div
                    className="absolute inset-0 w-48 h-48 opacity-30  "
                    style={{
                        background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`,
                        filter: 'blur(1px)'
                    }}
                    variants={waveVariants}
                    animate="wave1"

                />

                <motion.div
                    className="relative w-44 h-44 opacity-90 flex items-center justify-center overflow-hidden rounded-full"
                    style={{
                        background: `linear-gradient(135deg, ${colors.accent}, ${colors.primary})`,
                        rotate:'0'
                    }}

                >



                    {/* Button content */}
                    <motion.div
                        className="relative z-10  font-bold tracking-wider text-center "
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
                        {title}
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


}
export default MorphingEmotion