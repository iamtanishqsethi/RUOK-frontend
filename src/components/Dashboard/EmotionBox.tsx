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


//data will change based on global state
const chartData = [
    { day: "Sunday", High_Energy_Unpleasant: 1, Low_Energy_Unpleasant: 3, High_Energy_Pleasant: 5, Low_Energy_Pleasant: 2 },
    { day: "Monday", High_Energy_Unpleasant: 4, Low_Energy_Unpleasant: 1, High_Energy_Pleasant: 2, Low_Energy_Pleasant: 4 },
    { day: "Tuesday", High_Energy_Unpleasant: 0, Low_Energy_Unpleasant: 2, High_Energy_Pleasant: 4, Low_Energy_Pleasant: 1 },
    { day: "Wednesday", High_Energy_Unpleasant: 3, Low_Energy_Unpleasant: 4, High_Energy_Pleasant: 1, Low_Energy_Pleasant: 5 },
    { day: "Thursday", High_Energy_Unpleasant: 5, Low_Energy_Unpleasant: 0, High_Energy_Pleasant: 3, Low_Energy_Pleasant: 3 },
    { day: "Friday", High_Energy_Unpleasant: 2, Low_Energy_Unpleasant: 5, High_Energy_Pleasant: 0, Low_Energy_Pleasant: 4 },
    { day: "Saturday", High_Energy_Unpleasant: 1, Low_Energy_Unpleasant: 3, High_Energy_Pleasant: 4, Low_Energy_Pleasant: 0 },
]
const chartConfig = {
    High_Energy_Unpleasant: {
        label: "High Energy Unpleasant",
        color: "#bf1b1b",
    },
    Low_Energy_Unpleasant: {
        label: "Low Energy Unpleasant",
        color: "#1851d1",
    },
    High_Energy_Pleasant: {
        label: "High Energy Pleasant",
        color: "#cc6e02",
    },
    Low_Energy_Pleasant: {
        label: "Low Energy Pleasant",
        color: "#01875d",
    },
} satisfies ChartConfig

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