import { motion} from "framer-motion";
import {type Dispatch, type SetStateAction} from "react";
import type {CheckIn} from "@/utils/types.ts";
import {Card} from "@/components/ui/card.tsx";
import {Slider} from "@/components/ui/slider.tsx";
import {InteractiveHoverButton} from "@/components/magicui/interactive-hover-button.tsx";

import {
    highEnergyUnpleasantPrimary,
    highEnergyPleasantPrimary,
    lowEnergyPleasantPrimary,
    lowEnergyUnpleasantPrimary,
} from "@/utils/constants";
import {MagicCard} from "@/components/magicui/magic-card.tsx";

interface FeedBackProps {
    latestCheckIn: CheckIn | null;
    sliderValue: number[];
    setSliderValue: Dispatch<SetStateAction<number[]>>
    toolName:string
    handleFeedback:()=>Promise<void>
    feedbackLoading:boolean
}


const FeedbackCard = ({latestCheckIn,sliderValue,setSliderValue,toolName,handleFeedback,feedbackLoading}:FeedBackProps) => {

    const emotionType = latestCheckIn?.emotion.type;


    const getEmotionColor = (type: string | undefined) => {
        switch (type) {
            case 'High Energy Unpleasant':
                return highEnergyUnpleasantPrimary;
            case 'Low Energy Unpleasant':
                return lowEnergyUnpleasantPrimary;
            case 'High Energy Pleasant':
                return highEnergyPleasantPrimary;
            case 'Low Energy Pleasant':
                return lowEnergyPleasantPrimary;
            default:
                return '#6b7280';
        }
    };

    const emotionColor = getEmotionColor(emotionType);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-20 bg-black/60 backdrop-blur-lg h-full w-full flex flex-col items-center justify-center"
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
            >
                <Card className={"p-0 w-[22rem] md:w-[40rem] h-auto rounded-2xl"}>
                    <MagicCard className="  h-full w-full  flex flex-col items-center justify-center text-center p-8  ">
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className="my-3"
                    >
                        <h1 className="font-mynabali-serif text-3xl md:text-4xl font-medium text-zinc-800 dark:text-zinc-100 mb-2">
                            Rate Your Experience For
                        </h1>
                        <p className="text-zinc-600 dark:text-zinc-300 font-secondary text-lg">
                            {toolName}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        className=""
                    >
                        <p className="font-secondary text-lg text-zinc-600 dark:text-zinc-400 font-medium mb-3">
                            Based on your latest check-in, you felt
                        </p>
                        <h2
                            className="font-mynabali-serif text-2xl md:text-3xl font-semibold mb-1"
                            style={{ color: emotionColor }}
                        >
                            {latestCheckIn?.emotion.title || 'Unknown'}
                        </h2>
                        <div className="text-sm text-zinc-500 dark:text-zinc-500">
                            {new Date(latestCheckIn?.createdAt || Date.now()).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                        className="w-full my-6"
                    >
                        <div className="my-4">
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 ">
                                How satisfied are you with your tool experience?
                            </label>
                            <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400 my-2">
                                <span>Very Poor</span>
                                <span className="font-semibold text-lg" style={{ color: emotionColor }}>
                                    {sliderValue[0]}/100
                                </span>
                                <span>Excellent</span>
                            </div>
                        </div>

                        <Slider
                            value={sliderValue}
                            onValueChange={setSliderValue}
                            max={100}
                            min={0}
                            step={1}
                            className="w-full px-2"
                        />

                        <div className="mt-2 text-xs text-center">
                            <span className="text-zinc-500 dark:text-zinc-400">
                                {sliderValue[0] < 30 ? 'Needs Improvement' :
                                    sliderValue[0] < 70 ? 'Good' : 'Excellent'}
                            </span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.4 }}
                        className="my-4"
                    >
                        <p className="text-center px-6 font-secondary text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            Your feedback drives meaningful improvements to your mental wellness journey.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.4 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <InteractiveHoverButton
                            className="text-lg px-8 py-3 font-medium"
                            onClick={handleFeedback}
                            style={{
                                background: `linear-gradient(135deg, ${emotionColor}20, ${emotionColor}10)`,
                                borderColor: emotionColor + '40'
                            }}
                        >
                            {feedbackLoading?"Loading":"Submit Feedback"}
                        </InteractiveHoverButton>
                    </motion.div>
                    </MagicCard>
                </Card>
            </motion.div>
        </motion.div>
    );
};

export default FeedbackCard;