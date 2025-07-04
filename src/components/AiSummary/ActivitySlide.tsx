import { motion } from "framer-motion";

interface ActivitySlideProps {
    positiveHeadline: string;
    negativeHeadline: string;
}

const ActivitySlide = ({ positiveHeadline, negativeHeadline }: ActivitySlideProps) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 p-6"
    >
        <h1>Activities with their impact on your life</h1>
        <h3 className="text-lg font-semibold text-green-600 mb-1">{positiveHeadline}</h3>
        <h3 className="text-lg font-semibold text-red-600 mb-1">{negativeHeadline}</h3>

    </motion.div>
);

export default ActivitySlide;
