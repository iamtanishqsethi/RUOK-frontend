import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import type {User} from "@/components/utils/types.ts";
import {useState,useEffect, type JSX} from "react";


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
        return  <p>Loading...</p>
    }
    return children

}
export default ProtectedRoute;