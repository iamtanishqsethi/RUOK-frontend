import axios from "axios";
import {toast} from "sonner";
import {useDispatch, useSelector} from "react-redux";
import type {Emotion} from "@/utils/types.ts";
import {addEmotions} from "@/utils/slice/emotionSlice.ts";
import {useEffect} from "react";
import api from "@/services/Api.ts";

const useGetAllEmotions = () => {

    const emotions=useSelector((store:{emotion:Emotion[]|null})=>store.emotion)
    const dispatch = useDispatch()

    const getAllEmotions = async () => {
        try {
            const response = await api.get(`/emotion/getAll`, {
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