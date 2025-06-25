import {useState} from "react";
import {Calendar} from "@/components/ui/calendar.tsx";
// import {Button} from "@/components/ui/button.tsx";
// import {PlusIcon} from "lucide-react";
// import {formatDateRange} from "little-date";
const events = [
    {
        title: "Irritated",
        color:'#bf1b1b'

    },
    {
        title: "Meh",
        color:'#1851d1'

    },
    {
        title: "Calm",
        color:'#01875d'

    },
]

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

function CalendarCard() {
    const [date, setDate] = useState<Date | undefined>(
        new Date(Date.now())
    )

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
            <div className="flex flex-col items-start gap-3 border-t px-4 !pt-4">
                <div className="flex w-full items-center justify-between px-1">
                    <div className="text-sm font-medium">
                        {date?.toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </div>
                    {/*<Button*/}
                    {/*    variant="ghost"*/}
                    {/*    size="icon"*/}
                    {/*    className="size-6"*/}
                    {/*    title="Add Event"*/}
                    {/*>*/}
                    {/*    <PlusIcon />*/}
                    {/*    <span className="sr-only">Add Event</span>*/}
                    {/*</Button>*/}
                </div>
                <div className="flex w-full flex-col gap-2">
                    {events.map((event) => (
                        <div
                            key={event.title}
                            className={`bg-muted  after:bg-primary/70 relative rounded-md p-2 pl-6 text-sm after:absolute after:inset-y-2 after:left-2 after:w-1 after:rounded-full`}
                        >
                            <div className="font-medium">{event.title}</div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}


export default CalendarBox