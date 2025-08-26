import { useSelector} from "react-redux";
import type { User} from "@/utils/types.ts";
import { BentoGrid } from "../magicui/bento-grid";
import CheckinBox from "@/components/Dashboard/CheckinBox.tsx";
import CalendarBox from "@/components/Dashboard/CalendarBox.tsx";
import DailyBox from "@/components/Dashboard/DailyBox.tsx";
import RecommendedTools from "./RecommendedTools/RecommendedTools.tsx";
import EmotionBox from "@/components/Dashboard/EmotionBox.tsx";
import WeeklyBox from "@/components/Dashboard/WeeklyBox.tsx";
import ActivityBox from "@/components/Dashboard/ActivityBox.tsx";
import PlaceBox from "@/components/Dashboard/PlaceBox.tsx";
import PeopleBox from "@/components/Dashboard/PeopleBox.tsx";
import useFetchCheckIn from "@/utils/hooks/useFetchCheckIn.ts";
import useGetAllTags from "@/utils/hooks/useGetAllTags.ts";
import Footer from "@/components/Footer.tsx";
import PersonaWrap from "@/components/AiSummary/PersonaWrap.tsx";
import {useEffect} from "react";
import {AnimatePresence, motion} from "framer-motion";
import useGetAllFeedback from "@/utils/hooks/useGetAllFeedback.ts";
import WeeklyWeb from "@/components/Dashboard/WeeklyWeb.tsx";


const Dashboard=()=>{

    const user=useSelector((store:{user:null|User})=>store.user);
    const getAllCheckin=useFetchCheckIn()
    const getAllTagsSeparately=useGetAllTags()
    const getAllFeedback=useGetAllFeedback();
    useEffect(()=>{
        getAllCheckin()
        getAllTagsSeparately()
        getAllFeedback()
    },[])

    return (
        <AnimatePresence mode="wait">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col min-h-screen w-full p-4 sm:p-6 lg:p-8 overflow-y-auto ">

            <h1
                className={'text-2xl sm:text-4xl lg:text-5xl  font-bold p-4 sm:p-6 font-mynabali-serif'}
            >
                {!user?.isGuest ? (
                    <span>Welcome back ,  <span className={'font-mynabali'}>{user?.firstName}</span></span>
                ): (
                    <span>Hello ,  <span className={'font-mynabali'}>Guest</span></span>
                )}

            </h1>
            <BentoGrid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-9 lg:grid-rows-12 p-4 sm:p-6 font-secondary">
                <CheckinBox/>
                <CalendarBox/>
                <DailyBox/>
                <RecommendedTools/>
                <PersonaWrap/>
                <EmotionBox/>
                <WeeklyWeb/>
                <WeeklyBox/>
                <ActivityBox/>
                <PlaceBox/>
                <PeopleBox/>

            </BentoGrid>
            <Footer/>
        </motion.div>
        </AnimatePresence>

    )
}
export default Dashboard;