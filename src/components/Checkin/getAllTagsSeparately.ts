// utils/getAllTagsSeparately.ts
import axios from "axios";
import { BASE_URL } from "@/utils/constants";

const getAllTagsSeparately = async () => {
    try {
        const activityResponse = await axios.get(`${BASE_URL}/api/activityTag/getAll`,{withCredentials:true},);
        const peopleResponse = await axios.get(`${BASE_URL}/api/peopleTag/getAll`,{withCredentials:true},);
        const placeResponse = await axios.get(`${BASE_URL}/api/placeTag/getAll`,{withCredentials:true},);

        return {
            allActivityTags : activityResponse.data.data,
            allPeopleTags: peopleResponse.data.data,
            allPlaceTags: placeResponse.data.data
        };
    } catch (error) {
        console.log(error);
        return {allActivityTags: [], allPeopleTags: [], allPlaceTags: [] };
    }
};

export default getAllTagsSeparately;
