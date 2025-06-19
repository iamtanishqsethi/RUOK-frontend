import {WavyBackground} from "@/components/ui/wavy-background.tsx";
import {InteractiveHoverButton} from "@/components/magicui/interactive-hover-button.tsx";
import {useNavigate} from "react-router-dom";
import {AnimatedGradient} from "@/components/AnimatedGradient.tsx";

const Hero=()=>{
    const navigate = useNavigate();
    return (
        <WavyBackground
            colors={["#016afb", "#5400f6", "#9329f6", "#b379f9", "#22d3ee"]}
            className="min-h-screen flex flex-col items-center justify-center text-center">
            <AnimatedGradient/>
            <h1 className="text-balance text-5xl font-bold sm:text-6xl md:text-7xl  leading-[1.2] my-2">
                Ru-Ok transforms how you connect with your emotions!
            </h1>
            <p className="text-balance text-lg leading-none hidden md:block md:text-xl px-48 text-zinc-400 my-2 font-medium">
                Pinpoint your exact emotions from 300+ options, share meaningful check-ins with friends,
                and access personalized AI support designed to meet you wherever you are.
            </p>
            <InteractiveHoverButton
                    onClick={()=>navigate('/main')}
                    className={'text-lg md:text-xl my-2'}
                >
                    Get Started
                </InteractiveHoverButton>

        </WavyBackground>
    )
}
export default Hero;