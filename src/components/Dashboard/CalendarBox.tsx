import {CalendarCard} from "@/components/Dashboard/CalendarCard.tsx";

const CalendarBox=()=>{
    return(
        <div className={"group relative flex flex-col justify-between items-center overflow-hidden rounded-xl " +
            "col-span-1 sm:col-span-2 lg:col-start-5 lg:col-end-8 lg:row-start-1 lg:row-end-4 " +
            " lg:h-[18rem] " +
            "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] " +
            "transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] " +
            ""}>
            <CalendarCard/>
        </div>
    )
}
export default CalendarBox