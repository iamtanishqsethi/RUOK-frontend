import {Link, useLocation} from "react-router-dom";
import {ModeToggle} from "@/components/mode-toggle.tsx";
// import {Button} from "@/components/ui/button.tsx";
import { useSelector} from "react-redux";
import {HeartHandshake} from "lucide-react";
import {useEffect, useState} from "react";
import type {User} from "@/components/utils/types.ts";
// import useLogOut from "./utils/useLogout";

import { Avatar, AvatarImage,AvatarFallback } from "./ui/avatar";

const Header=()=>{


    const [isLogin,setIsLogin]=useState<boolean>(false)

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


    // const handleLogOut=useLogOut()

    return (
        <div className={' fixed top-0 flex items-center justify-between px-10 py-5 z-10 shadow  shadow-zinc-200 dark:shadow-zinc-800 w-screen'}>

            <Link to={'/'}>
                <div className={'flex items-center justify-center space-x-4'}>
                    <HeartHandshake className={'h-10 w-10'}/>
                    <h1 className={'text-lg md:text-2xl  font-medium'}>Ru-Ok</h1>
                </div>

            </Link>
            <div className={'flex items-center justify-center space-x-5'}>
                <ModeToggle/>
                {!isLogin  && user && 
                    <Avatar>
                        <AvatarImage src={user.photoUrl} />
                        <AvatarFallback>{user.firstName}</AvatarFallback>
                    </Avatar>
                }
            </div>

        </div>
    )
}
export default Header