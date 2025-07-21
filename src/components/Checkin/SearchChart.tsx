import {ChevronLeft, ChevronRight, LayoutGrid, Search, X} from "lucide-react";
import { Input } from "../ui/input";
import {
    highEnergyPleasantPrimary,
    highEnergyUnpleasantPrimary,
    lowEnergyPleasantPrimary,
    lowEnergyUnpleasantPrimary
} from "@/utils/constants.ts";
import type {Dispatch, SetStateAction} from "react";
import type { Emotion } from "@/utils/types";

interface SearchChartProps {
    setIsSearch:Dispatch<SetStateAction<boolean>>
    selectedEmotion:Emotion|null
    setSelectedEmotion:Dispatch<SetStateAction<Emotion|null>>
    search:string
    setSearch:Dispatch<SetStateAction<string>>
    filteredEmotions:Emotion[]
    handleEmotionClick:(emotion:Emotion)=>void
    handleBack:()=>void
    handleDescIncident:()=>void
}

const SearchChart = ({setIsSearch,selectedEmotion,setSelectedEmotion,search,setSearch,filteredEmotions,handleEmotionClick,handleBack,handleDescIncident}:SearchChartProps) => {

    const getEmotionStyles = (emotionType: string, isSelected: boolean = false) => {
        const colorMap = {
            'High Energy Unpleasant': isSelected
                ? { color: '#ffffff', backgroundColor: highEnergyUnpleasantPrimary }
                : { color: highEnergyUnpleasantPrimary },
            'Low Energy Unpleasant': isSelected
                ? { color: '#ffffff', backgroundColor: lowEnergyUnpleasantPrimary }
                : { color: lowEnergyUnpleasantPrimary },
            'High Energy Pleasant': isSelected
                ? { color: '#ffffff', backgroundColor: highEnergyPleasantPrimary }
                : { color: highEnergyPleasantPrimary },
            'Low Energy Pleasant': isSelected
                ? { color: '#ffffff', backgroundColor: lowEnergyPleasantPrimary }
                : { color: lowEnergyPleasantPrimary }
        };
        return colorMap[emotionType as keyof typeof colorMap] || {};
    };
    return (
        <div className="flex flex-col h-screen relative font-secondary">
            <div className="absolute top-4 md:top-8 px-6 md:px-12 z-20 flex items-center justify-end w-full">
                <div className="flex flex-col lg:flex-row-reverse items-center gap-2">
                    <button
                        onClick={() => setIsSearch(false)}
                        className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg bg-black/40 backdrop-blur-2xl text-white transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer">
                        <LayoutGrid className="w-6 h-6 md:w-7 md:h-7 stroke-[2]"/>
                    </button>
                    {selectedEmotion !== null &&
                        <button
                            onClick={() => setSelectedEmotion(null)}
                            className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg bg-black/40 backdrop-blur-2xl text-white transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer">
                            <X className="w-6 h-6 md:w-7 md:h-7 stroke-[2]"/>
                        </button>
                    }
                </div>
            </div>

            <div className="p-6 md:p-10">
                <h1 className="text-2xl md:text-5xl font-semibold mb-4 pr-18 font-mynabali-serif">
                    Which Emotion matches how you feel the best?
                </h1>
                <div className="relative px-4">
                    <Input
                        className="my-6 rounded-full p-5 border-2"
                        type="text"
                        value={search}
                        placeholder="Search for relevant emotion"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Search className="absolute right-7 top-1/2 transform -translate-y-1/2 h-5 w-5 text-zinc-400" />
                </div>

                <div className="overflow-y-scroll flex flex-col  gap-3 h-[55vh] md:h-[60vh] scroll-smooth">
                    {filteredEmotions.length > 0 ? (
                        filteredEmotions.map((emotion) => {
                            const isSelected = selectedEmotion?._id === emotion._id;
                            const emotionStyles = getEmotionStyles(emotion.type, isSelected);

                            return (
                                <div
                                    key={emotion._id}
                                    onClick={() => handleEmotionClick(emotion)}
                                    className="md:mx-6 cursor-pointer border px-9 py-2 h-auto md:h-[5rem] rounded-full transition-all duration-200
                                                bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]
                                                transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0px_-10px_20px_-10px_#ffffff1f_inset] "
                                    style={emotionStyles}
                                    role="button"
                                    tabIndex={0}
                                    aria-label={`Select ${emotion.title}`}
                                >
                                    <h1 className="font-medium text-lg">{emotion.title}</h1>
                                    <p className="text-sm text-zinc-400 font-medium">{emotion.description}</p>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-sm text-zinc-500 mt-4 w-full text-center">
                            No emotions found for this search.
                        </p>
                    )}
                </div>
            </div>

            <div className="flex items-center justify-between z-20 absolute w-full bottom-24 md:bottom-10 px-12">
                <button
                    onClick={handleBack}
                    className="border w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg bg-black/40 backdrop-blur-2xl text-white transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                    aria-label="Back to Mood Selection"
                >
                    <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 stroke-[2]"/>
                </button>

                <button
                    onClick={handleDescIncident}
                    className="border w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg bg-black/40 backdrop-blur-2xl text-white transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                    aria-label="Describe the Incident"
                >
                    <ChevronRight className="w-6 h-6 md:w-7 md:h-7 stroke-[2]"/>
                </button>
            </div>
        </div>
    )
}

export default SearchChart;