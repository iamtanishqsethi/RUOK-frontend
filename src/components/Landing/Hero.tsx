import {WavyBackground} from "@/components/ui/wavy-background.tsx";
import {InteractiveHoverButton} from "@/components/magicui/interactive-hover-button.tsx";
import {useNavigate} from "react-router-dom";
import {AnimatedGradient} from "@/components/Landing/AnimatedGradient.tsx";
import mixpanelService from "@/services/MixpanelService.ts";
import { TextAnimate } from "../magicui/text-animate";

const Hero=()=>{
    const navigate = useNavigate();
    return (
        <WavyBackground
            colors={["#016afb", "#5400f6", "#9329f6", "#b379f9", "#22d3ee"]}
            // backgroundFill="hsl(var(--background))"
            className="min-h-screen flex flex-col items-center justify-center text-center ">
            <AnimatedGradient/>
            <TextAnimate
                animation="blurInUp"
                by="word"
                once
                className="font-mynabali-serif text-balance text-4xl font-bold px-8 sm:text-6xl md:text-8xl lg:leading-[1.2] my-2 ">
                RUOk - connect to your emotional self!
            </TextAnimate>
            <TextAnimate
                animation="blurInUp"
                by="word"
                once
                className=" font-secondary text-balance text-lg leading-[1.2] lg:leading-none hidden md:block md:text-xl px-48 text-zinc-700 dark:text-zinc-400 my-2 font-semibold">
                Pinpoint your exact emotions from 300+ options
                and access personalized AI support designed to meet you wherever you are.
            </TextAnimate>
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