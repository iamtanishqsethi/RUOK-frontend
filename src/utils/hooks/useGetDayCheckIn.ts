import {useDispatch, useSelector} from "react-redux";
import type {CheckIn} from "@/utils/types.ts";
import {addDayCheckIns, addLatestCheckIns} from "@/utils/slice/checkInSlice.ts";

export const useGetDayCheckIn=()=>{

    const date=new Date(Date.now())
    const dispatch=useDispatch()

    const checkIns=useSelector((store:{checkIns:{allCheckIns:CheckIn[]|null}})=>store.checkIns.allCheckIns)
    const todayCheckIn=checkIns?.filter((checkIn)=>{
        const checkInDate=new Date(checkIn.createdAt)
        return checkInDate.getDate()===date.getDate() &&
            checkInDate.getMonth()===date.getMonth() &&
            checkInDate.getFullYear()===date.getFullYear()
    })

    const getLatestCheckIn=(todayCheckIn:CheckIn[]):CheckIn|null=>{
        if(!todayCheckIn||todayCheckIn.length===0){
            return null
        }
        return todayCheckIn.reduce((latest, current) => {
            const latestDate = new Date(latest.createdAt);
            const currentDate = new Date(current.createdAt);

            return currentDate > latestDate ? current : latest;
        })
    }

    if(todayCheckIn!==undefined){
        dispatch(addDayCheckIns(todayCheckIn))

        dispatch(addLatestCheckIns(getLatestCheckIn(todayCheckIn)))
    }


    return todayCheckIn

}