import { Brain, Users, Shield, Target } from "lucide-react";
import { motion } from "motion/react";
const Problem = () => {
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
            <motion.h2
                className="text-4xl md:text-5xl font-bold font-mynabali-serif mb-12 text-zinc-800 dark:text-zinc-100"
                variants={fadeInUp}
            >
                The Problem We Solve
            </motion.h2>

            <motion.div className="grid md:grid-cols-2 gap-8 mb-12 text-left" variants={staggerContainer}>
                <motion.div
                    className={" rounded-xl p-8 shadow-lg border "+
                        "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] " +
                        "transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] " +
                        ""
                }
                    variants={scaleIn}
                >
                    <Brain className="w-12 h-12  mb-4" />
                    <h3 className="text-xl font-bold mb-4 text-zinc-800 dark:text-zinc-100">Limited Emotional Vocabulary</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        Most people struggle to articulate their complex emotional experiences beyond basic terms like "happy," "sad," or "angry," leading to feelings of being misunderstood.
                    </p>
                </motion.div>

                <motion.div
                    className={" rounded-xl p-8 shadow-lg border "+
                        "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] " +
                        "transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] " +
                        ""
                    }
                    variants={scaleIn}
                >
                    <Users className="w-12 h-12  mb-4" />
                    <h3 className="text-xl font-bold mb-4 text-zinc-800 dark:text-zinc-100">Inadequate Support Systems</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        Traditional mood tracking reduces complex feelings to generic categories, leaving users feeling unsupported and disconnected from their true emotional state.
                    </p>
                </motion.div>

                <motion.div
                    className={" rounded-xl p-8 shadow-lg border "+
                        "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] " +
                        "transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] " +
                        ""
                    }
                    variants={scaleIn}
                >
                    <Shield className="w-12 h-12  mb-4" />
                    <h3 className="text-xl font-bold mb-4 text-zinc-800 dark:text-zinc-100">Barriers to Professional Help</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        High costs, long wait times, stigma, and limited accessibility prevent many from getting timely mental health support when they need it most.
                    </p>
                </motion.div>

                <motion.div
                    className={" rounded-xl p-8 shadow-lg border "+
                        "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] " +
                        "transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] " +
                        ""
                    }
                    variants={scaleIn}
                >
                    <Target className="w-12 h-12  mb-4" />
                    <h3 className="text-xl font-bold mb-4 text-zinc-800 dark:text-zinc-100">Reactive vs. Proactive Care</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        Current mental health approaches often wait until crisis points rather than providing tools for daily emotional awareness and prevention.
                    </p>
                </motion.div>
            </motion.div>
        </motion.section>
    )
}
export default Problem;