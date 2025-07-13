import { cn } from "@/lib/utils.ts";
import {
    Bot,
    ChartLine,
    CircleCheckBig,
    FileLock2,
    HandHeart,
    Lightbulb,
    TimerReset,
    Wrench
} from "lucide-react";

export function FeaturesSectionDemo() {
    const features = [
        {
            title: "Precision Emotion Mapping",
            description:
                "Choose from over 300 carefully curated emotions to pinpoint exactly " +
                "how you're feeling - no more settling for \"fine\" or \"okay\" " +
                "when your emotions deserve better.",
            icon: <HandHeart />,
        },
        {
            title: "Smart Check-In Analytics",
            description:
                "Track your emotional patterns over time with intelligent insights that help " +
                "you understand your triggers, growth areas, and progress on your wellness journey",
            icon: <CircleCheckBig />,
        },
        {
            title: "Visual Emotion Insights",
            description:
                "Transform your emotional data into beautiful, easy-to-understand charts and graphs - " +
                "spot trends, identify patterns, and visualize your mental health progress like never before.",
            icon: <ChartLine />,
        },
        {
            title: "AI-Powered Emotional Insights",
            description:
                "Get comprehensive summaries of your emotional patterns with intelligent analysis of your check-ins, tags, and descriptions - receive personalized classifications and actionable solutions for your unique emotional profile",
            icon:  <Lightbulb />
        },
        {
            title: "AI Companion Chat",
            description: "Talk through anything with your personal AI wellness companion who understands context, " +
                "remembers your journey, and offers personalized guidance 24/7",
            icon: <Bot />,
        },
        {
            title: "Personalized Wellness Toolkit",
            description: "Access curated tools and techniques tailored to your specific emotional needs - " +
                "from breathing exercises to journaling prompts that actually resonate with you",
            icon: <Wrench />,
        },
        {
            title: "Daily Emotional Rituals",
            description:
                "Build healthy habits with gentle reminders and structured check-ins that make emotional " +
                "awareness a natural part of your routine, not a chore",
            icon: <TimerReset />,
        },
        {
            title: "Privacy-First Design",
            description:
                "Your emotional journey stays yours - with end-to-end encryption and " +
                "complete control over what you share, when you share it, and with whom",
            icon: <FileLock2 />
        },

    ];
    return (
        <>
        <div className="font-mynabali-serif flex items-center justify-center py-10 text-3xl font-bold tracking-tight text-center md:text-5xl ">
                Everything You Need to Thrive !
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto font-secondary">
            {features.map((feature, index) => (
                <Feature key={feature.title} {...feature} index={index} />
            ))}
        </div>
        </>
    );
}

const Feature = ({
                     title,
                     description,
                     icon,
                     index,
                 }: {
    title: string;
    description: string;
    icon: React.ReactNode;
    index: number;
}) => {
    return (
        <div
            className={cn(
                "flex flex-col lg:border-r  py-10 relative group/feature dark:border-zinc-800",
                (index === 0 || index === 4) && "lg:border-l dark:border-zinc-800",
                index < 4 && "lg:border-b dark:border-zinc-800"
            )}
        >
            {index < 4 && (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-blue-100 dark:from-blue-600/10 to-transparent pointer-events-none" />
            )}
            {index >= 4 && (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-blue-100 dark:from-blue-600/10 to-transparent pointer-events-none" />
            )}
            <div className="mb-4 relative z-10 px-10 text-zinc-600 dark:text-zinc-400">
                {icon}
            </div>
            <div className="text-lg font-bold mb-2 relative z-10 px-10">
                <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-zinc-300 dark:bg-zinc-700  group-hover/feature:bg-blue-500 dark:group-hover/feature:bg-blue-700 transition-all duration-200 origin-center" />
                <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-zinc-800 dark:text-zinc-100">
          {title}
        </span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 max-w-xs relative z-10 px-10">
                {description}
            </p>
        </div>
    );
};
