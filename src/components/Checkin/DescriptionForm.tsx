import {type Dispatch, type SetStateAction, useState,} from "react";
import {ChevronLeft, ChevronRight} from "lucide-react";

interface DescriptionFormProps {
    setShowForm: (form: string) => void;
    setPayload: Dispatch<
        SetStateAction<{
            emotion: string;
            placeTag?: string;
            peopleTag?: string;
            activityTag?: string;
            description?: string;
        }>
    >;
}

const DescriptionForm = ({ setShowForm, setPayload }: DescriptionFormProps) => {
    const [input, setInput] = useState("");
    const [error, setError] = useState("");

    const handleTags = () => {

        try {
            setPayload((prev) => ({ ...prev, description: input.trim() }));
            setShowForm("tags");
            setError("");
        } catch (err) {
            setError("Failed to save description. Please try again.");
            console.error("Description error:", err);
        }
    };

    const handleBack = () => {
        try {
            // setShowChart(true)
            setShowForm("chart");
            setError("");
        } catch (err) {
            setError("Failed to return to chart. Please try again.");
            console.error("Back navigation error:", err);
        }
    };

    return (
        <div className="w-full max-w-2xl flex flex-col gap-10 mt-20 text-white">
            <h1 className="text-4xl font-bold">
                Describe How You Feel{" "}
                <span className="text-pink-400">(Don’t worry, it’s a secret!)</span>
            </h1>

            <div className="relative w-full">
        <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={6}
            className="peer w-full rounded-xl border-2 border-violet-500 bg-black px-4 pt-6 pb-3 text-base text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
            placeholder="Spill your heart out here"
            aria-label="Description"
        />
                <label
                    htmlFor="description"
                    className="absolute left-4 top-3 text-sm text-blue-300 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-violet-400 peer-focus:top-3 peer-focus:text-sm peer-focus:text-pink-400"
                >
                    Spill your heart out here...
                </label>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
            <div className="flex justify-between mt-10 text-white">
                <button
                    onClick={handleBack}
                    className="w-18 h-18 rounded-full flex items-center justify-center shadow-lg bg-zinc-900 dark:bg-white text-white dark:text-black
             transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                    aria-label="Back to Chart"
                >
                    <ChevronLeft className="w-10 h-10 stroke-[2]" />
                </button>
                <button
                    onClick={handleTags}
                    className="w-18 h-18 rounded-full flex items-center justify-center shadow-lg bg-zinc-900 dark:bg-white text-white dark:text-black
             transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                    aria-label="Next to Tags"
                >
                    <ChevronRight className="w-10 h-10 stroke-[2]" />
                </button>
            </div>
        </div>
    );
};

export default DescriptionForm;