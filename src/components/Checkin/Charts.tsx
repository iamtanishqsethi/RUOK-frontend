import {useEffect, useState, type Dispatch, type SetStateAction, } from "react";
import type {Emotion, Payload} from "@/utils/types.ts";
import {toast} from "sonner";
import SearchChart from "@/components/Checkin/SearchChart.tsx";
import GridChart from "@/components/Checkin/GridChart.tsx";

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
    const [isSearch, setIsSearch] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");
    const [filteredEmotions, setFilteredEmotions] = useState<Emotion[]>(emotionsList);
    const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);

    useEffect(() => {
        try {
            const lowerSearch = search.toLowerCase();
            const filtered = emotionsList.filter(
                (emotion) =>
                    emotion.title.toLowerCase().includes(lowerSearch) ||
                    emotion.description.toLowerCase().includes(lowerSearch)
            );
            setFilteredEmotions(filtered);
        } catch (err) {
            toast.error("Error processing search. Please try again.");
            console.error("Search error:", err);
        }
    }, [search, emotionsList]);




    const handleEmotionClick = (emotion: Emotion) => {
        try {
            setSelectedEmotion(emotion);
            setPayload((prev: Payload) => ({ ...prev, emotion: emotion.title }));

        } catch (err) {
            toast.error("Failed to select emotion. Please try again.");
            console.error("Emotion select error:", err);
        }
    };

    const handleDescIncident = () => {
        if (!selectedEmotion) {
            toast.error("Please select an emotion before proceeding.");
            return;
        }
        setShowForm("description");
    };

    const handleBack = () => {
        setShowForm("main");
        setPayload((prev: Payload) => ({ ...prev, emotion: "" }));
        setSearch("");
        setSelectedEmotion(null);
    };

    return (
        <>
            { isSearch ? <SearchChart
                setIsSearch={setIsSearch}
                selectedEmotion={selectedEmotion}
                setSelectedEmotion={setSelectedEmotion}
                search={search}
                setSearch={setSearch}
                filteredEmotions={filteredEmotions}
                handleEmotionClick={handleEmotionClick}
                handleBack={handleBack}
                handleDescIncident={handleDescIncident}

                />
                :<GridChart
                    handleBack={handleBack}
                    selectedEmotion={selectedEmotion}
                    setSelectedEmotion={setSelectedEmotion}
                    setIsSearch={setIsSearch}
                    emotionsList={emotionsList}
                    handleEmotionClick={handleEmotionClick}
                    handleDescIncident={handleDescIncident}
                />
            }
        </>
    )
}