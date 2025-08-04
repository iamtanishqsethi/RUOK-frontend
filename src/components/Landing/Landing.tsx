import Header from "@/components/Header.tsx";

import Hero from "./Hero.tsx";
import { FeaturesSectionDemo } from "./FeatSection.tsx";
import {Testimonials} from "@/components/Landing/Testimonials.tsx";
import Footer from "@/components/Landing/Footer.tsx";
import HowItWorks from "@/components/Landing/HowItWorks.tsx";
import FAQ from "@/components/Landing/FAQ.tsx";


const Landing=()=>{


    return (
        <div
            className={'overflow-x-hidden'}
        >
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