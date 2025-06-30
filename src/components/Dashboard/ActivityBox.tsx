import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {useSelector} from "react-redux";
import type {CheckIn, Tag} from "@/utils/types.ts";
import { useMemo } from "react";


const chartConfig = {
    desktop: {
        label: "Activity",
        color: "#273adf",
    },
} satisfies ChartConfig

const ActivityBox=()=>{
    return (
        <div
            className={"group relative flex flex-col justify-between items-center overflow-hidden rounded-xl " +
                "col-span-1 lg:col-start-1 lg:col-end-4 lg:row-start-10 lg:row-end-13 " +
                "lg:h-[18rem] " +
                "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] " +
                "transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] " +
                ""}
        >
            <ActivityChartBar/>
        </div>
    )
}


function ActivityChartBar() {

    const allActivityTags = useSelector((store: { tags: { activityTags: Tag[] | null } }) => store.tags.activityTags);
    const checkIns=useSelector((store:{checkIns:{allCheckIns:CheckIn[]|null}})=>store.checkIns.allCheckIns)

    const chartData=useMemo(()=>{
        if (!allActivityTags||!checkIns){
            return []
        }

        const tagCounts=new Map<string,number>()

        allActivityTags.forEach((tag)=>{
            tagCounts.set(tag.title,0)
        })

        checkIns.forEach((checkIn)=>{
            if(checkIn.activityTag!==null){
                tagCounts.set(checkIn.activityTag?.title as string,tagCounts.get(checkIn.activityTag?.title as string)!+1)
            }
        })
        return Array.from(tagCounts.entries()).map(([tagName,count])=>({
            tag:tagName,
            times:count
        }))

    },[allActivityTags,checkIns])


    return (
        <Card className={'bg-transparent border-0 w-full h-full'}>
            <CardHeader>
                <CardTitle>Activity Tags</CardTitle>

            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="tag"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}

                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="times" fill="var(--color-desktop)" radius={8} />
                    </BarChart>
                </ChartContainer>
            </CardContent>

        </Card>
    )
}


export default ActivityBox