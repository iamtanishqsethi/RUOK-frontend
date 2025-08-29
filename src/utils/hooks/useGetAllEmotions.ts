import axios from "axios";
import {BASE_URL} from "@/utils/constants.ts";
import {toast} from "sonner";
import {useDispatch, useSelector} from "react-redux";
import type {Emotion} from "@/utils/types.ts";
import {addEmotions} from "@/utils/slice/emotionSlice.ts";
import {useEffect} from "react";

const useGetAllEmotions = () => {

    const emotions=useSelector((store:{emotion:Emotion[]|null})=>store.emotion)
    const dispatch = useDispatch()

    const getAllEmotions = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/emotion/getAll`, {
                withCredentials: true,
            })
            dispatch(addEmotions(response?.data?.data))
        } catch (err) {
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data.message || "Failed to fetch emotions");
            } else {
                toast.error("Internal server error");
            }
        }
    }


    useEffect(() => {
      if(emotions === null){
          getAllEmotions();
      }
    },[])
}
export default useGetAllEmotions;