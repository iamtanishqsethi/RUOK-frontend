import {useEffect, useState, type Dispatch, type SetStateAction, } from "react";
import {ChevronLeft, ChevronRight, LayoutGrid,  Search, X} from "lucide-react";
import type {Emotion, Payload} from "@/utils/types.ts";
import {motion} from "framer-motion";
import {Card, CardDescription, CardHeader} from "@/components/ui/card.tsx";
import {MagicCard} from "@/components/magicui/magic-card.tsx";
import {useTheme} from "@/components/theme-provider.tsx";
import MorphingEmotion from "@/components/Checkin/MorphingEmotion.tsx";
import {toast} from "sonner";
import {Input} from "@/components/ui/input.tsx";
import {
    highEnergyPleasantPrimary,
    highEnergyUnpleasantPrimary,
    lowEnergyPleasantPrimary,
    lowEnergyUnpleasantPrimary
} from "@/utils/constants.ts";

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
    const { theme } = useTheme();
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

    const getEmotionTextStyle = (emotionType: string) => {
        const colorMap = {
            'High Energy Unpleasant': { color: highEnergyUnpleasantPrimary },
            'Low Energy Unpleasant': { color: lowEnergyUnpleasantPrimary },
            'High Energy Pleasant': { color: highEnergyPleasantPrimary },
            'Low Energy Pleasant': { color: lowEnergyPleasantPrimary }
        };
        return colorMap[emotionType as keyof typeof colorMap] || {};
    };

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
            { isSearch ? (
                    <div className="flex flex-col h-screen relative font-secondary">
                        <div className="absolute top-4 md:top-8 px-6 md:px-12 z-20 flex items-center justify-end w-full">
                            <div className="flex flex-col lg:flex-row-reverse items-center space-y-4 lg:space-x-4 lg:space-y-0">
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
                                    className="my-6 rounded-full p-5"
                                    type="text"
                                    value={search}
                                    placeholder="Search for relevant emotion"
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <Search className="absolute right-7 top-1/2 transform -translate-y-1/2 h-5 w-5 text-zinc-400" />
                            </div>

                            <div className="overflow-y-scroll flex flex-col justify-between gap-3 h-[60vh]">
                                {filteredEmotions.length > 0 ? (
                                    filteredEmotions.map((emotion) => {
                                        const isSelected = selectedEmotion?._id === emotion._id;
                                        const emotionStyles = getEmotionStyles(emotion.type, isSelected);

                                        return (
                                            <div
                                                key={emotion._id}
                                                onClick={() => handleEmotionClick(emotion)}
                                                className="md:mx-6 cursor-pointer border px-9 py-2 h-[5em] rounded-full transition-all duration-200 border-zinc-500"
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

                        <div className="flex items-center justify-between z-20 absolute w-full bottom-20 md:bottom-10 px-12">
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
                    </div>)
                :(<div className="h-screen flex flex-col items-center justify-center overflow-hidden relative">
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

                    <div className="flex items-center justify-center z-20 absolute w-full bottom-20 md:bottom-10">
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
                </div>)
            }
        </>
    )
}