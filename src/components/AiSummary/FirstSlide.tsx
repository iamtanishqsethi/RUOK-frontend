import { motion } from "framer-motion";

interface FirstSlideProps {
    nickname: string;
    description: string;
}

const FirstSlide = ({ nickname, description }: FirstSlideProps) => {
    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
            className="rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 p-6 shadow-sm"
        >
            <h3 className="text-xl font-bold mb-2">Your Persona: <span className="text-indigo-600">{nickname}</span>
            </h3>
            <p className="text-zinc-600 dark:text-zinc-300">{description}</p>
        </motion.div>
    )

};

export default FirstSlide;
