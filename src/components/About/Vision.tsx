import { motion } from "motion/react";
import { Lightbulb } from "lucide-react";

const Vision = () => {
    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: "easeOut" }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const scaleIn = {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.5, ease: "easeOut" }
    };

    return (
        <motion.section
            className="py-16 px-4 max-w-6xl mx-auto text-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
        >
            <motion.div
                className="bg-gradient-to-br  rounded-2xl p-8 md:p-12 border "
                variants={scaleIn}
            >
                <Lightbulb className="w-16 h-16 0 mx-auto mb-6" />
                <motion.h2
                    className="text-4xl md:text-5xl font-bold font-mynabali-serif mb-8 text-zinc-800 dark:text-zinc-100"
                    variants={fadeInUp}
                >
                    Our Vision
                </motion.h2>
                <motion.p
                    className="text-lg md:text-xl text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-4xl mx-auto mb-8"
                    variants={fadeInUp}
                >
                    We envision a world where everyone has the language, tools, and support to navigate their emotional wellness journey with confidence and precision. RuOk aims to bridge the gap between feeling something is wrong and understanding exactly what you're experiencing.
                </motion.p>

                <motion.div
                    className="grid md:grid-cols-3 gap-6 mt-8"
                    variants={staggerContainer}
                >
                    <motion.div
                        className="text-center"
                        variants={fadeInUp}
                    >
                        <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">1</span>
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-zinc-800 dark:text-zinc-100">Recognize</h3>
                        <p className="text-zinc-600 dark:text-zinc-400">Develop deeper emotional awareness and vocabulary</p>
                    </motion.div>

                    <motion.div
                        className="text-center"
                        variants={fadeInUp}
                    >
                        <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl font-bold text-green-600 dark:text-green-400">2</span>
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-zinc-800 dark:text-zinc-100">Process</h3>
                        <p className="text-zinc-600 dark:text-zinc-400">Learn healthy coping mechanisms and emotional regulation</p>
                    </motion.div>

                    <motion.div
                        className="text-center"
                        variants={fadeInUp}
                    >
                        <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">3</span>
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-zinc-800 dark:text-zinc-100">Act</h3>
                        <p className="text-zinc-600 dark:text-zinc-400">Take meaningful steps toward emotional wellness</p>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.section>
    );
};

export default Vision;