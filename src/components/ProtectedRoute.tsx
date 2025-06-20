import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import type {User} from "@/utils/types.ts";
import {useState,useEffect, type JSX} from "react";
import {HeartHandshake} from "lucide-react";


const ProtectedRoute=({children}:{children:JSX.Element})=>{
    const navigate=useNavigate()
    const user=useSelector((store:{user:null|User})=>store.user);
    const [checkedAuth,setCheckedAuth]=useState<boolean>(false)

    useEffect(() => {
        if(user === null){
            const timeout=setTimeout(()=>{
                navigate('/login')
            },500)
            return ()=> clearTimeout(timeout)
        }
        else {
            setCheckedAuth(true)
        }
    }, [user]);

    if(!user && !checkedAuth){
        return  (
            <div className={'flex flex-col items-center justify-center h-screen'}>
                <HeartHandshake className={'h-20 w-20 animate-bounce'}/>
            </div>
        )
    }
    return children

}
export default ProtectedRoute;