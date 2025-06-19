import Header from "@/components/Header.tsx";

import Hero from "./Hero";
import { FeaturesSectionDemo } from "./FeatSection";
import {Testimonials} from "@/components/Testimonials.tsx";
import Footer from "@/components/Footer.tsx";


const Landing=()=>{


    return (
        <div>
            <Header/>
            <Hero/>
            <FeaturesSectionDemo/>
            <Testimonials/>
            <Footer/>
        </div>


    )
}
export default Landing