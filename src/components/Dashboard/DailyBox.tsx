import { Label, Pie, PieChart } from "recharts"
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
import { useMemo } from "react"
import {
    highEnergyPleasantPrimary,
    highEnergyUnpleasantPrimary,
    lowEnergyPleasantPrimary,
    lowEnergyUnpleasantPrimary
} from "@/utils/constants.ts";
import {useGetDayCheckIn} from "@/utils/hooks/useGetDayCheckIn.ts";

//the data will be modified based on data from global state
const baseChartData = [
    { emotion: "High Energy Unpleasant", times:0, fill: highEnergyUnpleasantPrimary },
    { emotion: "Low Energy Unpleasant", times: 0, fill: lowEnergyUnpleasantPrimary },
    { emotion: "High Energy Pleasant", times: 0, fill: highEnergyPleasantPrimary },
    { emotion: "Low Energy Pleasant", times: 0, fill: lowEnergyPleasantPrimary },

]
const chartConfig = {
    checkIn: {
        label: "Check Ins",
    },
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
        color: lowEnergyPleasantPrimary,
    },

} satisfies ChartConfig


const DailyBox=()=>{
    return (
        <div
            className={"group relative flex flex-col justify-between items-center overflow-hidden rounded-xl " +
                "col-span-1 lg:col-start-1 lg:col-end-3 lg:row-start-4 lg:row-end-7 " +
                "lg:h-[18rem] " +
                "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] " +
                "transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] " +
                ""}
        >
            <ChartPieDonutText/>
        </div>
    )
}

function ChartPieDonutText() {


    const todayCheckIn=useGetDayCheckIn()

    const chartData=useMemo(()=>{

        if(!todayCheckIn||todayCheckIn.length===0){
            return baseChartData
        }

        //calculate no for each type
        const emotionCounts=todayCheckIn.reduce((acc,checkIn)=>{
            const emotionType=checkIn.emotion.type
            acc[emotionType]=(acc[emotionType]||0)+1
            return acc
        },{} as Record<string,number>)

        return baseChartData.map((item)=>({
            ...item,
            times:emotionCounts[item.emotion]||0
        }))

    },[todayCheckIn])


    //function to calculate the total check in
    const totalVisitors = useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.times, 0)
    }, [todayCheckIn])

    return (
        <Card className="flex flex-col m-0 bg-transparent border-0 h-full w-full">
            <CardHeader className={'text-center text-2xl font-semibold'}>
                Daily Report
            </CardHeader>
            <CardContent className="flex-1 pb-0 flex items-center justify-center min-h-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px] w-full"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey={"times"}
                            nameKey={'emotion'}
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalVisitors.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Check Ins
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                        {
                            totalVisitors===0 && (
                                <g>
                                    <text
                                        x="50%"
                                        y="45%"
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        className="fill-foreground text-3xl font-bold"
                                    >
                                        0
                                    </text>
                                    <text
                                        x="50%"
                                        y="60%"
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        className="fill-muted-foreground text-xl "
                                    >
                                        Check Ins
                                    </text>
                                </g>
                            )
                        }
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export default DailyBox;