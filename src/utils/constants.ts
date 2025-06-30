export const BASE_URL: string = 'http://localhost:8000';

export const getWeekRange=(date:Date)=>{
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