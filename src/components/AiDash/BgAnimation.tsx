import { useEffect } from 'react';
import { motion, type Variants, useMotionValue, useSpring, useTransform } from 'framer-motion';

const BgAnimation = () => {
    // motion value for typing intensity
    const rawIntensity = useMotionValue(0);
    const typingIntensity = useSpring(rawIntensity, {
        stiffness: 80,
        damping: 20,
        mass: 0.5,
    });

    // derived transforms
    const layer1Opacity = useTransform(typingIntensity, i => 0.2 + i * 0.2);
    const layer1Scale   = useTransform(typingIntensity, i => 1 + i * 0.15);

    const layer2Opacity = useTransform(typingIntensity, i => 0.3 + i * 0.2);
    const layer2Scale   = useTransform(typingIntensity, i => 1 + i * 0.12);

    const layer3Opacity = useTransform(typingIntensity, i => 0.4 + i * 0.2);
    const layer3Scale   = useTransform(typingIntensity, i => 1 + i * 0.1);

    const ringOpacity   = useTransform(typingIntensity, i => 0.2 + i * 0.2);

    const particleOpacity = useTransform(typingIntensity, v => 0.3 + v * 0.3);
    const particleScale   = useTransform(typingIntensity, v => 0.8 + v * 0.6);

    // Color palette
    const colors = {
        primary: '#016afb',
        secondary: '#5400f6',
        accent: '#9329f6',
        glow: '#22d3ee',
    };

    // Typing activity listener
    useEffect(() => {
        let decayInterval: NodeJS.Timeout;

        const handleKeyPress = () => {
            rawIntensity.set(Math.min(rawIntensity.get() + 0.3, 1));
            clearInterval(decayInterval);
            decayInterval = setInterval(() => {
                rawIntensity.set(Math.max(rawIntensity.get() - 0.02, 0));
            }, 50);
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
            clearInterval(decayInterval);
        };
    }, [rawIntensity]);

    // Variants
    const waveVariants: Variants = {
        wave1: {
            borderRadius: [
                '60% 40% 30% 70%',
                '30% 60% 70% 40%',
                '70% 30% 40% 60%',
                '40% 70% 60% 30%',
                '60% 40% 30% 70%',
            ],
            rotate: [0, 90, 180, 270, 360],
            background: [
                `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`,
                `linear-gradient(45deg, ${colors.secondary}, ${colors.accent})`,
                `linear-gradient(45deg, ${colors.accent}, ${colors.glow})`,
                `linear-gradient(45deg, ${colors.glow}, ${colors.primary})`,
                `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`,
            ],
            transition: { duration: 8, ease: 'easeInOut', repeat: Infinity },
        },
        wave2: {
            borderRadius: [
                '50% 70% 80% 40%',
                '80% 40% 50% 70%',
                '40% 60% 70% 50%',
                '70% 50% 40% 80%',
                '50% 70% 80% 40%',
            ],
            rotate: [0, -120, -240, -360],
            background: [
                `linear-gradient(-45deg, ${colors.secondary}, ${colors.accent})`,
                `linear-gradient(-45deg, ${colors.accent}, ${colors.glow})`,
                `linear-gradient(-45deg, ${colors.glow}, ${colors.primary})`,
                `linear-gradient(-45deg, ${colors.primary}, ${colors.secondary})`,
                `linear-gradient(-45deg, ${colors.secondary}, ${colors.accent})`,
            ],
            transition: { duration: 10, ease: 'easeInOut', repeat: Infinity, delay: 0.5 },
        },
        wave3: {
            borderRadius: [
                '50% 50% 50% 50%',
                '30% 70% 40% 60%',
                '70% 30% 60% 40%',
                '40% 60% 30% 70%',
                '50% 50% 50% 50%',
            ],
            background: [
                `linear-gradient(135deg, ${colors.accent}, ${colors.primary})`,
                `linear-gradient(135deg, ${colors.glow}, ${colors.secondary})`,
                `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                `linear-gradient(135deg, ${colors.secondary}, ${colors.glow})`,
                `linear-gradient(135deg, ${colors.accent}, ${colors.primary})`,
            ],
            transition: { duration: 12, ease: 'easeInOut', repeat: Infinity, delay: 1 },
        },
    };

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
            {/* Background overlay */}
            <motion.div
                className="absolute inset-0 opacity-30"
                animate={{
                    background: [
                        `radial-gradient(ellipse at center, ${colors.primary}20, transparent 70%)`,
                        `radial-gradient(ellipse at center, ${colors.secondary}20, transparent 70%)`,
                        `radial-gradient(ellipse at center, ${colors.accent}20, transparent 70%)`,
                        `radial-gradient(ellipse at center, ${colors.glow}20, transparent 70%)`,
                        `radial-gradient(ellipse at center, ${colors.primary}20, transparent 70%)`,
                    ],
                }}
                transition={{ duration: 10, ease: 'easeInOut', repeat: Infinity }}
            />

            {/* Main animation */}
            <div className="absolute inset-0 flex items-center justify-center ">
                <motion.div className="relative">
                    {/* Layer 1 */}
                    <motion.div
                        className="absolute w-96 h-96 md:w-[15rem] md:h-[15rem]"
                        style={{
                            filter: 'blur(3px)',
                            opacity: layer1Opacity,
                            scale: layer1Scale,
                            left: '30%',
                            top: '30%',
                            transform: 'translate(-50%, -50%)',
                        }}
                        variants={waveVariants}
                        animate="wave1"
                    />

                    {/* Layer 2 */}
                    <motion.div
                        className="absolute w-80 h-80 md:w-70 md:h-70"
                        style={{
                            filter: 'blur(2px)',
                            opacity: layer2Opacity,
                            scale: layer2Scale,
                            left: '20%',
                            top: '20%',
                            transform: 'translate(-50%, -50%)',
                        }}
                        variants={waveVariants}
                        animate="wave2"
                    />

                    {/* Layer 3 */}
                    <motion.div
                        className="relative w-64 h-64 md:w-50 md:h-50"
                        style={{
                            opacity: layer3Opacity,
                            scale: layer3Scale ,
                            left: '-30%',
                            top: '-40%',}}
                        variants={waveVariants}
                        animate="wave3"
                    >
                        <motion.div
                            className="absolute inset-2"
                            style={{
                                background: `radial-gradient(circle at center, ${colors.glow}60, transparent 70%)` }}
                            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        />
                    </motion.div>

                    {/* Outer glow ring */}
                    <motion.div
                        className="absolute -inset-8 md:-inset-12 rounded-full w-64 h-64 md:w-70 md:h-70"
                        style={{
                            background: `conic-gradient(from 0deg, ${colors.primary}, ${colors.secondary}, ${colors.accent}, ${colors.glow}, ${colors.primary})`,
                            filter: 'blur(8px)',
                            opacity: ringOpacity,
                            left: '-50%',
                            top: '-30%',
                        }}
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    />
                </motion.div>
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full"
                        style={{
                            background: colors.glow,
                            opacity: particleOpacity,
                            scale: particleScale,
                            left: `${20 + (i % 4) * 20}%`,
                            top: `${20 + Math.floor(i / 4) * 40}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            x: [0, Math.sin(i) * 15, 0],
                            background: [colors.glow, colors.accent, colors.secondary, colors.primary, colors.glow],
                        }}
                        transition={{
                            duration: 2 + i * 0.2,
                            ease: 'easeInOut',
                            repeat: Infinity,
                            delay: i * 0.3,
                            times: [0, 0.25, 0.5, 0.75, 1],
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default BgAnimation;
