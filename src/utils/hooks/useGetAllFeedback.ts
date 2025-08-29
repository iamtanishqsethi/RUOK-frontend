import axios from "axios";
import {BASE_URL} from "@/utils/constants.ts";
import {toast} from "sonner";
import {useDispatch} from "react-redux";
import {addFeedback} from "@/utils/slice/feedbackSlice.ts";

const useGetAllFeedback = () => {

    const dispatch = useDispatch()

    const getAllFeedback = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/feedback/getAll`, {
                withCredentials: true,
            })
            dispatch(addFeedback(response?.data?.data))
        } catch (err) {
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data.message || "Failed to fetch feedback");
            } else {
                toast.error("Internal server error");
            }
        }
    }


    return getAllFeedback;
}
export default useGetAllFeedback;