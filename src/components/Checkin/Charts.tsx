import { useEffect, useState } from "react";
import { Search } from "lucide-react";

interface Emotion {
    id: string;
    title: string;
    description: string;
}

interface ChartsProps {
    setShowChart: React.Dispatch<React.SetStateAction<boolean>>;
    setShowForm: (form: string) => void;
    setPayload: React.Dispatch<React.SetStateAction<any>>;
    filteredEmotions: Emotion[];
}

export function Charts({ setShowChart, setShowForm, setPayload, filteredEmotions }: ChartsProps) {
    const [search, setSearch] = useState<string>("");
    const [results, setResults] = useState<Emotion[]>(filteredEmotions);
    const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
    const [error, setError] = useState<string>("");

    const handleEmotionClick = (emotion: Emotion) => {
        try {
            setSelectedEmotion(emotion);
            setSearch(emotion.title);
            setPayload((prev: any) => ({ ...prev, emotion: emotion.title }));
            setError("");
        } catch (err) {
            setError("Failed to select emotion. Please try again.");
            console.error("Error selecting emotion:", err);
        }
    };

    const handleDescIncident = () => {
        if (!selectedEmotion) {
            setError("Please select an emotion before proceeding.");
            return;
        }
        try {
            setShowChart(false);
            setShowForm("description");
        } catch (err) {
            setError("Failed to navigate to description form. Please try again.");
            console.error("Navigation error:", err);
        }
    };

    const handleBack = () => {
        try {
            setShowChart(false);
            setShowForm("main");
            setPayload((prev: any) => ({ ...prev, emotion: "" }));
            setSearch("");
            setSelectedEmotion(null);
            setError("");
        } catch (err) {
            setError("Failed to return to mood selection. Please try again.");
            console.error("Back navigation error:", err);
        }
    };

    useEffect(() => {
        try {
            const lowerSearch = search.toLowerCase();
            const filtered = filteredEmotions.filter(
                (emotion) =>
                    emotion.title.toLowerCase().includes(lowerSearch) ||
                    emotion.description.toLowerCase().includes(lowerSearch)
            );
            setResults(filtered);
            setError("");
        } catch (err) {
            setError("Error processing search. Please try again.");
            console.error("Search error:", err);
        }
    }, [search, filteredEmotions]);

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-xl font-semibold mb-4">
                    Which Emotion matches how you feel the best?
                </h1>

                <div className="relative mb-4">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search for relevant emotion..."
                        className="w-full px-4 py-2 pl-10 border-2 border-violet-500 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        aria-label="Search emotions"
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>

                <div className="overflow-y-auto flex flex-wrap justify-between gap-3 h-[50vh]">
                    {results.length > 0 ? (
                        results.map((emotion) => (
                            <div
                                key={emotion.id}
                                onClick={() => handleEmotionClick(emotion)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        handleEmotionClick(emotion);
                                    }
                                }}
                                className={`cursor-pointer border-2 p-4 w-[49%] h-[5em] rounded-2xl transition-all duration-200 ${
                                    selectedEmotion?.id === emotion.id
                                        ? "border-pink-400 bg-pink-100/20"
                                        : "border-gray-300 hover:border-pink-400"
                                }`}
                                role="button"
                                tabIndex={0}
                                aria-label={`Select ${emotion.title}`}
                            >
                                <h1 className="font-medium text-lg">{emotion.title}</h1>
                                <p className="text-sm text-gray-500 line-clamp-3">{emotion.description}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-gray-400 mt-4 w-full text-center">
                            No emotions found for this search.
                        </p>
                    )}
                </div>
            </div>

            <div className="flex justify-between">
                <button
                    onClick={handleBack}
                    className="mt-4 px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
                    aria-label="Back to Mood Selection"
                >
                    ← Back
                </button>
                <button
                    onClick={handleDescIncident}
                    className="mt-4 px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
                    aria-label="Describe the Incident"
                >
                    Describe the Incident
                </button>
            </div>
        </div>
    );
}