import {ChevronLeft, ChevronRight, Search, X} from "lucide-react";
import type {Emotion} from "@/utils/types.ts";
import type {Dispatch, SetStateAction} from "react";
import { motion } from "motion/react";
import {
    highEnergyPleasantPrimary,
    highEnergyUnpleasantPrimary,
    lowEnergyPleasantPrimary,
    lowEnergyUnpleasantPrimary
} from "@/utils/constants.ts";
import MorphingEmotion from "@/components/Checkin/MorphingEmotion.tsx";
import {Card, CardDescription, CardHeader} from "@/components/ui/card.tsx";
import { MagicCard } from "../magicui/magic-card";
import {useTheme} from "@/components/theme-provider.tsx";

interface GridChartProps {
    handleBack:()=>void
    selectedEmotion:Emotion|null
    setSelectedEmotion:Dispatch<SetStateAction<Emotion|null>>
    setIsSearch:Dispatch<SetStateAction<boolean>>
    emotionsList: Emotion[];
    handleEmotionClick:(emotion:Emotion)=>void
    handleDescIncident:()=>void
}

const GridChart = ({handleBack,selectedEmotion,setSelectedEmotion,setIsSearch,emotionsList,handleEmotionClick,handleDescIncident}:GridChartProps) => {

    const getEmotionTextStyle = (emotionType: string) => {
        const colorMap = {
            'High Energy Unpleasant': { color: highEnergyUnpleasantPrimary },
            'Low Energy Unpleasant': { color: lowEnergyUnpleasantPrimary },
            'High Energy Pleasant': { color: highEnergyPleasantPrimary },
            'Low Energy Pleasant': { color: lowEnergyPleasantPrimary }
        };
        return colorMap[emotionType as keyof typeof colorMap] || {};
    }

    const { theme } = useTheme();

    return (
        <div className="h-screen flex flex-col items-center justify-center overflow-hidden relative">
            <div className="absolute top-4 md:top-8 px-6 md:px-12 z-20 flex items-center justify-between w-full">
                <button
                    onClick={handleBack}
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg bg-black/40 backdrop-blur-2xl text-white transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                    aria-label="Back to Mood Selection"
                >
                    <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 stroke-[2]"/>
                </button>
                <div className="flex items-center space-x-4">
                    {selectedEmotion !== null &&
                        <button
                            onClick={() => setSelectedEmotion(null)}
                            className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg bg-black/40 backdrop-blur-2xl text-white transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer">
                            <X className="w-6 h-6 md:w-7 md:h-7 stroke-[2]"/>
                        </button>
                    }
                    <button
                        onClick={() => setIsSearch(true)}
                        className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg bg-black/40 backdrop-blur-2xl text-white transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer">
                        <Search className="w-6 h-6 md:w-7 md:h-7 stroke-[2]"/>
                    </button>
                </div>
            </div>

            <motion.div
                className="absolute flex flex-wrap items-center justify-center gap-2 p-4 cursor-grab active:cursor-grabbing"
                style={{
                    width: '2480px',
                }}
                drag
                dragConstraints={{
                    left: -1700,
                    right: 1700,
                    top: -2500,
                    bottom: 2500,
                }}
                dragElastic={0.1}
                dragMomentum={false}
                whileDrag={{
                    scale: 0.98,
                    cursor: 'grabbing',
                }}
                initial={{x: 0, y: 0}}
            >
                {emotionsList.map((emotion) => (
                    <div
                        key={emotion._id}
                        onClick={() => handleEmotionClick(emotion)}
                    >
                        <MorphingEmotion
                            _id={emotion._id}
                            type={emotion.type}
                            title={emotion.title}
                            description={emotion.description}
                        />
                    </div>
                ))}
            </motion.div>

            <div className="flex items-center justify-center z-20 absolute w-full bottom-24 md:bottom-10">
                {selectedEmotion !== null &&
                    <motion.div
                        initial={{opacity: 0, y: 50}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: 50}}
                        transition={{duration: 0.5}}
                    >
                        <Card className="w-90 md:w-150 rounded-full h-20 md:h-28 p-0 m-0">
                            <MagicCard className="w-full h-full py-8 px-5 flex flex-col justify-center"
                                       gradientColor={theme === "dark" ? "#252525" : "#D9D9D955"}
                            >
                                <div className="flex items-center justify-between w-full">
                                    <div className="px-2">
                                        <CardHeader className="gap-0 p-0 text-base md:text-lg font-medium my-0" style={getEmotionTextStyle(selectedEmotion.type)}>
                                            {selectedEmotion?.title}
                                        </CardHeader>
                                        <CardDescription className="my-0 p-0 text-xs sm:text-base">
                                            {selectedEmotion?.description}
                                        </CardDescription>
                                    </div>
                                    <button
                                        className="w-12 md:w-18 h-12 md:h-18 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black rounded-full cursor-pointer flex items-center justify-center"
                                        onClick={handleDescIncident}
                                    >
                                        <ChevronRight className="w-8 md:w-10 h-8 md:h-10 stroke-[2]"/>
                                    </button>
                                </div>
                            </MagicCard>
                        </Card>
                    </motion.div>
                }
            </div>
        </div>
    )
}
export default GridChart;