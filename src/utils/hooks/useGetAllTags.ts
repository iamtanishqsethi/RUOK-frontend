import axios from "axios";
import {BASE_URL} from "@/utils/constants.ts";
import {useDispatch} from "react-redux";
import {addActivityTag, addPeopleTag, addPlaceTag} from "@/utils/slice/tagsSlice.ts";
import {toast} from "sonner";

const useGetAllTags=()=>{

    const dispatch=useDispatch();

    const getAllTagsSeparately = async () => {

        try {
            const activityResponse = await axios.get(`${BASE_URL}/activityTag/getAll`,{withCredentials:true},);
            const peopleResponse = await axios.get(`${BASE_URL}/peopleTag/getAll`,{withCredentials:true},);
            const placeResponse = await axios.get(`${BASE_URL}/placeTag/getAll`,{withCredentials:true},);

            dispatch(addActivityTag(activityResponse.data.data))
            dispatch(addPlaceTag(placeResponse.data.data))
            dispatch(addPeopleTag(peopleResponse.data.data))

        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.log(err)
                toast.error(err.response?.data.message|| err.message)
            } else {
                toast.error("Internal server error");
            }
        }
    }


    return getAllTagsSeparately

}
export default useGetAllTags;