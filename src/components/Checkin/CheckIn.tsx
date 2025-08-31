import { useState } from "react";
import { Charts } from "./Charts";
import axios from "axios";
import {
    BASE_URL,
    highEnergyPleasantAccent,
    highEnergyPleasantGlow,
    highEnergyPleasantPrimary,
    highEnergyPleasantSecondary,
    highEnergyUnpleasantAccent,
    highEnergyUnpleasantGlow,
    highEnergyUnpleasantPrimary,
    highEnergyUnpleasantSecondary,
    lowEnergyPleasantAccent,
    lowEnergyPleasantGlow,
    lowEnergyPleasantPrimary,
    lowEnergyPleasantSecondary,
    lowEnergyUnpleasantAccent,
    lowEnergyUnpleasantGlow,
    lowEnergyUnpleasantPrimary,
    lowEnergyUnpleasantSecondary
} from "@/utils/constants";
import { toast } from "sonner";
import DescriptionForm from "@/components/Checkin/DescriptionForm";
import TagsForm from "@/components/Checkin/TagsForm";
import { motion, AnimatePresence } from "framer-motion";
import type {Emotion, Payload} from "@/utils/types.ts";
import useGetAllEmotions from "@/utils/hooks/useGetAllEmotions.ts";
import {useSelector} from "react-redux";
import MorphingWaveButton from "@/components/Checkin/MorphingButton.tsx";
import { useNavigate } from "react-router-dom";
import mixpanelService from "@/services/MixpanelService.ts";



const CheckIn = () => {



    //fetching emotions
    useGetAllEmotions()

    const navigate = useNavigate();
    const [showForm, setShowForm] = useState("main");
    const [payload, setPayload] = useState<Payload>({emotion:""})
    const [isLoading,setIsLoading]=useState(false)

    //getting emotions directly from the redux store
    const allEmotions=useSelector((store:{emotion:Emotion[]|null})=>store.emotion)
    const [filteredEmotions, setFilteredEmotions] = useState<Emotion[] | null>(allEmotions)

     const colorMap = [

        {
            text:'High Energy Unpleasant',
            primary:highEnergyUnpleasantPrimary ,
            secondary: highEnergyUnpleasantSecondary,
            accent: highEnergyUnpleasantAccent,
            glow:  highEnergyUnpleasantGlow
        },
        {
            text:'Low Energy Unpleasant',
            primary: lowEnergyUnpleasantPrimary,
            secondary: lowEnergyUnpleasantSecondary,
            accent: lowEnergyUnpleasantAccent,
            glow: lowEnergyUnpleasantGlow
        },
        {
            text:'High Energy Pleasant',
            primary: highEnergyPleasantPrimary,
            secondary: highEnergyPleasantSecondary,
            accent: highEnergyPleasantAccent,
            glow: highEnergyPleasantGlow
        },
        {
            text:'Low Energy Pleasant',
            primary: lowEnergyPleasantPrimary,
            secondary: lowEnergyPleasantSecondary,
            accent: lowEnergyPleasantAccent,
            glow: lowEnergyPleasantGlow
        }

    ];

    const handleMoodClick = (mood: string) => {
        mixpanelService.trackButtonClick(`Mode Clicked ${mood}`, { location: 'Check-in' });
        if (!allEmotions) return;
        const filteredEmotions = allEmotions.filter((emotion) => emotion.type === mood);
        setFilteredEmotions(filteredEmotions);
        setShowForm("chart");

    };

    const addCheckin = async () => {
        try {
            setIsLoading(true)
             await axios.post(`${BASE_URL}/checkin/new`, payload, {
                withCredentials: true,
            });
            // console.log("Check-in submitted:", response.data.data);
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
        finally {
            setIsLoading(false)
        }
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full   ">
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
                        <h1 className={'text-2xl font-bold tracking-tight md:text-5xl mb-12 font-mynabali-serif text-center'}>
                            How do you feel right now ?
                        </h1>
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
                            isLoading={isLoading}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CheckIn;