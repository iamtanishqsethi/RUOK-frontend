import { useEffect, useState } from "react";
import { Charts } from "./Charts";
import axios from "axios";
import { BASE_URL } from "@/components/utils/constants";
import { toast } from "sonner";
import DescriptionForm from "@/components/Checkin/DescriptionForm";
import TagsForm from "@/components/Checkin/TagsForm";
import { motion, AnimatePresence } from "framer-motion";

interface Emotion {
    id: string;
    title: string;
    description: string;
    type: string;
}

export interface Payload {
    emotion: string;
    placeTag: string;
    peopleTag: string;
    activityTag: string;
    description: string;
}

const CheckIn = () => {
    const [showChart, setShowChart] = useState(false);
    const [showForm, setShowForm] = useState("main");
    const [payload, setPayload] = useState<Payload>({
        emotion: "",
        placeTag: "",
        peopleTag: "",
        activityTag: "",
        description: "",
    });
    const [allEmotions, setAllEmotions] = useState<Emotion[] | null>(null);
    const [filteredEmotions, setFilteredEmotions] = useState<Emotion[] | null>(null);

    const handleMoodClick = (mood: string) => {
        if (!allEmotions) return;
        console.log("Mood selected:", mood);
        const filtered = allEmotions.filter((emotion) => emotion.type === mood);
        console.log("Filtered emotions:", filtered);
        setFilteredEmotions(filtered);
        setShowForm("chart");
        setShowChart(true);
    };

    const addCheckin = async (updatedPayload : Payload) => {
        try {
            const response = await axios.post(`${BASE_URL}/api/checkin/new`, updatedPayload, {
                withCredentials: true,
            });
            console.log("Check-in submitted:", response.data.data);
            toast.success("Check-in submitted successfully!");
            setPayload({
                emotion: "",
                placeTag: "",
                peopleTag: "",
                activityTag: "",
                description: "",
            });
            setShowForm("main");
            setShowChart(false);
            setFilteredEmotions(null);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.error("Axios error:", err);
                toast.error(err.response?.data.message || "Failed to submit check-in");
            } else {
                console.error("Unexpected error:", err);
                toast.error("Internal server error");
            }
        }
    };

    useEffect(() => {
        const getAllEmotions = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/emotion/getAll`, {
                    withCredentials: true,
                });
                console.log("Get All Emotions:", response.data.data);
                setAllEmotions(response.data.data);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    console.error("Axios error:", err);
                    toast.error(err.response?.data.message || "Failed to fetch emotions");
                } else {
                    console.error("Unexpected error:", err);
                    toast.error("Internal server error");
                }
            }
        };
        getAllEmotions();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full p-4 bg-black text-white">
            <AnimatePresence mode="wait">
                {showForm === "main" && (
                    <motion.div
                        key="main"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-wrap w-full max-w-2xl justify-between gap-4 mb-10"
                    >
                        {["High Energy Unpleasant", "Low Energy Unpleasant", "High Energy Pleasant", "Low Energy Pleasant"].map(
                            (mood, idx) => {
                                const colorMap = [
                                    "bg-red-100 text-red-800 hover:bg-red-200",
                                    "bg-blue-100 text-blue-800 hover:bg-blue-200",
                                    "bg-green-100 text-green-800 hover:bg-green-200",
                                    "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
                                ];
                                return (
                                    <button
                                        key={mood}
                                        className={`flex-1 min-w-[45%] rounded-full py-6 px-4 text-center transition ${colorMap[idx]}`}
                                        onClick={() => handleMoodClick(mood)}
                                        aria-label={`Select ${mood} mood`}
                                    >
                                        {mood}
                                    </button>
                                );
                            }
                        )}
                    </motion.div>
                )}

                {showChart && showForm === "chart" && filteredEmotions && (
                    <motion.div
                        key="chart"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.4 }}
                        className="w-full max-w-4xl"
                    >
                        <Charts
                            setShowChart={setShowChart}
                            setShowForm={setShowForm}
                            setPayload={setPayload}
                            filteredEmotions={filteredEmotions}
                        />
                    </motion.div>
                )}

                {showForm === "description" && (
                    <motion.div
                        key="description"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.4 }}
                        className="w-full max-w-2xl"
                    >
                        <DescriptionForm setShowChart={setShowChart} setShowForm={setShowForm} setPayload={setPayload} />
                    </motion.div>
                )}

                {showForm === "tags" && (
                    <motion.div
                        key="tags"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -40 }}
                        transition={{ duration: 0.4 }}
                        className="w-full max-w-3xl"
                    >
                        <TagsForm
                            setShowForm={setShowForm}
                            setPayload={setPayload}
                            payload={payload}
                            addCheckin={addCheckin}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CheckIn;