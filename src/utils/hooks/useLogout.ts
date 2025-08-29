import  axios from 'axios'
import {toast} from "sonner";
import {BASE_URL} from "@/utils/constants.ts";
import { useDispatch } from 'react-redux';
import {removeUser} from "@/utils/slice/userSlice.ts";
const useLogOut=()=>{
    
    const dispatch =useDispatch()
    
    const  handleLogOut=async ()=>{
        try{
            await axios.post(`${BASE_URL}/auth/logout`,null,{withCredentials:true})
            dispatch(removeUser())
            toast.success("User logged out successfully");
        }
        catch (err){
            if (axios.isAxiosError(err)) {
                console.log(err)
                toast.error(err.response?.data || "Logout failed");
            } else {
                toast.error("Internal server error");
            }
        }
    }
    return handleLogOut
}
export default useLogOut