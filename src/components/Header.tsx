import {Link, useLocation, useNavigate} from "react-router-dom";
import {ModeToggle} from "@/components/mode-toggle.tsx";
// import {Button} from "@/components/ui/button.tsx";
import { useSelector} from "react-redux";
import {CheckCircle, HeartHandshake, LogOut, UserRound} from "lucide-react";
import {useEffect, useState} from "react";
import type {User} from "@/utils/types.ts";
import useLogOut from "@/utils/hooks/useLogout.ts";

import { Avatar, AvatarImage,AvatarFallback } from "./ui/avatar";
import {RainbowButton} from "@/components/magicui/rainbow-button.tsx";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

const Header=()=>{

    const [isLogin,setIsLogin]=useState<boolean>(false)
    const navigate=useNavigate()
    const user=useSelector((store:{user:null|User})=>store.user);

    const location = useLocation();
    const path=location.pathname
    useEffect(()=>{
        if(path==="/login"){
            setIsLogin(true);
        }
        else{
            setIsLogin(false);
        }
    },[path])


    const handleLogOut=useLogOut()

    return (
        <div className={' fixed top-0 flex items-center justify-between px-10 py-5 z-20 shadow  shadow-zinc-200 dark:shadow-zinc-800 w-screen backdrop-blur-2xl'}>

            <Link to={'/'}>
                <div className={'flex items-center justify-center space-x-4'}>
                    <HeartHandshake className={'h-10 w-10'}/>
                    <h1 className={'text-lg md:text-2xl  font-medium'}>Ru-Ok</h1>
                </div>

            </Link>
            <div className={'flex items-center justify-center space-x-5'}>
                {!isLogin &&
                    <RainbowButton
                        onClick={()=>navigate('/main/checkin')}
                        className={'border-zinc-500 rounded-full text-white'}>
                        <CheckCircle/><span className={'hidden md:inline'}>Check In</span>
                    </RainbowButton>
                }

                <ModeToggle/>
                {!isLogin  && user &&
                    <DropdownMenu >
                        <DropdownMenuTrigger asChild>
                            <Avatar className={"hover:cursor-pointer border"}>
                                <AvatarImage src={user?.photoUrl} alt="@shadcn" />
                                <AvatarFallback>{user?.firstName}</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <Link to={'/main/profile'}>
                                <DropdownMenuItem>
                                    <UserRound className="h-5 w-5"/>Profile
                                </DropdownMenuItem>
                            </Link>

                            <DropdownMenuItem
                                onClick={handleLogOut}
                                className={'cursor-pointer'}
                            >
                                <LogOut className="h-5 w-5"/> Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                }
            </div>

        </div>
    )
}
export default Header