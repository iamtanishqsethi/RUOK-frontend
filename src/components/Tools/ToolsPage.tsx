import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/utils/hooks/use-outside-click.tsx";
import SlideStepper from "@/components/Tools/SlideStepper";
import { MagicCard } from "@/components/magicui/magic-card";
import { cards } from "@/components/Tools/Cards";
import type {CheckIn, User} from "@/utils/types.ts";
import { useSelector } from "react-redux";
import type { TechniqueCard, Category } from "@/utils/types";
import {
  BASE_URL,
  highEnergyPleasantAccent,
  highEnergyPleasantGlow,
  highEnergyPleasantPrimary,
  highEnergyPleasantSecondary,
  highEnergyUnpleasantAccent,
  highEnergyUnpleasantGlow,
  highEnergyUnpleasantPrimary,
  highEnergyUnpleasantSecondary,
  lowEnergyPleasantAccent,
  lowEnergyPleasantGlow,
  lowEnergyPleasantPrimary,
  lowEnergyPleasantSecondary,
  lowEnergyUnpleasantAccent,
  lowEnergyUnpleasantGlow,
  lowEnergyUnpleasantPrimary,
  lowEnergyUnpleasantSecondary
} from "@/utils/constants";
import { X } from "lucide-react";
import {useGetDayCheckIn} from "@/utils/hooks/useGetDayCheckIn.ts";
import FeedbackCard from "@/components/Tools/FeedbackCard.tsx";
import axios from "axios";
import {toast} from "sonner";
import mixpanelService from "@/services/MixpanelService.ts";

const colorMapping: Record<Category, {
  primary: string;
  secondary: string;
  accent: string;
  glow: string;
}> = {
  "High Energy Unpleasant": {
    primary: highEnergyUnpleasantPrimary,
    secondary: highEnergyUnpleasantSecondary,
    accent: highEnergyUnpleasantAccent,
    glow: highEnergyUnpleasantGlow,
  },
  "Low Energy Unpleasant": {
    primary: lowEnergyUnpleasantPrimary,
    secondary: lowEnergyUnpleasantSecondary,
    accent: lowEnergyUnpleasantAccent,
    glow: lowEnergyUnpleasantGlow,
  },
  "High Energy Pleasant": {
    primary: highEnergyPleasantPrimary,
    secondary: highEnergyPleasantSecondary,
    accent: highEnergyPleasantAccent,
    glow: highEnergyPleasantGlow,
  },
  "Low Energy Pleasant": {
    primary: lowEnergyPleasantPrimary,
    secondary: lowEnergyPleasantSecondary,
    accent: lowEnergyPleasantAccent,
    glow: lowEnergyPleasantGlow,
  },
};

