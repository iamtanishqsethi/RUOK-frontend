import { motion } from "motion/react";
import {Heart} from "lucide-react";

const Mission = () => {
    const scaleIn = {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.5, ease: "easeOut" }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <motion.section
            className="py-8 px-4 max-w-6xl mx-auto text-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
        >
            <motion.div
                className="bg-gradient-to-br  rounded-2xl p-8 md:p-12 border "
                variants={scaleIn}
            >
                <Heart className="w-16 h-16  mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold font-mynabali-serif mb-6 text-zinc-800 dark:text-zinc-100">
                    Our Mission
                </h2>
                <p className="text-lg md:text-xl text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-4xl mx-auto">
                    We've built what we wished we had during our darkest moments. Our vision is simple yet powerful:
                    empower you to <span className="font-bold ">recognize</span>,
                    <span className="font-bold "> process</span>, and
                    <span className="font-bold "> act</span> on your emotions - before they spiral out of control.
                </p>
            </motion.div>
        </motion.section>
    )
}
export default Mission;