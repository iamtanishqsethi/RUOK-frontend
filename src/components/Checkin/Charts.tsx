import {useEffect, useState, type Dispatch, type SetStateAction, } from "react";
import {ChevronLeft, ChevronRight, LayoutGrid,  Search, X} from "lucide-react";
import type {Emotion, Payload} from "@/utils/types.ts";
import {motion} from "framer-motion";
import {Card, CardDescription, CardHeader} from "@/components/ui/card.tsx";
import {MagicCard} from "@/components/magicui/magic-card.tsx";
import {useTheme} from "@/components/theme-provider.tsx";
import { Button } from "../ui/button";
import MorphingEmotion from "@/components/Checkin/MorphingEmotion.tsx";
import {toast} from "sonner";
import {Input} from "@/components/ui/input.tsx";

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
            <div className="flex flex-col h-screen  relative">

                <button
                    onClick={() => setIsSearch(false)}
                    className={'absolute top-8 right-8 z-20 w-16 h-16 rounded-full flex items-center justify-center shadow-lg bg-zinc-900 dark:bg-white text-white dark:text-black\n' +
                        'transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer'}>
                    <LayoutGrid className="w-7 h-7 stroke-[2]"/>
                </button>

                <div className={'p-10'}>
                    <h1 className="text-5xl font-semibold mb-4 italic">
                        Which Emotion matches how you feel the best?
                    </h1>
                    <div className="relative px-4">
                        <Input
                            className={'my-6 rounded-full p-5'}
                            type="text"
                            value={search}
                            placeholder={"Search for relevant emotion"}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Search className="absolute right-7 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>

                    <div className="overflow-y-scroll flex flex-col justify-between gap-3 h-[60vh] ">
                        {filteredEmotions.length > 0 ? (
                            filteredEmotions.map((emotion) => (
                                <div
                                    key={emotion._id}
                                    onClick={() => handleEmotionClick(emotion)}
                                    className={`mx-6 cursor-pointer border p-4 h-[5em] rounded-3xl transition-all duration-200 border-zinc-500 
                                    ${emotion.type === 'High Energy Unpleasant' && selectedEmotion?._id !== emotion._id ? 'text-red-700' : ''}
                                    ${emotion.type === 'Low Energy Unpleasant' && selectedEmotion?._id !== emotion._id ? 'text-blue-700' : ''}
                                    ${emotion.type === 'High Energy Pleasant' && selectedEmotion?._id !== emotion._id ? 'text-yellow-600' : ''}
                                    ${emotion.type === 'Low Energy Pleasant' && selectedEmotion?._id !== emotion._id ? 'text-green-600' : ''}
                                    ${selectedEmotion?._id === emotion._id && emotion.type === 'High Energy Unpleasant' ? 'text-white bg-red-700' : ''}
                                    ${selectedEmotion?._id === emotion._id && emotion.type === 'Low Energy Unpleasant' ? 'text-white bg-blue-700' : ''}
                                    ${selectedEmotion?._id === emotion._id && emotion.type === 'High Energy Pleasant' ? 'text-white bg-yellow-600' : ''}
                                    ${selectedEmotion?._id === emotion._id && emotion.type === 'Low Energy Pleasant' ? 'text-white bg-green-600' : ''}
                                    `}
                                    role="button"
                                    tabIndex={0}
                                    aria-label={`Select ${emotion.title}`}
                                >
                                    <h1 className="font-medium text-lg">{emotion.title}</h1>
                                    <p className="text-sm text-zinc-200 font-medium">{emotion.description}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-400 mt-4 w-full text-center">
                                No emotions found for this search.
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex  items-center justify-between z-20 absolute w-full bottom-10 px-12">

                    <button
                        onClick={handleBack}
                        className="w-18 h-18 rounded-full flex items-center justify-center shadow-lg bg-zinc-900 dark:bg-white text-white dark:text-black
                     transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                        aria-label="Back to Mood Selection"
                    >
                        <ChevronLeft className="w-10 h-10 stroke-[2]"/>
                    </button>


                    <button
                        onClick={handleDescIncident}
                        className="w-18 h-18 rounded-full flex items-center justify-center shadow-lg bg-zinc-900 dark:bg-white text-white dark:text-black
                     transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                        aria-label="Describe the Incident"
                    >
                        <ChevronRight className="w-10 h-10 stroke-[2]"/>
                    </button>
                </div>
            </div>)
                :(<div className=" h-screen flex flex-col items-center justify-center overflow-hidden relative ">
                    <button
                        onClick={() => setIsSearch(true)}
                        className={'absolute top-8 right-8 z-20 w-16 h-16 rounded-full flex items-center justify-center shadow-lg bg-zinc-900 dark:bg-white text-white dark:text-black\n' +
                            'transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer'}>
                        <Search className="w-7 h-7 stroke-[2]"/>
                    </button>

                    <motion.div
                        className="absolute  flex flex-wrap items-center justify-center gap-2 p-4 cursor-grab active:cursor-grabbing"
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
                                onClick={()=>handleEmotionClick(emotion)}
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
                    <div className="flex  items-center justify-between z-20 absolute w-full bottom-10 px-12">

                        <button
                            onClick={handleBack}
                            className="w-18 h-18 rounded-full flex items-center justify-center shadow-lg bg-zinc-900 dark:bg-white text-white dark:text-black
                     transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                            aria-label="Back to Mood Selection"
                        >
                            <ChevronLeft className="w-10 h-10 stroke-[2]"/>
                        </button>

                        {selectedEmotion !==null && <motion.div
                            initial={{opacity: 0, y: 50}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: 50}}
                            transition={{duration: 0.5}}
                        >
                            <Card className={'w-150 rounded-full h-28 p-0 m-0'}>
                                <MagicCard className={'w-full h-full py-8 px-5 flex flex-col justify-center '}
                                           gradientColor={theme === "dark" ? "#252525" : "#D9D9D955"}
                                >
                                    <div className={'flex items-center justify-between w-full'}>

                                        <div className={'px-2'}>
                                            <CardHeader className={`p-0 text-lg font-medium 
                                            ${selectedEmotion.type==='High Energy Unpleasant'?'text-red-700':''}
                                            ${selectedEmotion.type==='Low Energy Unpleasant'?'text-blue-700':''}
                                            ${selectedEmotion.type==='High Energy Pleasant'?'text-yellow-600':''}
                                            ${selectedEmotion.type==='Low Energy Pleasant'?'text-green-600':''}`
                                            }>
                                                {selectedEmotion?.title}
                                            </CardHeader>
                                            <CardDescription className={''}>
                                                {selectedEmotion?.description}
                                            </CardDescription>
                                        </div>
                                        <Button className={'w-18 h-18 rounded-full cursor-pointer'}
                                            onClick={()=>setSelectedEmotion(null)}
                                        >
                                            <X />
                                        </Button>
                                    </div>

                                </MagicCard>
                            </Card>
                        </motion.div>}
                        <button
                            onClick={handleDescIncident}
                            className="w-18 h-18 rounded-full flex items-center justify-center shadow-lg bg-zinc-900 dark:bg-white text-white dark:text-black
                     transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                            aria-label="Describe the Incident"
                        >
                            <ChevronRight className="w-10 h-10 stroke-[2]"/>
                        </button>
                    </div>
                </div>)
        }
        </>
    )
}