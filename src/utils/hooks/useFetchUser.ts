import {addUser} from "@/utils/slice/userSlice.ts";
import {useDispatch} from "react-redux";
import api from "@/services/Api.ts";
const useFetchUser=()=>{
    const dispatch = useDispatch();
    const fetchUser=async ()=>{
        const response=await api.get(`/profile/get`,{withCredentials:true})
        dispatch(addUser(response.data.data))
    }
    return fetchUser;
}
export default useFetchUser;