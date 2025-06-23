import {Calendar } from "lucide-react";

import MorphingCheckButton from "@/components/Dashboard/MorphingCheckButton.tsx";
import {useNavigate} from "react-router-dom";
import {FlickeringGrid} from "@/components/magicui/flickering-grid.tsx";

const CheckinBox=()=>{
    const navigate=useNavigate();

    return (
        <div

            className={"group relative flex flex-col justify-between overflow-hidden rounded-xl " +
                "col-span-1 sm:col-span-2 lg:col-start-1 lg:col-end-5 lg:row-start-1 lg:row-end-4 " +
                " lg:h-[18rem] " +
                "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] " +
                "transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff60_inset] " +
                "p-6 sm:p-8 md:p-9  lg:p-10"}
        >
            <FlickeringGrid
                className="absolute inset-0 z-0 size-full"
                squareSize={4}
                gridGap={6}
                color="#6B7280"
                maxOpacity={0.4}
                flickerChance={0.2}
                height={800}
                width={800}
            />
            <div className={'text-center sm:text-left flex flex-col'}>
                <h1 className={'text-2xl sm:text-3xl font-medium  '}>
                    How have you been felling today ?
                </h1>
                <div className="font-mono flex items-center justify-center sm:justify-start gap-2 text-zinc-600 dark:text-zinc-400 p-2 text-sm sm:text-base lg:text-lg">
                    <Calendar size={16} />
                    <span>3 check-ins today</span>
                    <span className="text-green-600">•</span>
                    <span className="text-green-600">5 day streak</span>
                </div>
            </div>

            <div className="flex items-center justify-center sm:justify-end pb-6 sm:pb-8 md:pb-9 lg:pb-10 pr-0 sm:pr-8 md:pr-9 lg:pr-10">
                <div
                    onClick={()=>navigate('/main/checkin')}
                >
                    <MorphingCheckButton/>
                </div>


            </div>
        </div>
    )
}
export default CheckinBox;