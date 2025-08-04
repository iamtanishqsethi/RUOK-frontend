import {WavyBackground} from "@/components/ui/wavy-background.tsx";
import {InteractiveHoverButton} from "@/components/magicui/interactive-hover-button.tsx";
import {useNavigate} from "react-router-dom";
import {AnimatedGradient} from "@/components/Landing/AnimatedGradient.tsx";
import mixpanelService from "@/services/MixpanelService.ts";

const Hero=()=>{
    const navigate = useNavigate();
    return (
        <WavyBackground
            colors={["#016afb", "#5400f6", "#9329f6", "#b379f9", "#22d3ee"]}
            // backgroundFill="hsl(var(--background))"
            className="min-h-screen flex flex-col items-center justify-center text-center ">
            <AnimatedGradient/>
            <h1 className="font-mynabali-serif text-balance text-4xl font-bold sm:text-6xl md:text-8xl lg:leading-[1.2] my-2 bg-gradient-to-br from-black via-zinc-900 to-zinc-800 dark:from-white dark:via-zinc-100 dark:to-zinc-300 bg-clip-text text-transparent">
                RuOk - connect to your emotional self!
            </h1>
            <p className=" font-secondary text-balance text-lg leading-[1.2] lg:leading-none hidden md:block md:text-xl px-48 text-zinc-700 dark:text-zinc-400 my-2 font-semibold">
                Pinpoint your exact emotions from 300+ options
                and access personalized AI support designed to meet you wherever you are.
            </p>
            <InteractiveHoverButton
                onClick={()=>{
                    navigate('/main')
                    mixpanelService.trackButtonClick('Get Started', { location: 'Landing Page' });
                }}
                className={'text-sm sm:text-base md:text-xl my-2 font-secondary font-medium  border-2 border-zinc-600 dark:border-zinc-800'}
            >
                Get Started
            </InteractiveHoverButton>

        </WavyBackground>
    )
}
export default Hero;