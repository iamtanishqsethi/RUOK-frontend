import axios from 'axios';
import {BASE_URL} from "@/utils/constants.ts";
import {addUser} from "@/utils/userSlice.ts";
import {useDispatch} from "react-redux";
const useFetchUser=()=>{
    const dispatch = useDispatch();
    const fetchUser=async ()=>{
        const response=await axios.get(`${BASE_URL}/api/profile/get`,{withCredentials:true})
        dispatch(addUser(response.data.data))
    }
    return fetchUser;
}
export default useFetchUser;