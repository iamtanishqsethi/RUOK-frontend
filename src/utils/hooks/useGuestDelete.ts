import axios from "axios";
import {toast} from "sonner";
import {BASE_URL} from "@/utils/constants.ts";
const useGuestDelete = () => {


    const deleteGuest = async () => {
        try{
            await axios.delete(`${BASE_URL}/auth/delete-guest`,{withCredentials:true})

        }
        catch (err){
            if (axios.isAxiosError(err)) {
                console.log(err)
                toast.error(err.response?.data || "Deletion failed");
            } else {
                toast.error("Internal server error");
            }
        }
    }
    return deleteGuest;
}
export default useGuestDelete