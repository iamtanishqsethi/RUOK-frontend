import {useEffect, useState} from "react";
import {Calendar} from "@/components/ui/calendar.tsx";
import {useSelector} from "react-redux";
import type {CheckIn} from "@/utils/types.ts";
// import {formatDateRange} from "little-date";

const CalendarBox=()=>{
    return(
        <div className={"group relative flex flex-col justify-between items-center overflow-hidden rounded-xl " +
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

    const checkIns=useSelector((store:{checkIns:CheckIn[]|null})=>store.checkIns)

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
        <div className="w-full py-4 flex flex-col md:flex-row  justify-center gap-8">
            <div className="px-4">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="bg-transparent p-0"
                    required
                />
            </div>
            <div className="flex flex-col items-start gap-3 border-t px-4 pt-4 overflow-y-auto min-h-full">
                <div className="flex w-full items-center justify-between px-1">
                    <div className="text-sm font-medium">
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
                            className={`bg-muted  after:bg-primary/70 relative rounded-md mx-3 p-2 pl-6 text-sm after:absolute after:inset-y-2 after:left-2 after:w-1 after:rounded-full`}
                        >
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