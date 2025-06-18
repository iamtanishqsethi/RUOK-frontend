    import {useState} from "react";
    import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
    import {
        IconArrowLeft,
        IconBrandTabler,
        IconSettings,
        IconUserBolt,
    } from "@tabler/icons-react";
    import { motion } from "framer-motion";
    import { cn } from "@/lib/utils";
    import {Outlet} from "react-router-dom";


    export function SideBar() {

        const links = [
            {
                label: "Dashboard",
                href: "/main",
                icon: (
                    <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
                ),
            },
            {
                label: "Profile",
                href: "/main/profile",
                icon: (
                    <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
                ),
            },
            {
                label: "Check-In",
                href: "/main/checkin",
                icon: (
                    <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
                ),
            },
            {
                label: "AiDashboard",
                href: "/main/ai",
                icon: (
                    <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
                ),
            },

            {
                label: "Tools",
                href: "/main/tools",
                icon: (
                    <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
                ),
            },
        ];
        const [open, setOpen] = useState(false);
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
                                    <SidebarLink key={idx} link={link} />
                                ))}
                            </div>
                        </div>
                        <div className={'flex'}>
                            <SidebarLink
                                link={{
                                    label: "UserName",
                                    href: "#",
                                    icon: (
                                        <img
                                            src="https://assets.aceternity.com/manu.png"
                                            className="h-7 w-7 shrink-0 rounded-full"
                                            width={50}
                                            height={50}
                                            alt="Avatar"
                                        />
                                    ),
                                }}
                            />

                        </div>
                    </SidebarBody>
                </Sidebar>
                <Outlet/>

            </div>
        );
    }

    export const Logo = () => {
        return (
            <a
                href="./Dashboard.tsx"
                className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
            >
                <div
                    className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-medium whitespace-pre text-black dark:text-white"
                >
                    RUOK
                </motion.span>
            </a>
        );
    };
    export const LogoIcon = () => {
        return (
            <a
                href="#"
                className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
            >
                <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
            </a>
        );
    };


