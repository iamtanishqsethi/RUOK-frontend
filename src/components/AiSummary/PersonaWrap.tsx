import { useState } from "react";
import useGetWrap from "./useGetWrap";
import { Dialog } from "@headlessui/react";
import InsightSlides from "@/components/AiSummary/InsightSlides.tsx";
import LoadingPage from "@/components/AiSummary/LoadingPage.tsx";
import AnimatedIcons from "@/components/AiSummary/AnimatedIcons.tsx";

const PersonaWrapBox = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { insight, loading, error, getInsight } = useGetWrap();

    const handleOpen = () => {
        getInsight();
        setIsOpen(true);
    };

    return (
        <div
            className="
                group relative flex flex-col justify-between overflow-hidden rounded-xl
                col-span-1 lg:col-start-7 lg:col-end-10 lg:row-start-4 lg:row-end-7
                bg-background shadow-md dark:border dark:border-white/10 dark:shadow-inner
                p-6 sm:p-8 h-full cursor-pointer
            "
            onClick={handleOpen}
        >
            {/* Heading */}
            <div className="mb-4">
                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 text-center">
                    Your Emotional Wrap
                </h2>
            </div>

            {/* Animated Icons (Centered) */}
            <div className="flex-1 flex items-center justify-center">
                <AnimatedIcons />
            </div>

            {/* Dialog */}
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                    <Dialog.Panel className="max-w-sm sm:max-w-md h-[95%] dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden">
                        {loading && <LoadingPage />}
                        {error && (
                            <p className="text-center text-red-400 p-6">
                                {error}
                            </p>
                        )}
                        {insight && !loading && (
                            <InsightSlides insight={insight} onClose={() => setIsOpen(false)} />
                        )}
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );
};

export default PersonaWrapBox;