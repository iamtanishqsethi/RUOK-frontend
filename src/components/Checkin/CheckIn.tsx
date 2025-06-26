import { useState } from "react";
import { Charts } from "./Charts";
import axios from "axios";
import { BASE_URL } from "@/utils/constants";
import { toast } from "sonner";
import DescriptionForm from "@/components/Checkin/DescriptionForm";
import TagsForm from "@/components/Checkin/TagsForm";
import { motion, AnimatePresence } from "framer-motion";
import type {Emotion, Payload} from "@/utils/types.ts";
import useGetAllEmotions from "@/utils/hooks/useGetAllEmotions.ts";
import {useSelector} from "react-redux";

import MorphingWaveButton from "@/components/Checkin/MorphingButton.tsx";
import { useNavigate } from "react-router-dom";



const CheckIn = () => {



    //fetching emotions
    useGetAllEmotions()

    const navigate = useNavigate();
    const [showForm, setShowForm] = useState("main");
    const [payload, setPayload] = useState<Payload>({emotion:""})

    //getting emotions directly from the redux store
    const allEmotions=useSelector((store:{emotion:Emotion[]|null})=>store.emotion)
    const [filteredEmotions, setFilteredEmotions] = useState<Emotion[] | null>(allEmotions)

     const colorMap = [

        {
            text:'High Energy Unpleasant',
            primary: '#bf1b1b',
            secondary: '#bd3636',
            accent: '#8c0000',
            glow: '#bd7171'
        },
        {
            text:'Low Energy Unpleasant',
            primary: '#1851d1',
            secondary: '#3276e4',
            accent: '#003b81',
            glow: '#729fd3'
        },
        {
            text:'High Energy Pleasant',
            primary: '#cc6e02',
            secondary: '#e49207',
            accent: '#9c7000',
            glow: '#e8c03f'
        },
        {
            text:'Low Energy Pleasant',
            primary: '#01875d',
            secondary: '#0ea875',
            accent: '#008c5a',
            glow: '#54bd94'
        }

    ];

    const handleMoodClick = (mood: string) => {
        if (!allEmotions) return;
        const filteredEmotions = allEmotions.filter((emotion) => emotion.type === mood);
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
            navigate('/main/')
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
                        className="w-full "
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
                        className="w-full "
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
                        className="w-full "
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