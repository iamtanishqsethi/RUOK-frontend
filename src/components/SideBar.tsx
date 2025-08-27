import {useState} from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {Link, Outlet, useNavigate} from "react-router-dom";
import {LayoutDashboard, 
  CheckCircle,
  Wrench,
  HeartHandshake,
  LogOut,
  Sparkles} from "lucide-react";
import { useSelector ,useDispatch } from "react-redux";
import type { User } from "@/utils/types";
import useLogOut from "@/utils/hooks/useLogout.ts";
import {Card} from "@/components/ui/card.tsx";
import { InteractiveHoverButton } from "./magicui/interactive-hover-button";
import {removeUser} from "@/utils/slice/userSlice.ts";


export function SideBar() {

     const user=useSelector((store:{user:null|User})=>store.user);
     const handleLogOut=useLogOut()
    const isBlocked=useSelector((store:{config:{isBlocked: boolean}})=>store.config.isBlocked)
    const navigate = useNavigate();
     const dispatch=useDispatch();

     const handleGuestNavigate=()=>{
         dispatch(removeUser())
         navigate("/login");
     }


    const links = [
        {
            label: "Dashboard",
            to: "/main",
            icon: (
                <LayoutDashboard className="h-5 w-5 shrink-0 text-zinc-700 dark:text-zinc-200" />
            ),
        },
        {
            label: "Check-In",
            to: "/main/checkin",
            icon: (
                <CheckCircle className="h-5 w-5 shrink-0 text-zinc-700 dark:text-zinc-200" />
            ),
        },
        {
            label: "Tools",
            to: "/main/tools",
            icon: (
                <Wrench className="h-5 w-5 shrink-0 text-zinc-700 dark:text-zinc-200" />
            ),
        },
        {
            label: "Sage",
            to: "/main/ai",
            icon: (
                <Sparkles className="h-5 w-5 shrink-0 text-zinc-700 dark:text-zinc-200" />
            ),
        },
        //{
        //     label: "Chat",
        //     to: "/main/chat",
        //     icon: (
        //         <MessageCircleMore className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
        //     ),
        // },
    ]
    const [open, setOpen] = useState(false);

    if(user===null){
        return (
            <div className={'flex flex-col items-center justify-center h-screen'}>
                <HeartHandshake className={'h-20 w-20 animate-bounce'}/>
            </div>
        )
    }

    return (
        <div
            className={cn(
                " mx-auto flex w-full  flex-1 flex-col overflow-hidden rounded-md border border-zinc-200 bg-zinc-100 md:flex-row dark:border-zinc-900 dark:bg-black",
                "h-screen relative"
            )}
        >
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10 border-2 font-secondary">
                    <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
                        {open ? <Logo /> : <LogoIcon />}
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <Link key={idx} to={link.to} className={'cursor-pointer'}>
                                    <SidebarLink  link={link} />
                                </Link>

                            ))}
                        </div>
                    </div>
                    <div>
                        <Link to={'/main/profile'}>
                            <SidebarLink
                                className={''}
                                link={{
                                    label:user?.firstName,
                                    href: "",
                                    icon: (
                                        <img
                                            src={user?.photoUrl}
                                            className="h-7 w-7 shrink-0 rounded-full"
                                            width={50}
                                            height={50}
                                            alt="Avatar"
                                        />
                                    ),
                                }}
                            />
                        </Link>
                        <button
                            onClick={handleLogOut}
                            className="flex items-center space-x-2 m-1 cursor-pointer">
                            <LogOut className="h-5 w-5"/>
                            {open && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.1,ease: "easeInOut" }}
                                    className=" text-sm">
                                    Log Out
                                </motion.span>
                            )}
                        </button>
                    </div>
                </SidebarBody>
            </Sidebar>
            {isBlocked && (
                <div className="absolute z-20 bg-zinc-500/60 dark:bg-zinc-900/60 backdrop-blur-sm h-screen w-full flex flex-col items-center justify-center">
                    <Card className="w-[20rem] md:w-[37rem] h-[23rem] bg-zinc-100 dark:bg-zinc-950 overflow-hidden border-3 flex flex-col items-center justify-center">
                        <h1 className="font-mynabali text-5xl md:text-7xl my-4 font-medium">
                            RuOk
                        </h1>
                        <p className="text-center px-12 font-secondary text-sm text-zinc-700 dark:text-zinc-400">
                            You've reached the end of your free guest session!<br/>
                            Create an account to continue exploring your emotions and unlock all of RuOk's features.
                        </p>
                        <InteractiveHoverButton
                            onClick={handleGuestNavigate}
                            className="text-lg">
                            LogIn
                        </InteractiveHoverButton>
                    </Card>
                </div>


            )

            }
            <Outlet/>
        </div>
    )
}

export const Logo = () => {
    return (
        <Link
            to={'/'}
            className="relative z-20 flex items-center space-x-3 py-1 "
        >
            <HeartHandshake className={'h-7 w-7'}/>
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-mynabali  font-semibold font-2xl whitespace-pre text-black dark:text-white"
            >
                RuOk
            </motion.span>
        </Link>
    )
}
export const LogoIcon = () => {
    return (
        <Link
            to={'/'}
            className="relative z-20 flex items-center space-x-3 py-1 "
        >
            <HeartHandshake className={'h-7 w-7'}/>
        </Link>
    )
}
