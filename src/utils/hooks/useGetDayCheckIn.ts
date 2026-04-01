import { useEffect, useMemo } from "react";
import {useDispatch, useSelector} from "react-redux";
import type {CheckIn} from "@/utils/types.ts";
import {addDayCheckIns, addLatestCheckIns} from "@/utils/slice/checkInSlice.ts";

export const useGetDayCheckIn=()=>{

    const date=new Date(Date.now())
    const currentDay = date.getDate();
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    const dispatch=useDispatch()

    const checkIns=useSelector((store:{checkIns:{allCheckIns:CheckIn[]|null}})=>store.checkIns.allCheckIns)
    const todayCheckIn = useMemo(
        () =>
            (checkIns ?? []).filter((checkIn) => {
                const checkInDate=new Date(checkIn.createdAt)
                return checkInDate.getDate()===currentDay &&
                    checkInDate.getMonth()===currentMonth &&
                    checkInDate.getFullYear()===currentYear
            }),
        [checkIns, currentDay, currentMonth, currentYear]
    );

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

    const latestCheckIn = useMemo(() => getLatestCheckIn(todayCheckIn), [todayCheckIn]);

    useEffect(() => {
        dispatch(addDayCheckIns(todayCheckIn))
        dispatch(addLatestCheckIns(latestCheckIn))
    }, [dispatch, latestCheckIn, todayCheckIn]);


    return todayCheckIn

}
