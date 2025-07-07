// import {DotPattern} from "@/components/magicui/dot-pattern.tsx";
// import {cn} from "@/lib/utils.ts";
import {TypingAnimation} from "@/components/magicui/typing-animation.tsx";

const WorkInProgress =()=> {
    return (
        <div className="h-screen w-full overflow-hidden relative flex justify-center items-center">
            {/*<DotPattern*/}
            {/*    // glow={true}*/}
            {/*    className={cn(*/}
            {/*        "absolute ",*/}
            {/*        "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"*/}
            {/*    )}*/}
            {/*/>*/}
            <TypingAnimation
                className="text-4xl font-light "
                duration={200}
            >
                Work in Progress.
            </TypingAnimation>
        </div>


    )
}
export default WorkInProgress;