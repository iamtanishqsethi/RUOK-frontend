import { useState } from "react";

interface DescriptionFormProps {
    setShowForm: (form: string) => void;
    setShowChart: React.Dispatch<React.SetStateAction<boolean>>;
    setPayload: React.Dispatch<
        React.SetStateAction<{
            emotion: string;
            placeTag: string;
            peopleTag: string;
            activityTag: string;
            description: string;
        }>
    >;
}

const DescriptionForm = ({setShowChart, setShowForm, setPayload }: DescriptionFormProps) => {
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
            setShowChart(true)
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
                    className="mt-4 px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
                    aria-label="Back to Chart"
                >
                    ← Back
                </button>
                <button
                    onClick={handleTags}
                    className="mt-4 px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
                    aria-label="Next to Tags"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default DescriptionForm;