export function ToolsPage() {
  const user = useSelector((store: { user: User | null }) => store.user);
  const [active, setActive] = useState<TechniqueCard | boolean | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const [toolName, setToolName] = useState<string>("");
  const [isFeedback, setIsFeedback] = useState<boolean>(false);
  const [sliderValue, setSliderValue] = useState([50]);
  const [feedbackLoading, setFeedbackLoading] = useState(false);

  useEffect(() => {
    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);


  useGetDayCheckIn()
  const latest = useSelector((store: {checkIns: {latestCheckIn: CheckIn | null}}) => store.checkIns.latestCheckIn);


  const handleToolClick=(card:TechniqueCard)=>{
    setActive(card);
    setToolName(card?.title)
    mixpanelService.trackButtonClick(`Tool Used ${card?.title}`, { location: 'Tools Page' });
  }

  const handleExit=()=>{
    setActive(null)
    setIsFeedback(true)
  }
  const handleFeedback=async ()=>{
    try{
      setFeedbackLoading(true)
      const response=await axios.post(`${BASE_URL}/feedback/new/`,{
        toolName:toolName,
        rating:sliderValue[0],
        checkIn:latest?._id
      },{withCredentials:true})
      toast.success(response.data.message)
    }
    catch(err:any){
      if (axios.isAxiosError(err)) {
        console.log(err);
        toast.error(err.response?.data.message || err.message);
      }
      else{
        toast.error(err.response.data.message||"Failed to submit feedback")
      }

    }
    finally{
      setIsFeedback(false)
      setSliderValue([50])
      setToolName("")
      setFeedbackLoading(false)
    }
  }
  useOutsideClick(ref, handleExit);

  return (
    <div
      className={`
        w-full
        flex flex-col items-start justify-start
        min-h-screen
        overflow-y-auto py-6 sm:py-10 relative 
        ${active||isFeedback ? "overflow-hidden" : ""}`}
    >

      {/*feedback popover*/}
      {isFeedback && latest && (
          <FeedbackCard
          latestCheckIn={latest}
          sliderValue={sliderValue}
          setSliderValue={setSliderValue}
          toolName={toolName}
          handleFeedback={handleFeedback}
          feedbackLoading={feedbackLoading}
      />)}



      <AnimatePresence mode="wait">
        <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className={'text-2xl sm:text-4xl lg:text-5xl font-bold p-5 sm:px-10 sm:py-7 font-mynabali-serif'}>
          Need some help, <span className={'font-mynabali'}>{user?.firstName}</span> ?
        </motion.h1>
      </AnimatePresence>



        <AnimatePresence>
          {active && typeof active === "object" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-lg h-full w-full z-10"
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {active && typeof active === "object" ? (
            <div className="fixed inset-4 sm:inset-0 p-4 sm:p-8 grid place-items-center z-[100]">
              <motion.button
                key={`button-${active.title}-${id}`}
                layout
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                  transition: {
                    duration: 0.05,
                  },
                }}
                className="flex absolute top-6 -right-2 sm:top-8 sm:right-8 items-center justify-center bg-white dark:bg-zinc-800 rounded-full h-10 w-10 shadow-lg z-[110] cursor-pointer border border-zinc-200 dark:border-zinc-700"
                onClick={handleExit}
              >
                <X className="h-5 w-5"/>
              </motion.button>
              <motion.div
                layoutId={`card-${active.title}-${id}`}
                ref={ref}
                className="
                relative w-full max-w-[500px] h-[60vh]
                sm:h-auto sm:max-h-[90vh] sm:max-w-[600px]
                md:max-w-[700px] md:h-[60vh]
                lg:max-w-[750px] lg:h-[50vh]
                xl:max-w-[600px] xl:h-[60vh]
                flex flex-col
                bg-zinc-100 dark:bg-zinc-900
                rounded-xl sm:rounded-3xl
                overflow-hidden
                "
              >

                  <div className="shrink-0 px-8 py-4">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="text-center text-2xl sm:text-3xl lg:text-4xl xl:text-3xl font-bold text-zinc-700 dark:text-zinc-200 pt-sans-regular sm:pt-2 lg:pt-6 xl:pt-4"
                    >
                      {active.title}
                    </motion.h3>
                  </div>
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 text-zinc-600 text-xs md:text-sm lg:text-base h-auto md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-zinc-400 [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                    >
                      {active.steps && (
                          <SlideStepper
                            steps={active.steps}
                            cardTitle={active.title}
                          />
                      )}
                    </motion.div>
              </motion.div>
            </div>
          ) : null}
        </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.ul
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
          className="
          w-full
          grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
          gap-4
          px-10 pb-12 md:p-6 lg:p-8
          "
        >
          {cards.map((card) => {
            const colors = colorMapping[card.category];
            return (
              <motion.div
                key={card.title}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="rounded-xl"
              >
              <MagicCard
                key={card.title}
                className="rounded-xl"
                gradientSize={250}
                gradientFrom={colors.primary}
                gradientTo={colors.secondary}
                gradientColor={colors.accent}
                gradientOpacity={0.7}
              >

                <motion.div
                  layoutId={`card-${card.title}-${id}`}
                  onClick={() => handleToolClick(card)}
                  className="cursor-pointer"
                  // whileHover={{ scale: 1.05 }}
                  // whileTap={{ scale: 0.98 }}
                  // transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                   <div className="h-44 sm:h-56 md:h-64 lg:h-70 flex flex-col  items-center sm:p-6 space-y-4">
                    <motion.div
                      layoutId={`image-${card.title}-${id}`}
                      className="flex-shrink-0"
                    >
                      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 flex items-center justify-center my-2">
                        <div className="relative w-full h-full group">
                          <img
                            src={card.src}
                            alt={card.title}
                            className="w-full h-full object-contain absolute top-0 left-0 transition-opacity duration-300 ease-in-out group-hover:opacity-0"
                          />
                          {card.afterSrc && (
                            <img
                              src={card.afterSrc}
                              alt={`${card.title} after`}
                              className="w-full h-full object-contain absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                            />
                          )}
                        </div>

                      </div>
                    </motion.div>
                    <div className="flex-1 flex items-center justify-center">
                    <motion.h3
                      layoutId={`title-${card.title}-${id}`}
                      className="font-medium text-zinc-800 dark:text-zinc-200 text-center text-base sm:text-lg md:text-xl xl:text-lg leading-tight pt-sans-regular"
                    >
                      {card.title}
                    </motion.h3>
                    </div>
                  </div>
                </motion.div>
              </MagicCard>
              </motion.div>
            );
          })}
        </motion.ul>
      </AnimatePresence>
    </div>
  );
}



export default ToolsPage;