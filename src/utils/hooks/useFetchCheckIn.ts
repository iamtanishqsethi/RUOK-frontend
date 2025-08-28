import axios from "axios";
import {toast} from "sonner";
import { useDispatch } from "react-redux";
import {addCheckIns} from "@/utils/slice/checkInSlice.ts";
import api from "@/services/Api.ts";
const useFetchCheckIn=()=>{

    const dispatch = useDispatch();

    const getAllCheckin=async ()=>{
        try{
            const response=await api.get(`/checkin/getAll`,{withCredentials:true})
            dispatch(addCheckIns(response?.data?.data))
        }
        catch(err){
            if (axios.isAxiosError(err)) {
                console.log(err)
                toast.error(err.response?.data.message || err.message)
            } else {
                toast.error("Internal server error");
            }
        }
    }

    return  getAllCheckin

}

export default useFetchCheckIn;