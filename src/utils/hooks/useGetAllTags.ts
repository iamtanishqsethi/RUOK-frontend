import axios from "axios";
import {useDispatch} from "react-redux";
import {addActivityTag, addPeopleTag, addPlaceTag} from "@/utils/slice/tagsSlice.ts";
import {toast} from "sonner";
import api from "@/services/Api.ts";

const useGetAllTags=()=>{

    const dispatch=useDispatch();

    const getAllTagsSeparately = async () => {

        try {
            const activityResponse = await api.get(`/activityTag/getAll`,{withCredentials:true},);
            const peopleResponse = await api.get(`/peopleTag/getAll`,{withCredentials:true},);
            const placeResponse = await api.get(`/placeTag/getAll`,{withCredentials:true},);

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