// utils/getAllTagsSeparately.ts
import axios from "axios";
import { BASE_URL } from "@/components/utils/constants";

const getAllTagsSeparately = async () => {
    try {
        const activitytags = await axios.get(`${BASE_URL}/api/activityTag/getAll`,{withCredentials:true},);
        const peopletags = await axios.get(`${BASE_URL}/api/peopleTag/getAll`,{withCredentials:true},);
        const placetags = await axios.get(`${BASE_URL}/api/placeTag/getAll`,{withCredentials:true},);
        // console.log(activitytags);
        return {
            activitytags: activitytags.data.data,
            peopletags: peopletags.data.data,
            placetags: placetags.data.data
        };
    } catch (error) {
        console.log(error);
        return { activitytags: [], peopletags: [], placetags: [] };
    }
};

export default getAllTagsSeparately;
