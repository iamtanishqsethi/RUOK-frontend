import { motion } from "framer-motion";

interface SuggestionSlideProps {
    activitySuggestions: string[];
    placeSuggestions: string[];
    peopleSuggestions: string[];
    generalSuggestions: string[];
}

const SuggestionSlide = ({
                             activitySuggestions,
                             placeSuggestions,
                             peopleSuggestions,
                             generalSuggestions,
                         }: SuggestionSlideProps) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 p-6"
    >
        <h3 className="text-xl font-bold mb-3 text-indigo-600">Suggested Next Steps</h3>

        <div className="grid gap-3 text-sm text-zinc-700 dark:text-zinc-300">
            <div>
                <h4 className="font-medium">Activities:</h4>
                <ul className="list-disc pl-5">{activitySuggestions.map((s, i) => <li key={i}>{s}</li>)}</ul>
            </div>

            <div>
                <h4 className="font-medium">Places:</h4>
                <ul className="list-disc pl-5">{placeSuggestions.map((s, i) => <li key={i}>{s}</li>)}</ul>
            </div>

            <div>
                <h4 className="font-medium">People:</h4>
                <ul className="list-disc pl-5">{peopleSuggestions.map((s, i) => <li key={i}>{s}</li>)}</ul>
            </div>

            <div>
                <h4 className="font-medium">General:</h4>
                <ul className="list-disc pl-5">{generalSuggestions.map((s, i) => <li key={i}>{s}</li>)}</ul>
            </div>
        </div>
    </motion.div>
);

export default SuggestionSlide;
