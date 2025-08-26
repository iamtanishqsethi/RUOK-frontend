import { Bar, BarChart, XAxis, YAxis } from "recharts"
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
import {useMemo} from "react";
import {useGetWeekCheckIn} from "@/utils/hooks/useGetWeekCheckIn.ts";
import { FileSearch } from "lucide-react";



const emotionColors = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
]


const WeeklyBox=()=>{
    return (
        <div
            className={"group relative flex flex-col justify-between items-center overflow-hidden rounded-xl " +
                "col-span-1 sm:col-span-2 lg:col-start-6 lg:col-end-10 lg:row-start-7 lg:row-end-10 " +
                " lg:h-[18rem] " +
                "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] " +
                "transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] " +
                ""}
        >
            <ChartBarMixed/>
        </div>
    )
}

function ChartBarMixed() {



    const weekCheckIn=useGetWeekCheckIn()

    const {chartData,chartConfig}=useMemo(()=>{
        if(!weekCheckIn||weekCheckIn.length===0){
            return {
                chartData:[],
                chartConfig:{}as ChartConfig
            }
        }
        const emotionCounts=weekCheckIn.reduce((acc,checkIn)=>{
            const emotionTitle=checkIn.emotion.title
            acc[emotionTitle]=(acc[emotionTitle]||0)+1
            return acc
        },{} as Record<string, number>)

        const sortedEmotions = Object.entries(emotionCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5); // Limit to top 10 emotions
        const data = sortedEmotions.map(([title, count], index) => ({
            title,
            count,
            fill: emotionColors[index % emotionColors.length]
        }))

        const config = sortedEmotions.reduce((acc, [title], index) => {
            // Create a key-safe version of the title for the config
            const configKey = title.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
            acc[configKey] = {
                label: title,
                color: emotionColors[index % emotionColors.length]
            };
            return acc;
        }, {} as ChartConfig);
        return { chartData: data, chartConfig: config };
    },[weekCheckIn])


    const isChartConfigEmpty = Object.keys(chartConfig).length === 0


    return (
        <Card className={'bg-transparent h-full w-full border-0'}>
            <CardHeader className={'text-xl font-semibold'}>
                    Most Felt emotions this week
            </CardHeader>
            <CardContent>
                {isChartConfigEmpty && (
                    <div className="text-muted-foreground  text-center py-6 flex flex-col items-center justify-center">
                        <FileSearch  className={'m-2 h-16 w-16'}/>
                        Not enough check ins this week.
                    </div>
                )}
                <ChartContainer
                    className={'w-full h-[190px]'}
                    config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        layout="vertical"
                        margin={{
                            left: 0,
                        }}
                    >
                        <YAxis
                            dataKey="title"
                            type="category"
                            tickLine={false}
                            axisLine={false}

                        />
                        <XAxis dataKey="count" type="number" hide />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="count" layout="vertical" radius={5} />
                    </BarChart>
                </ChartContainer>
            </CardContent>

        </Card>
    )
}

export default WeeklyBox;