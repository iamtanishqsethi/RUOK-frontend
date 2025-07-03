import { motion } from "framer-motion";

interface PeopleSlideProps {
    positiveHeadline: string;
    negativeHeadline: string;
}

const PeopleSlide = ({positiveHeadline, negativeHeadline }: PeopleSlideProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 p-6"
        >
            <h1>How different People have affect you</h1>
            <h3 className="text-lg font-semibold text-green-600 mb-1">
                {positiveHeadline}
            </h3>
            <h3 className="text-lg font-semibold text-red-600 mb-1">
                {negativeHeadline}
            </h3>

        </motion.div>
    );
};

export default PeopleSlide;
