import {Link, useLocation} from "react-router-dom";
import {ModeToggle} from "@/components/mode-toggle.tsx";
import {Button} from "@/components/ui/button.tsx";
import axios from "axios";
import {toast} from "sonner";
import {BASE_URL} from "@/components/utils/constants.ts";
import {useDispatch, useSelector} from "react-redux";
import {removeUser} from "@/components/utils/userSlice.ts";
import {HeartHandshake} from "lucide-react";
import {useEffect, useState} from "react";
import type {User} from "@/components/utils/types.ts";

const Header=()=>{

    const dispatch = useDispatch()
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


    const handleLogOut=async ()=>{
        try{
            await axios.post(`${BASE_URL}/api/auth/logout`,null,{withCredentials:true})
            dispatch(removeUser())
            toast.success("User logged out successfully");
        }
        catch (err){
            if (axios.isAxiosError(err)) {
                console.log(err)
                toast.error(err.response?.data || "Signup failed");
            } else {
                toast.error("Internal server error");
            }
        }
    }

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
                {!isLogin  && user && <Button onClick={handleLogOut}>LogOut</Button>}
            </div>

        </div>
    )
}
export default Header