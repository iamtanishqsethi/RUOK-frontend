import { Safari } from "@/components/magicui/safari.tsx";
import Iphone15Pro from "@/components/magicui/iphone-15-pro.tsx";
import { useId } from "react";

const HowItWorks = () => {
    return (
        <div className={'flex flex-col items-center justify-center min-h-screen py-4 md:py-8 text-center relative font-secondary'}>
            <div className="font-mynabali-serif flex items-center justify-center py-6 md:py-10 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-center px-4">
                How it Works ?
            </div>
            <div className="relative w-full max-w-6xl mx-auto h-auto md:h-2/3 px-4 sm:px-8 md:px-12 lg:px-20 py-4">
                <Safari
                    url="ru-ok.vercel.app"
                    imageSrc={"https://i.ibb.co/kVZQt4F2/image.png" }
                    className="size-full"
                    mode={'simple'}
                    width={1210}
                />

                <div className="hidden sm:block absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 z-10 h-3/4 md:h-full">
                    <Iphone15Pro
                        className="w-32 sm:w-40 md:w-48 lg:w-64 h-full"
                        src="https://i.ibb.co/TxLf8tth/image.png"
                    />
                </div>
            </div>
            <div className="max-w-6xl mx-auto mb-8 md:mb-12 px-4 sm:px-6">
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl my-8 md:my-12 px-2 sm:px-4 md:px-16 lg:px-32 font-mynabali-serif">
                    Transform your emotional wellness journey in three simple steps:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-2 max-w-6xl mx-auto">
                    {grid.map((feature) => (
                        <div
                            key={feature.title}
                            className="relative bg-gradient-to-b dark:from-zinc-900 from-neutral-100 dark:to-zinc-950 to-white p-6 sm:p-8 md:p-10 rounded-3xl overflow-hidden"
                        >
                            <Grid size={25} />
                            <p className="text-sm sm:text-lg font-bold text-zinc-800 dark:text-white relative z-20">
                                {feature.title}
                            </p>
                            <p className="text-zinc-600 dark:text-zinc-400 mt-3 sm:mt-4 text-sm  font-normal relative z-20">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>


        </div>
    )
}

const grid = [
    {
        title: "Check-In & Discover",
        description:
            "Choose from 300+ carefully curated emotions to pinpoint exactly how you're feeling. Add context with smart categorization - tag what you were doing, where you were, and who you were with. No more settling for \"fine\" when your emotions deserve precise language.",
    },
    {
        title: "Gain Insights & Track Patterns",
        description:
            "Watch your emotional landscape unfold through beautiful visualizations and intelligent analytics. Discover your triggers, identify growth areas, and track your progress over time. Our AI provides personalized emotional insights that help you understand your unique patterns.",
    },
    {
        title: "Get Support & Build Resilience",
        description:
            "Access your 24/7 AI companion Sage for personalized guidance, explore curated wellness tools tailored to your specific needs, and build healthy emotional habits through gentle daily rituals. Connect with friends through meaningful check-ins when you're ready.",
    },

];

export const Grid = ({
                         pattern,
                         size,
                     }: {
    pattern?: number[][];
    size?: number;
}) => {
    const p = pattern ?? [
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    ];
    return (
        <div className="pointer-events-none absolute left-1/2 top-0  -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
            <div className="absolute inset-0 bg-gradient-to-r  [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 from-zinc-100/30 to-zinc-300/30 dark:to-zinc-900/30 opacity-100">
                <GridPattern
                    width={size ?? 20}
                    height={size ?? 20}
                    x="-12"
                    y="4"
                    squares={p}
                    className="absolute inset-0 h-full w-full  mix-blend-overlay dark:fill-white/30 dark:stroke-white/30 stroke-black/10 fill-black/10"
                />
            </div>
        </div>
    );
};

export function GridPattern({ width, height, x, y, squares, ...props }: any) {
    const patternId = useId();

    return (
        <svg aria-hidden="true" {...props}>
            <defs>
                <pattern
                    id={patternId}
                    width={width}
                    height={height}
                    patternUnits="userSpaceOnUse"
                    x={x}
                    y={y}
                >
                    <path d={`M.5 ${height}V.5H${width}`} fill="none" />
                </pattern>
            </defs>
            <rect
                width="100%"
                height="100%"
                strokeWidth={0}
                fill={`url(#${patternId})`}
            />
            {squares && (
                <svg x={x} y={y} className="overflow-visible">
                    {squares.map(([x, y]: any) => (
                        <rect
                            strokeWidth="0"
                            key={`${x}-${y}`}
                            width={width + 1}
                            height={height + 1}
                            x={x * width}
                            y={y * height}
                        />
                    ))}
                </svg>
            )}
        </svg>
    );
}
export default HowItWorks;