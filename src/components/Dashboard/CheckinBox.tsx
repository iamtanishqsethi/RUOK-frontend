import { Plus } from "lucide-react";
import { motion } from "motion/react";

const CheckinBox=()=>{
    return (
        <div
            className={"group relative  flex flex-col justify-between items-center overflow-hidden rounded-xl lg:col-start-1 lg:col-end-5 lg:row-start-1 lg:row-end-4 lg:h-[18rem] " +
                "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] " +
                "transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] " +
                "p-10"}
        >
            <h1 className={'text-2xl text-center font-medium'}>
                How have you felling today ?
            </h1>
            <div className="relative">

                <motion.div
                    className="absolute inset-0 rounded-full border-2 border-gray-300 dark:border-gray-600 border-t-transparent w-32 h-32 -top-2 -left-2"
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />


                <motion.button
                    className={'rounded-full h-28 w-28 bg-zinc-800 dark:bg-white text-white dark:text-black flex flex-col items-center justify-center relative z-10'}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    <Plus size={40} />
                </motion.button>
            </div>
        </div>
    )
}
export default CheckinBox;