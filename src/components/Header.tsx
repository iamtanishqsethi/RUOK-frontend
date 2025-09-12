import {Link, useLocation, useNavigate} from "react-router-dom";
import { useSelector} from "react-redux";
import {CheckCircle,  LogOut, UserRound} from "lucide-react";
import {useEffect, useState} from "react";
import type {User} from "@/utils/types.ts";
import useLogOut from "@/utils/hooks/useLogout.ts";

import { Avatar, AvatarImage,AvatarFallback } from "./ui/avatar";
import {RainbowButton} from "@/components/magicui/rainbow-button.tsx";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import mixpanelService from "@/services/MixpanelService.ts";
import { AnimatedThemeToggler } from "./magicui/animated-theme-toggler";

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
        <div className={' fixed top-0 flex items-center justify-between px-10 py-5 z-30   w-screen backdrop-blur-2xl'}>

            <Link to={'/'}>
                <div className={'flex items-center justify-center space-x-4 font-mynabali '}>
                    {/*<HeartHandshake className={'h-8 md:h-10 w-8 md:w-10'}/>*/}
                    <h1 className={'text-lg md:text-2xl  font-semibold'}>RUOk</h1>
                </div>

            </Link>
            <div className={'flex items-center justify-center space-x-3 md:space-x-5'}>
                <h1
                    className={'cursor-pointer font-medium font-secondary text-sm sm:text-base '}
                    onClick={()=>navigate('/about')}>
                    About Us
                </h1>
                {!isLogin &&
                    <RainbowButton
                        onClick={()=>{
                            navigate('/main/checkin')
                            mixpanelService.trackButtonClick('Header Check In', { location: 'Header' });
                        }}
                        className={' rounded-full text-white font-secondary'}>
                        <CheckCircle/><span className={'hidden md:inline'}>Check In</span>
                    </RainbowButton>
                }

                <AnimatedThemeToggler className={'text-sm'}/>
                {!isLogin  && user &&
                    <DropdownMenu  >
                        <DropdownMenuTrigger asChild>
                            <Avatar className={"hover:cursor-pointer border"}>
                                <AvatarImage src={user?.photoUrl} alt="@shadcn" />
                                <AvatarFallback>{user?.firstName}</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className={'font-secondary'}>
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