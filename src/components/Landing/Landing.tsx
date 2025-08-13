import Header from "@/components/Header.tsx";

import Hero from "./Hero.tsx";
import { FeaturesSectionDemo } from "./FeatSection.tsx";
import {Testimonials} from "@/components/Landing/Testimonials.tsx";
import Footer from "@/components/Footer.tsx";
import HowItWorks from "@/components/Landing/HowItWorks.tsx";
import FAQ from "@/components/Landing/FAQ.tsx";
import {InteractiveHoverButton} from "@/components/magicui/interactive-hover-button.tsx";
import {MessageSquare} from "lucide-react";


const Landing=()=>{


    return (
        <div
            className={'overflow-x-hidden '}
        >
            <a href="https://forms.gle/bxqNbBfE1CCJTa6P6">
            <InteractiveHoverButton
                className="fixed z-40 bottom-6 right-6 bg-[#016afb] text-white
               px-6 py-4"

            >
                <MessageSquare className="w-6 h-6" />
            </InteractiveHoverButton>
            </a>
            <Header/>
            <Hero/>
            <FeaturesSectionDemo/>
            <HowItWorks/>
            <Testimonials/>
            <FAQ/>
            <Footer/>
        </div>


    )
}
export default Landing