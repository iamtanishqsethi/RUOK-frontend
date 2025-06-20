import { useState } from "react";
import { Charts } from "./Charts";
import axios from "axios";
import { BASE_URL } from "@/utils/constants";
import { toast } from "sonner";
import DescriptionForm from "@/components/Checkin/DescriptionForm";
import TagsForm from "@/components/Checkin/TagsForm";
import { motion, AnimatePresence } from "framer-motion";
import type {Emotion, Payload} from "@/utils/types.ts";
import useGetAllEmotions from "@/utils/useGetAllEmotions.ts";
import {useSelector} from "react-redux";

import MorphingWaveButton from "@/components/Checkin/MorphingButton.tsx";



const CheckIn = () => {



    //fetching emotions
    useGetAllEmotions()


    const [showForm, setShowForm] = useState("main");
    const [payload, setPayload] = useState<Payload>({emotion:""})

    //getting emotions directly from the redux store
    const allEmotions=useSelector((store:{emotion:Emotion[]|null})=>store.emotion)
    const [filteredEmotions, setFilteredEmotions] = useState<Emotion[] | null>(allEmotions)

    const colorMap = [

        {
            text:'High Energy Unpleasant',
            primary: '#dc2626',   // Red-600
            secondary: '#ef4444', // Red-500
            accent: '#f87171',    // Red-400
            glow: '#fca5a5'       // Red-300
        },
        {
            text:'Low Energy Unpleasant',
            primary: '#2563eb',   // Blue-600
            secondary: '#3b82f6', // Blue-500
            accent: '#60a5fa',    // Blue-400
            glow: '#93c5fd'       // Blue-300
        },
        {
            text:'High Energy Pleasant',
            primary: '#d97706',   // Amber-600
            secondary: '#f59e0b', // Amber-500
            accent: '#fbbf24',    // Amber-400
            glow: '#fcd34d'       // Amber-300
        },
        {
            text:'Low Energy Pleasant',
            primary: '#059669',   // Emerald-600
            secondary: '#10b981', // Emerald-500
            accent: '#34d399',    // Emerald-400
            glow: '#6ee7b7'       // Emerald-500
        }

    ];

    const handleMoodClick = (mood: string) => {
        if (!allEmotions) return;
        console.log("Mood selected:", mood);
        const filteredEmotions = allEmotions.filter((emotion) => emotion.type === mood);
        console.log("Filtered emotions:", filteredEmotions);
        setFilteredEmotions(filteredEmotions);
        setShowForm("chart");

    };

    const addCheckin = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/api/checkin/new`, payload, {
                withCredentials: true,
            });
            console.log("Check-in submitted:", response.data.data);
            toast.success("Check-in submitted successfully!");
            setPayload({emotion: ""})
            setShowForm("main");
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


    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full p-4  ">
            <AnimatePresence mode="wait">
                {showForm === "main" && (
                    <motion.div
                        key="main"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.4 }}
                        className={'flex flex-col items-center justify-center h-screen'}

                    >
                        <h1 className={'text-3xl font-bold tracking-tight md:text-5xl mb-12 italic'}>How you feel right now ?</h1>
                        <div className="grid grid-cols-2 grid-row-2  items-center justify-center gap-4 ">
                            {colorMap.map( (mood, idx) => (

                                <div key={idx} onClick={()=>handleMoodClick(mood.text)}>
                                    <MorphingWaveButton
                                        text={mood.text}
                                        primary={mood.primary}
                                        secondary={mood.secondary}
                                        accent={mood.accent}
                                        glow={mood.glow}
                                    />
                                </div>
                            ))
                            }
                        </div>


                    </motion.div>
                )}

                {showForm === "chart" && filteredEmotions && (
                    <motion.div
                        key="chart"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.4 }}
                        className="w-full max-w-4xl"
                    >
                        <Charts
                            setShowForm={setShowForm}
                            setPayload={setPayload}
                            emotionsList={filteredEmotions}
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
                        <DescriptionForm
                            setShowForm={setShowForm}
                            setPayload={setPayload}
                        />
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
                            addCheckin={addCheckin}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CheckIn;