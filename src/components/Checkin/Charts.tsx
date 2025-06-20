import {useEffect, useState, type Dispatch, type SetStateAction} from "react";
import {ChevronLeft, ChevronRight, Search} from "lucide-react";
import type {Emotion, Payload} from "@/utils/types.ts";


interface ChartsProps {
    setShowForm: (form: string) => void;
    setPayload: Dispatch<SetStateAction<{
        emotion: string;
        placeTag?: string;
        peopleTag?: string;
        activityTag?: string;
        description?: string;
    }>>
    emotionsList: Emotion[];
}

export function Charts({ setShowForm, setPayload, emotionsList }: ChartsProps) {

    const [search, setSearch] = useState<string>("");
    const [filteredEmotions, setFilteredEmotions] = useState<Emotion[]>(emotionsList);
    const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        // Filter emotions by search input
        try {
            const lowerSearch = search.toLowerCase();
            const filtered = emotionsList.filter(
                (emotion) =>
                    emotion.title.toLowerCase().includes(lowerSearch) ||
                    emotion.description.toLowerCase().includes(lowerSearch)
            );
            setFilteredEmotions(filtered);
            setError("");
        } catch (err) {
            setError("Error processing search. Please try again.");
            console.error("Search error:", err);
        }
    }, [search, emotionsList]);


    const handleEmotionClick = (emotion: Emotion) => {
        try {
            setSelectedEmotion(emotion);
            setPayload((prev: Payload) => ({ ...prev, emotion: emotion.title }));

        } catch (err) {
            setError("Failed to select emotion. Please try again.");
            console.error("Emotion select error:", err);
        }
    };

    const handleDescIncident = () => {
        if (!selectedEmotion) {
            setError("Please select an emotion before proceeding.");
            return;
        }
        setShowForm("description");
    };

    const handleBack = () => {
        setShowForm("main");
        setPayload((prev: Payload) => ({ ...prev, emotion: "" }));
        setSearch("");
        setSelectedEmotion(null);
        setError("");
    };

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
                    {filteredEmotions.length > 0 ? (
                        filteredEmotions.map((emotion) => (
                            <div
                                key={emotion._id}
                                onClick={() => handleEmotionClick(emotion)}
                                className={`cursor-pointer border-2 p-4 w-[49%] h-[5em] rounded-2xl transition-all duration-200 ${
                                    selectedEmotion?._id === emotion._id
                                        ? "border-red-600 bg-pink-100/20"
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
                    className="w-18 h-18 rounded-full flex items-center justify-center shadow-lg bg-zinc-900 dark:bg-white text-white dark:text-black
             transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                    aria-label="Back to Mood Selection"
                >
                    <ChevronLeft className="w-10 h-10 stroke-[2]" />
                </button>

                <button
                    onClick={handleDescIncident}
                    className="w-18 h-18 rounded-full flex items-center justify-center shadow-lg bg-zinc-900 dark:bg-white text-white dark:text-black
             transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                    aria-label="Describe the Incident"
                >
                    <ChevronRight className="w-10 h-10 stroke-[2]" />
                </button>


            </div>
        </div>
    );
}