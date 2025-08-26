import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
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
import {useSelector} from "react-redux";
import type {CheckIn} from "@/utils/types.ts";
import {
    highEnergyPleasantPrimary,
    highEnergyUnpleasantPrimary, lowEnergyPleasantPrimary,
    lowEnergyUnpleasantPrimary
} from "@/utils/constants.ts";
import { useMemo } from "react";


//data will change based on global state
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

// Helper function to convert emotion string to chart key
const getEmotionKey = (emotion: string): string => {
    return emotion.replace(/\s/g, '_');
}

const EmotionBox = () => {
    return (
        <div
            className={"group relative flex flex-col justify-between items-center overflow-hidden rounded-xl " +
                "col-span-1 sm:col-span-2 lg:col-start-1 lg:col-end-4 lg:row-start-7 lg:row-end-10 " +
                "lg:h-[18rem] " +
                "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] " +
                "transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] " +
                ""}
        >
            <ChartLineMultiple/>
        </div>
    )
}

function ChartLineMultiple() {

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
        <Card className={'bg-transparent m-0 border-0 h-full w-full'}>
            <CardHeader className={'text-xl font-semibold'}>
                Weekly Emotion Report
            </CardHeader>
            <CardContent>
                <ChartContainer
                    className="w-full h-[200px]"
                    config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}


                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="day"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <Line
                            dataKey="High_Energy_Unpleasant"
                            type="monotone"
                            stroke="#bf1b1b"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="Low_Energy_Unpleasant"
                            type="monotone"
                            stroke="#1851d1"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="Low_Energy_Pleasant"
                            type="monotone"
                            stroke="#01875d"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="High_Energy_Pleasant"
                            type="monotone"
                            stroke="#cc6e02"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>

        </Card>
    )
}

export default EmotionBox