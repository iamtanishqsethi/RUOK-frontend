import {useDispatch, useSelector} from "react-redux";
import type {CheckIn} from "@/utils/types.ts";
import {addDayCheckIns} from "@/utils/slice/checkInSlice.ts";

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


    if(todayCheckIn!==undefined){
        dispatch(addDayCheckIns(todayCheckIn))
    }

    return todayCheckIn

}