import { Spotlight } from "@/components/ui/spotlight.tsx";
import { TextAnimate } from "../magicui/text-animate";

const AboutHero = () => {
    return (
        <div className="relative flex min-h-[80vh] sm:min-h-screen w-full overflow-hidden rounded-md antialiased items-center justify-center text-center px-4">
            <Spotlight
                className="-top-8  sm:-top-20"
                fill="#5400f6"
                side={"left"}
            />
            <Spotlight
                className="-top-8  sm:-top-20"
                fill="#5400f6"
                side={"right"}
            />

            <div className="z-10 pt-8">
                <TextAnimate
                    className="font-mynabali-serif text-balance text-4xl font-bold px-8 sm:text-6xl md:text-8xl lg:leading-[1.2]"
                    animation="blurInUp"
                    by="word"
                    once
                >
                    Emotional Wellness
                </TextAnimate>

                <br />

                <TextAnimate
                    className="font-mynabali-serif text-balance text-4xl font-bold px-8 sm:text-6xl md:text-8xl lg:leading-[1.2]"
                    animation="blurInUp"
                    by="word"
                    once
                >
                    Redefined
                </TextAnimate>

                <TextAnimate
                    className="text-base sm:text-lg md:text-2xl text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-12 mt-4 sm:mt-6"
                    animation="blurInUp"
                    by="word"
                    once
                >
                    Connect to your inner self with precision, understanding, and compassion
                </TextAnimate>
            </div>
        </div>
    );
};

export default AboutHero;
