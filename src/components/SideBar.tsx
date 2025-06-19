import {useState} from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {Link, Outlet} from "react-router-dom";
import {LayoutDashboard, 
  CheckCircle, 
  Bot, 
  Wrench,
  HeartHandshake, 
  MessageCircleMore,
  LogOut} from "lucide-react";
import { useSelector } from "react-redux";
import type { User } from "./utils/types";
import useLogOut from "./utils/useLogout";

export function SideBar() {

     const user=useSelector((store:{user:null|User})=>store.user);
     const handleLogOut=useLogOut()

    const links = [
        {
            label: "Dashboard",
            to: "/main",
            icon: (
                <LayoutDashboard className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Chat",
            to: "/main/chat",
            icon: (
                <MessageCircleMore className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Check-In",
            to: "/main/checkin",
            icon: (
                <CheckCircle className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Ai Dashboard",
            to: "/main/ai",
            icon: (
                <Bot className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },

        {
            label: "Tools",
            to: "/main/tools",
            icon: (
                <Wrench className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
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
                " flex border-2 max-w-screen flex-1 flex-col overflow-hidden rounded-md  md:flex-row text-xl",
                "h-screen"
            )}
        >
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10 border-2">
                    <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
                        {open ? <Logo /> : <LogoIcon />}
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <Link key={idx} to={link.to} className="flex items-center gap-2 py-2 rounded-md ">
                                    {link.icon}
                                    {open && (
                                        <motion.span
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-neutral-700 dark:text-neutral-200 text-sm"
                                        >
                                            {link.label}
                                        </motion.span>
                                    )}
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
                            className=" text-sm">
                            Log Out
                        </motion.span>
                        )}
            </button>
          </div>
                </SidebarBody>
            </Sidebar>
            <Outlet/>
        </div>
    )
}

export const Logo = () => {
    return (
        <Link to={'/'} className={'flex items-center space-x-3'}>
            <HeartHandshake className={'h-6 w-6'}/>
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium whitespace-pre text-black dark:text-white"
            >
                RuOk
            </motion.span>
        </Link>
    )
}
export const LogoIcon = () => {
    return (
        <Link to={'/'}>
            <HeartHandshake className={'h-6 w-6'}/>
        </Link>
    )
}
