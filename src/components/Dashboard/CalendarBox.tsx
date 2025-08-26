import {useEffect, useState} from "react";
import {Calendar} from "@/components/ui/calendar.tsx";
import {useSelector} from "react-redux";
import type {CheckIn} from "@/utils/types.ts";
import {

    highEnergyPleasantPrimary,
    highEnergyUnpleasantPrimary,
    lowEnergyPleasantPrimary,
    lowEnergyUnpleasantPrimary,

} from "@/utils/constants.ts";


const getColorsByText = (type: string|undefined) => {
    switch (type) {
        case 'High Energy Unpleasant':
            return highEnergyUnpleasantPrimary
        case 'Low Energy Unpleasant':
            return lowEnergyUnpleasantPrimary
        case 'High Energy Pleasant':
            return highEnergyPleasantPrimary
        case 'Low Energy Pleasant':
            return lowEnergyPleasantPrimary
        default:
            return  '#4e545e' // Gray-500

    }
};
// const colors = getColorsByText(emotionType)

const CalendarBox=()=>{
    return(
        <div className={"group relative flex flex-col justify-between  overflow-hidden rounded-xl " +
            "col-span-1 sm:col-span-2 lg:col-start-6 lg:col-end-10 lg:row-start-1 lg:row-end-4 " +
            " lg:h-[18rem] " +
            "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] " +
            "transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] " +
            ""}>
            <CalendarCard/>
        </div>
    )
}

function CalendarCard() {
    const [date, setDate] = useState<Date | undefined>(new Date(Date.now()))
    const [todayCheckIns,setTodayCheckIns] = useState<CheckIn[]|undefined>([])

    //cant change the logic here as the date is dynamic
    const checkIns=useSelector((store:{checkIns:{allCheckIns:CheckIn[]|null}})=>store.checkIns.allCheckIns)
    useEffect(() => {
        if(!checkIns||!date){
            setTodayCheckIns([])
        }
        const filtered=checkIns?.filter((checkIn)=>{
            const checkInDate=new Date(checkIn.createdAt)
            return checkInDate.getDate()===date?.getDate() &&
                checkInDate.getMonth()===date?.getMonth() &&
                checkInDate.getFullYear()===date?.getFullYear()
        })
        setTodayCheckIns(filtered)

    }, [checkIns,date]);




    return (
        <div className="w-full py-5 px-2 flex flex-col md:flex-row  items-center gap-8">
            <div className="px-4 flex flex-col items-center justify-center">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="bg-transparent p-0 m-1"
                    required
                />
            </div>
            <div className=" flex flex-col items-start gap-3 border-t px-4 md:px-6 pt-4 overflow-y-auto min-h-full w-full md:w-[50%]">
                <div className="flex w-full items-center justify-between px-2">
                    <div className="text-lg md:text-xl flex items-center justify-center text-center w-full p-3 md:p-5 bg-zinc-300 dark:bg-zinc-800 rounded-lg font-semibold">
                        {date?.toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </div>
                </div>
                <div className="flex w-full flex-col gap-2 overflow-y-auto max-h-[200px]">
                    { todayCheckIns && todayCheckIns.length!==0 ?

                        todayCheckIns?.map((checkIn) => (

                            <div
                                key={checkIn._id}
                                className="bg-muted relative rounded-md mx-3 p-2 pl-6 text-sm"
                            >
                                <div
                                    className="absolute inset-y-2 left-2 w-1 rounded-full"
                                    style={{ backgroundColor: getColorsByText(checkIn.emotion.type) }}
                                />
                                <div className="font-medium">{checkIn.emotion.title}</div>
                            </div>
                    )):(
                        <div className={'text-muted text-sm flex flex-col items-center justify-center'}>
                            No Check Ins
                        </div>
                        )}
                </div>
            </div>
        </div>
    )
}


export default CalendarBox