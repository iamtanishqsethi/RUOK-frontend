import {useDispatch, useSelector} from "react-redux";
import type {CheckIn} from "@/utils/types.ts";
import {addWeeklyCheckIns} from "@/utils/slice/checkInSlice.ts";

export const useGetWeekCheckIn = () => {
    const dispatch = useDispatch();
    const checkIns=useSelector((store:{checkIns:{allCheckIns:CheckIn[]|null}})=>store.checkIns.allCheckIns)
    const {startOfWeek,endOfWeek}=getWeekRange(new Date(Date.now()))

    const weekCheckIn=checkIns?.filter((checkIn)=>{
        const checkInDate=new Date(checkIn.createdAt)
        return checkInDate>=startOfWeek && checkInDate<=endOfWeek
    })
    if(weekCheckIn!==undefined){
        dispatch(addWeeklyCheckIns(weekCheckIn))
    }
    return weekCheckIn
}

const getWeekRange=(date:Date)=>{
    const currentDate=new Date(date)

    const currentDay=currentDate.getDay()//returns 0 for sunday , 1 for monday
    const startOfWeek=new Date(currentDate)
    startOfWeek.setDate(currentDate.getDate()-currentDay)
    startOfWeek.setHours(0,0,0,0)

    const endOfWeek=new Date(startOfWeek)
    endOfWeek.setDate(endOfWeek.getDate()+6)
    endOfWeek.setHours(23,59,59,999)

    return {startOfWeek,endOfWeek}

}