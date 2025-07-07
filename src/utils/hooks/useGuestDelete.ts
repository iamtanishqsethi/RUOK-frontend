import axios from "axios";
import {toast} from "sonner";
import {BASE_URL} from "@/utils/constants.ts";
import {removeUser} from "@/utils/slice/userSlice.ts";
import { useDispatch } from "react-redux";

const useGuestDelete = () => {
    const dispatch = useDispatch();

    const deleteGuest = async () => {
        try{
            await axios.delete(`${BASE_URL}/api/auth//delete-guest`,{withCredentials:true})
            dispatch(removeUser())
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
    return deleteGuest;
}
export default useGuestDelete