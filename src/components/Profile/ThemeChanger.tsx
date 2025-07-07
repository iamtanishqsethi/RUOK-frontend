import {Button} from "@/components/ui/button.tsx";
import {Laptop, Moon, Sun} from "lucide-react";
import {useTheme} from "@/components/theme-provider.tsx";

const ThemeChanger=()=>{

    const { setTheme } = useTheme()
    return (
        <div className="bg-zinc-100 dark:bg-zinc-950 border-2 rounded-3xl p-6 w-full md:w-1/2 flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-3 font-mynabali-serif">
                Theme
            </h2>

            <div className={'flex items-center justify-center my-4 gap-6'}>
                <Button
                    variant={'ghost'}
                    className={'border-2 cursor-pointer'}
                    onClick={() => setTheme("light")}
                >
                    <Sun className="h-[1.2rem] w-[1.2rem]   " />
                    Light
                </Button>

                <Button
                    variant={'ghost'}
                    className={'border-2 cursor-pointer'}
                    onClick={() => setTheme("dark")}
                >
                    <Moon className=" h-[1.2rem] w-[1.2rem]  " />
                    Dark
                </Button>
                <Button
                    variant={'ghost'}
                    className={'border-2 cursor-pointer'}
                    onClick={() => setTheme("system")}
                >
                    <Laptop className=" h-[1.2rem] w-[1.2rem]  "/>
                    System
                </Button>
            </div>
        </div>
    )
}
export default ThemeChanger;