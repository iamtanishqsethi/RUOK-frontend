
import Header from "@/components/Header.tsx";
import Footer from "../Footer.tsx";
import AboutHero from "@/components/About/AboutHero.tsx";
import Mission from "./Mission.tsx";
import Problem from "@/components/About/Problem.tsx";
import Vision from "@/components/About/Vision.tsx";
import {MessageSquare} from "lucide-react";
import {InteractiveHoverButton} from "@/components/magicui/interactive-hover-button.tsx";


const About=()=>{
    return (
        <div>
            <a href="https://forms.gle/bxqNbBfE1CCJTa6P6">
                <InteractiveHoverButton
                    className="fixed z-40 bottom-6 right-6 bg-[#016afb] text-white
               px-6 py-4"

                >
                    <MessageSquare className="w-6 h-6" />
                </InteractiveHoverButton>
            </a>
            <Header/>
            <AboutHero/>
            <Mission/>
            <Problem/>
            <Vision/>
            <Footer/>
        </div>

    )
}
export default About;