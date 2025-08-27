import {
    Card,
    CardContent,
    CardHeader,

} from "@/components/ui/card"
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"
import {
    highEnergyPleasantPrimary,
    highEnergyUnpleasantPrimary,
    lowEnergyPleasantPrimary,
    lowEnergyUnpleasantPrimary
} from "@/utils/constants.ts";
import {useSelector} from "react-redux";
import type {CheckIn} from "@/utils/types.ts";
import {useMemo} from "react";

const baseChartData = [
    {
        day: "Sunday",
        High_Energy_Unpleasant: 0,
        Low_Energy_Unpleasant: 0,
        High_Energy_Pleasant: 0,
        Low_Energy_Pleasant: 0
    },
    {
        day: "Monday",
        High_Energy_Unpleasant: 0,
        Low_Energy_Unpleasant: 0,
        High_Energy_Pleasant: 0,
        Low_Energy_Pleasant: 0
    },
    {
        day: "Tuesday",
        High_Energy_Unpleasant: 0,
        Low_Energy_Unpleasant: 0,
        High_Energy_Pleasant: 0,
        Low_Energy_Pleasant: 0
    },
    {
        day: "Wednesday",
        High_Energy_Unpleasant: 0,
        Low_Energy_Unpleasant: 0,
        High_Energy_Pleasant: 0,
        Low_Energy_Pleasant: 0
    },
    {
        day: "Thursday",
        High_Energy_Unpleasant: 0,
        Low_Energy_Unpleasant: 0,
        High_Energy_Pleasant: 0,
        Low_Energy_Pleasant: 0
    },
    {
        day: "Friday",
        High_Energy_Unpleasant: 0,
        Low_Energy_Unpleasant: 0,
        High_Energy_Pleasant: 0,
        Low_Energy_Pleasant: 0
    },
    {
        day: "Saturday",
        High_Energy_Unpleasant: 0,
        Low_Energy_Unpleasant: 0,
        High_Energy_Pleasant: 0,
        Low_Energy_Pleasant: 0
    },
]
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

// Helper function to get day name from date
const getDayName = (date: Date): string => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[date.getDay()];
}
const getEmotionKey = (emotion: string): string => {
    return emotion.replace(/\s/g, '_');
}

const WeeklyWeb = () => {

    return (
        <div
            className={"group relative flex flex-col justify-between items-center overflow-hidden rounded-xl " +
                "col-span-1 sm:col-span-2 lg:col-start-4 lg:col-end-6 lg:row-start-7 lg:row-end-10 " +
                " lg:h-[18rem] " +
                "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] " +
                "transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] " +
                ""}
            >
            <ChartRadarMultiple/>

            </div>
    )
}

 function ChartRadarMultiple() {
     const weekCheckIn=useSelector((store:{checkIns:{weeklyCheckIns:CheckIn[]|null}})=>store.checkIns.weeklyCheckIns)

     const chartData = useMemo(() => {
         if (!weekCheckIn || weekCheckIn.length === 0) {
             return baseChartData
         }

         // Group check-ins by day and emotion
         const dailyEmotionCounts = weekCheckIn.reduce((acc, checkIn) => {

             const checkInDate = new Date(checkIn.createdAt);
             const dayName = getDayName(checkInDate);
             const emotionKey = getEmotionKey(checkIn.emotion.type);

             // Initialize day if it doesn't exist
             if (!acc[dayName]) {
                 acc[dayName] = {
                     High_Energy_Unpleasant: 0,
                     Low_Energy_Unpleasant: 0,
                     High_Energy_Pleasant: 0,
                     Low_Energy_Pleasant: 0
                 };
             }

             // Increment the emotion count for this day
             if (acc[dayName][emotionKey] !== undefined) {
                 acc[dayName][emotionKey]++;
             }

             return acc;
         }, {} as Record<string, Record<string, number>>);

         // Map the base chart data with actual counts
         return baseChartData.map(dayData => ({
             day: dayData.day,
             High_Energy_Unpleasant: dailyEmotionCounts[dayData.day]?.High_Energy_Unpleasant || 0,
             Low_Energy_Unpleasant: dailyEmotionCounts[dayData.day]?.Low_Energy_Unpleasant || 0,
             High_Energy_Pleasant: dailyEmotionCounts[dayData.day]?.High_Energy_Pleasant || 0,
             Low_Energy_Pleasant: dailyEmotionCounts[dayData.day]?.Low_Energy_Pleasant || 0,
         }));
     }, [weekCheckIn])
    return (
        <Card className="flex flex-col m-0 bg-transparent border-0 h-full w-full">
            <CardHeader className={'text-center text-xl font-semibold'}>
                Emotion Web
            </CardHeader>
            <CardContent className="flex-1 pb-0 flex items-center justify-center min-h-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px] w-full"
                >
                    <RadarChart data={chartData}>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <PolarAngleAxis
                            dataKey="day"
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <PolarGrid />
                        <Radar
                            dataKey="High_Energy_Unpleasant"
                            stroke="var(--color-High_Energy_Unpleasant)"
                            fill="var(--color-High_Energy_Unpleasant)"
                            fillOpacity={0.1}
                            strokeWidth={2}
                        />
                        <Radar
                            dataKey="Low_Energy_Unpleasant"
                            stroke="var(--color-Low_Energy_Unpleasant)"
                            fill="var(--color-Low_Energy_Unpleasant)"
                            fillOpacity={0.2}
                            strokeWidth={2}
                        />
                        <Radar
                            dataKey="High_Energy_Pleasant"
                            stroke="var(--color-High_Energy_Pleasant)"
                            fill="var(--color-High_Energy_Pleasant)"
                            fillOpacity={0.3}
                            strokeWidth={2}
                        />
                        <Radar
                            dataKey="Low_Energy_Pleasant"
                            stroke="var(--color-Low_Energy_Pleasant)"
                            fill="var(--color-Low_Energy_Pleasant)"
                            fillOpacity={0.4}
                            strokeWidth={2}
                        />
                    </RadarChart>
                </ChartContainer>
            </CardContent>
        </Card>

    )
}

export default WeeklyWeb;