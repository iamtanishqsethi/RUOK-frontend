import {type Dispatch, type SetStateAction, useState,} from "react";
import {ChevronLeft, ChevronRight} from "lucide-react";
import { toast } from "sonner";
import {BackgroundGradientAnimation} from "@/components/ui/background-gradient-animation.tsx";
import {useTheme} from "@/components/theme-provider.tsx";

interface DescriptionFormProps {
    setShowForm: (form: string) => void;
    setPayload: Dispatch<
        SetStateAction<{
            emotion: string;
            placeTag?: string;
            peopleTag?: string;
            activityTag?: string;
            description?: string;
        }>
    >;
}

const DescriptionForm = ({ setShowForm, setPayload }: DescriptionFormProps) => {
    const [input, setInput] = useState<string|undefined>(undefined);
    const {theme}=useTheme();

    // Define your color themes
    const lightTheme = {
        gradientBackgroundStart: "rgb(240, 240, 240)",
        gradientBackgroundEnd: "rgba(240, 240, 240, 0.8)",
        firstColor: "18, 113, 255",
        secondColor: "189, 0, 255",
        thirdColor: "0, 196, 227",
        fourthColor: "221, 4, 4",
        fifthColor: "69, 53, 153",
        pointerColor: "105, 54, 255",
    };

    const darkTheme = {
        gradientBackgroundStart: "rgb(5, 5, 5)",
        gradientBackgroundEnd: "rgba(5, 5, 5, 0.58)",
        firstColor: "18, 113, 255",
        secondColor: "189, 0, 255",
        thirdColor: "0, 196, 227",
        fourthColor: "221, 4, 4",
        fifthColor: "69, 53, 153",
        pointerColor: "105, 54, 255",
    };

    const currentTheme = theme === 'dark' ? darkTheme : lightTheme;


    const handleTags = () => {

        try {
            setPayload((prev) => ({ ...prev, description: input?.trim() }));
            setShowForm("tags");

        } catch (err) {
            toast.error("Failed to save description. Please try again.");
            console.error("Description error:", err);
        }
    };

    const handleBack = () => {
        try {
            setShowForm("chart");

        } catch (err) {
            toast.error("Failed to return to chart. Please try again.");
            console.error("Back navigation error:", err);
        }
    };

    return (
        <div className="w-full flex flex-col items-center justify-center h-screen relative font-secondary">
            <BackgroundGradientAnimation
                {...currentTheme}
                className={''} >
                <div className={'absolute z-20 pt-28 md:pt-0  inset-0 flex flex-col items-center justify-center'}>
                    <h1 className={' font-mynabali-serif font-bold text-3xl md:text-6xl mb-8  px-10'}>
                        Describe the cause
                    </h1>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Write your thoughts here..."
                        className="w-full md:w-160 h-200 md:h-80 p-4 bg-transparent border rounded-lg text-center
                    text-[#0e0e0e] dark:text-[#f9f9f9] placeholder-[#0e0e0e] dark:placeholder-[#f9f9f9] resize-none
                    focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400
                    transition-all duration-300 backdrop-blur-lg"
                    />


                </div>

            </BackgroundGradientAnimation>
            <div className="flex items-center justify-between z-20 absolute w-full bottom-24 md:bottom-10 px-12">
                <button
                    onClick={handleBack}
                    className="border w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg bg-black/40 backdrop-blur-2xl text-white transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                    aria-label="Back to Chart"
                >
                    <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 stroke-[2]" />
                </button>
                <button
                    onClick={handleTags}
                    className="border w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg bg-black/40 backdrop-blur-2xl text-white transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                    aria-label="Next to Tags"
                >
                    <ChevronRight className="w-6 h-6 md:w-7 md:h-7 stroke-[2]" />
                </button>
            </div>



        </div>
    );
};

export default DescriptionForm;