import { useState } from "react";
import useGetWrap from "./useGetWrap";
import { Dialog } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import InsightSlides from "@/components/AiSummary/InsightSlides.tsx";

const PersonaWrapBox = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { insight, loading, error, getInsight } = useGetWrap();

    const handleOpen = () => {
        getInsight();
        setIsOpen(true);
    };

    return (
        <div className={
                "group relative flex flex-col justify-between overflow-hidden rounded-xl " +
                "col-span-1 lg:col-start-7 lg:col-end-10 lg:row-start-4 lg:row-end-7 " +
                "lg:h-[18rem] " +
                "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] " +
                "transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] " +
                "p-6 sm:p-8"
            }
        >
            <div className="mb-3">
                <h2 className="text-2xl font-medium">Your Emotional Wrap</h2>
            </div>

            <div className="flex-1 flex items-center justify-center">
                <Button onClick={handleOpen} className="w-full">
                    View Insights
                </Button>
            </div>

            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/3  backdrop-blur-sm flex items-center justify-center p-4">
                    <Dialog.Panel className="max-w-3xl w-full bg-white dark:bg-zinc-900 rounded-xl p-6 overflow-y-auto max-h-[90vh]">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold">Your Emotional Overview</h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-sm text-gray-500 hover:text-red-500"
                            >
                                Close
                            </button>
                        </div>

                        {loading && <p>Loading...</p>}
                        {error && <p className="text-red-400">{error}</p>}
                        {insight && !loading && <InsightSlides insight={insight} />}

                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );
};

export default PersonaWrapBox;
