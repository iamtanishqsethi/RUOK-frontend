import { TextHoverEffect } from "@/components/ui/text-hover-effect.tsx";
import { Github} from "lucide-react";
import { AnimatedTooltip } from "./ui/animated-tooltip.tsx";

const Footer = () => {

    const people = [
        {
            id: 1,
            name: "Suvrat Mittal",
            image:
                "https://avatars.githubusercontent.com/u/148795154?v=4",
            url:"https://github.com/suvrat007"
        },
        {
            id: 2,
            name: "Chehak Sharma",
            image:
                "https://avatars.githubusercontent.com/u/145372537?v=4",
            url:"https://github.com/ch3hak"
        },
        {
            id: 3,
            name: "Tanishq Sethi",
            image:
                "https://avatars.githubusercontent.com/u/148245926?v=4",
            url:"https://github.com/iamtanishqsethi"
        },

    ];

    return (
        <footer className="font-secondary bottom-0 w-full flex flex-col items-center justify-center  bg-zinc-200/60 dark:bg-black/60 backdrop-blur-sm  py-8 border-t border-gray-600/30 dark:border-gray-800/30">
            <div className="h-[10rem] md:h-[12rem] flex items-center justify-center">
                <TextHoverEffect text="RuOk" />
            </div>


            <p className="text-zinc-800 dark:text-zinc-300 text-sm mb-6 text-center max-w-sm">
                Mental health support platform built with care
            </p>


            <div className="flex items-center justify-center space-x-4 mb-6">
                <span className="text-zinc-400 text-lg font-medium">Built by</span>

                <div className="flex items-center justify-center ">
                    <AnimatedTooltip items={people} />
                </div>
            </div>


            <div className="flex items-center space-x-6 mb-4">
                <a href="https://github.com/iamtanishqsethi/RUOK-frontend" className="dark:text-zinc-400 text-zinc-600 hover:text-black hover:dark:hover:text-white transition-colors duration-200 flex items-center space-x-1">
                    <Github size={16} />
                    <span className="text-xs">Source</span>
                </a>

            </div>


            <div className="text-xs text-gray-500">
                © {new Date().getFullYear()} All rights reserved
            </div>
        </footer>
    );
};

export default Footer;