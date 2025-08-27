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
import { useSelector } from "react-redux"
import type {CheckIn, Tag} from "@/utils/types"
import { useMemo } from "react"
import {FileSearch} from "lucide-react";
import {
    highEnergyPleasantPrimary,
    highEnergyUnpleasantPrimary,
    lowEnergyPleasantPrimary,
    lowEnergyUnpleasantPrimary
} from "@/utils/constants.ts";


const chartConfig = {
    High_Energy_Unpleasant: {
        label: "High Energy Unpleasant",
        color: highEnergyUnpleasantPrimary,
    },
    Low_Energy_Unpleasant: {
        label: "Low Energy Unpleasant",
        color: lowEnergyUnpleasantPrimary,
    },
    High_Energy_Pleasant: {
        label: "High Energy Pleasant",
        color: highEnergyPleasantPrimary,
    },
    Low_Energy_Pleasant: {
        label: "Low Energy Pleasant",
        color:lowEnergyPleasantPrimary,
    },
} satisfies ChartConfig

const getEmotionKey = (emotion: string): string => {
    return emotion.replace(/\s/g,'_');
}


const PeopleBox=()=>{
    return (
        <div
            className={"group relative flex flex-col justify-between items-center overflow-hidden rounded-xl " +
                "col-span-1 lg:col-start-7 lg:col-end-10 lg:row-start-10 lg:row-end-13 " +
                "lg:h-[18rem] " +
                "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] " +
                "transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] " +
                ""}
        >
            <PeopleChartBar/>
        </div>
    )
}

function PeopleChartBar() {

    const allPeopleTags=useSelector((store:{tags:{peopleTags:Tag[]|null}})=>store.tags.peopleTags)
    const checkIns=useSelector((store:{checkIns:{allCheckIns:CheckIn[]|null}})=>store.checkIns.allCheckIns)

    const chartData=useMemo(()=>{
        if(!allPeopleTags||!checkIns){
            return []
        }

        const tagEmotionCounts = new Map<string, {
            High_Energy_Pleasant: number;
            Low_Energy_Pleasant: number;
            High_Energy_Unpleasant: number;
            Low_Energy_Unpleasant: number;
        }>();

        allPeopleTags.forEach((tag)=>{
            tagEmotionCounts.set(tag.title, {
                High_Energy_Pleasant: 0,
                Low_Energy_Pleasant: 0,
                High_Energy_Unpleasant: 0,
                Low_Energy_Unpleasant: 0
            });
        });

        checkIns.forEach((checkIn)=>{
            if(checkIn?.peopleTag){
                const tagName = checkIn?.peopleTag.title;
                const emotionType = checkIn?.emotion.type;

                const currentCounts = tagEmotionCounts.get(tagName);
                if(currentCounts){
                    const key=getEmotionKey(emotionType)
                    currentCounts[key as keyof typeof currentCounts]++;
                }
            }
        })

        return Array.from(tagEmotionCounts.entries()).map(([tagName, counts])=>({
            tagName,
            ...counts
        }));

    },[allPeopleTags,checkIns])

    const isChartDataEmpty = Object.keys(chartData).length === 0

    return (
        <Card className={'bg-transparent border-0 w-full h-full'}>
            <CardHeader>
                <CardTitle>People Tags</CardTitle>

            </CardHeader>
            <CardContent>

                {isChartDataEmpty && (
                    <div className="text-muted-foreground  text-center py-6 flex flex-col items-center justify-center">
                        <FileSearch  className={'m-2 h-16 w-16'}/>
                        No People tags
                    </div>
                )}
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="tagName"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar
                            dataKey="High_Energy_Pleasant"
                            stackId="a"
                            fill="#f1c205"
                            radius={[0, 0, 0, 0]}
                        />
                        <Bar
                            dataKey="Low_Energy_Pleasant"
                            stackId="a"
                            fill="#057a51"
                            radius={[0, 0, 0, 0]}
                        />
                        <Bar
                            dataKey="High_Energy_Unpleasant"
                            stackId="a"
                            fill="#ef1a0a"
                            radius={[0, 0, 0, 0]}
                        />
                        <Bar
                            dataKey="Low_Energy_Unpleasant"
                            stackId="a"
                            fill="#0b29ee"
                            radius={[5, 5, 0, 0]}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>

        </Card>
    )
}
export default PeopleBox;