import {useEffect, useState} from "react";
import useGetWrap from "../../utils/hooks/useGetWrap.ts";
import { Dialog } from "@headlessui/react";
import InsightSlides from "@/components/AiSummary/InsightSlides.tsx";
import LoadingPage from "@/components/AiSummary/LoadingPage.tsx";
import AnimatedIcons from "@/components/AiSummary/AnimatedIcons.tsx";
import { CloudAlert, RefreshCw } from "lucide-react";
import {useSelector} from "react-redux";
import type {User} from "@/utils/types.ts";
import {toast} from "sonner";
import mixpanelService from "@/services/MixpanelService.ts";

const PersonaWrapBox = () => {

    const user = useSelector((state: { user: User | null }) => state.user);
    const [isGuest, setIsGuest] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { insight, loading, error, getInsight } = useGetWrap();

    const handleOpen = () => {
        getInsight();
        setIsOpen(true);
        mixpanelService.trackButtonClick('Persona Wrap', { location: 'Dashboard' });
    };

    const handleRetry = () => {
        getInsight();
    };
    const handleGuestClick = () => {
        toast.error('Login To access this feature')
    }
    useEffect(() => {
        if(user?.isGuest){
            setIsGuest(true);
        }
    }, [user]);

    return (
        <div
            className="
                group relative flex flex-col justify-between items-center overflow-hidden rounded-xl
                col-span-1 lg:col-start-7 lg:col-end-10 lg:row-start-4 lg:row-end-7 lg:h-[18rem]
               bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]
               transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]
                p-6 sm:p-8 h-full cursor-pointer
            "
            onClick={isGuest?handleGuestClick:handleOpen}
        >
            {/* Heading */}
            <div className="mb-4">
                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 text-center font-secondary">
                    Your Emotional Wrap
                </h2>
            </div>

            <div className="flex-1 flex items-center justify-center">
                <AnimatedIcons />
            </div>

            {/* Dialog */}
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/60 backdrop-blur-lg flex items-center justify-center">
                    <Dialog.Panel className="w-sm sm:w-md h-[95%] dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden">
                        { loading && <LoadingPage />}
                        { error && (
                            <div className="flex flex-col bg-zinc-100  dark:bg-zinc-900 items-center justify-center h-full p-8 text-center">
                                <div className="mb-6">
                                    <CloudAlert className="w-32 h-32 text-red-700 mx-auto mb-1.5" />
                                    <h3 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                                        Oops !
                                    </h3>
                                    <p className="text-zinc-600 dark:text-zinc-400 text-sm max-w-sm">
                                        We couldn't generate your emotional wrap right now.<br/>Please try again.
                                    </p>
                                </div>

                                <div className="flex flex-col gap-3 w-full max-w-xs">
                                    <button
                                        onClick={handleRetry}
                                        className="cursor-pointer flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                                    >
                                        <RefreshCw className="w-4 h-4" />
                                        Try Again
                                    </button>

                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="cursor-pointer px-4 py-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors duration-200"
                                    >
                                        Close
                                    </button>
                                </div>

                                {error && (
                                    <div className="mt-6 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                        <p className="text-red-700 dark:text-red-400 text-xs font-mono">
                                            {error}
                                        </p>
                                    </div>
                                )}
                            </div>
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