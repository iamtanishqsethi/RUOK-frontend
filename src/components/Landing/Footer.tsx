import { TextHoverEffect } from "@/components/ui/text-hover-effect.tsx";
import { Github, Mail } from "lucide-react";
import { AnimatedTooltip } from "../ui/animated-tooltip.tsx";

const Footer = () => {

    const people = [
        {
            id: 1,
            name: "Suvrat Mittal",
            image:
                "https://avatars.githubusercontent.com/u/148795154?v=4",
        },
        {
            id: 2,
            name: "Chehak Sharma",
            image:
                "https://avatars.githubusercontent.com/u/145372537?v=4",
        },
        {
            id: 3,
            name: "Tanishq Sethi",

            image:
                "https://avatars.githubusercontent.com/u/148245926?v=4",
        },

    ];

    return (
        <footer className="bottom-0 w-full flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm text-white py-8 border-t border-gray-800/30">
            <div className="h-[12rem] flex items-center justify-center">
                <TextHoverEffect text="Ru-Ok" />
            </div>


            <p className="text-gray-300 text-sm mb-6 text-center max-w-sm">
                Mental health support platform built with care
            </p>


            <div className="flex items-center justify-center space-x-4 mb-6">
                <span className="text-zinc-400 text-lg font-medium">Built by</span>

                <div className="flex items-center justify-center ">
                    <AnimatedTooltip items={people} />
                </div>
            </div>


            <div className="flex items-center space-x-6 mb-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center space-x-1">
                    <Github size={16} />
                    <span className="text-xs">Source</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center space-x-1">
                    <Mail size={16} />
                    <span className="text-xs">Contact</span>
                </a>
            </div>


            <div className="text-xs text-gray-500">
                © {new Date().getFullYear()} All rights reserved
            </div>
        </footer>
    );
};

export default Footer;