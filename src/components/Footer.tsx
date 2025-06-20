import {TextHoverEffect} from "@/components/ui/text-hover-effect.tsx";

const Footer=()=>{
    return(
        <footer className="bottom-0  w-full flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm text-white py-6 md:py-8">
            <div className="h-[12rem] flex items-center justify-center">
                <TextHoverEffect text="Ru-Ok" />
            </div>
            <div>
                Built by Suvrat , Chehak & Tanishq
            </div>


            <div className="mt-4 text-xs text-gray-400">
                © {new Date().getFullYear()} All rights reserved
            </div>
        </footer>
    )
}
export default Footer