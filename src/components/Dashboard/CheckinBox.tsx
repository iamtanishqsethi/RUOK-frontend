import MorphingCheckButton from "@/components/Dashboard/MorphingCheckButton.tsx";
import {useNavigate} from "react-router-dom";
import {FlickeringGrid} from "@/components/magicui/flickering-grid.tsx";
import { useSelector} from "react-redux";
import type {CheckIn} from "@/utils/types.ts";
import mixpanelService from "@/services/MixpanelService.ts";
import {InteractiveHoverButton} from "@/components/magicui/interactive-hover-button.tsx";
import { Sparkles } from "lucide-react";

const CheckinBox=()=>{
    const navigate=useNavigate();

    const latest=useSelector((store:{checkIns:{latestCheckIn:CheckIn|null}})=>store.checkIns.latestCheckIn)
    const emotionType=latest?.emotion.type

    return (
        <div

            className={"group relative flex flex-col justify-between overflow-hidden rounded-xl " +
                "col-span-1 sm:col-span-2 lg:col-start-1 lg:col-end-6 lg:row-start-1 lg:row-end-4 " +
                " lg:h-[18rem] " +
                "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] " +
                "transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff60_inset] " +
                "p-6 sm:p-8 md:p-8 "}
        >
            <FlickeringGrid
                className="absolute inset-0 z-0 size-full"
                squareSize={6}
                gridGap={6}
                color="#6B7280"
                maxOpacity={0.4}
                flickerChance={0.1}
                height={800}
                width={800}
            />
            <div className={'text-center sm:text-left flex flex-col relative'}>
                <h1 className={'text-2xl sm:text-3xl font-semibold  '}>
                    How have you been feeling today ?
                </h1>
                <p className={'text-sm font-semibold py-2 hidden md:block text-zinc-800 dark:text-zinc-400'}>
                    Start your wellness journey with a quick emotional check-in.<br/>
                    Understanding your feelings is the first step<br/>
                    to better mental health.
                </p>
                {latest && (<InteractiveHoverButton
                    className={'absolute hidden sm:block -bottom-10  text-sm py-2.5 '}
                    onClick={()=>navigate('/main/ai')}
                >
                    <span className={'flex items-center gap-1'}>Talk to sage <Sparkles size={20}/></span>
                </InteractiveHoverButton>)}
            </div>

            <div className="flex items-center justify-center sm:justify-end py-6 sm:py-8  md:pt-0 md:pb-10 pr-0 sm:pr-8 md:pr-9 lg:pr-10">
                <div
                    onClick={()=>{
                        navigate('/main/checkin')
                        mixpanelService.trackButtonClick('CheckIn Button', { location: 'DashBoard' });
                    }}
                >
                    <MorphingCheckButton emotionType={emotionType}/>
                    {latest && (<InteractiveHoverButton
                        className={'mt-8  sm:hidden text-sm py-2.5 '}
                        onClick={() => navigate('/main/ai')}
                    >
                        <span className={'flex items-center gap-1'}>Talk to sage <Sparkles size={20}/></span>
                    </InteractiveHoverButton>)}
                </div>


            </div>
        </div>
    )
}
export default CheckinBox;