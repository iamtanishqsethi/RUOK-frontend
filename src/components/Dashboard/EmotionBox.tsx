const EmotionBox = () => {
    return (
        <div
            className={"group relative  flex flex-col justify-between items-center overflow-hidden rounded-xl lg:col-start-1 lg:col-end-4 lg:row-start-7 lg:row-end-10 lg:h-[18rem] " +
                "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] " +
                "transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] " +
                "p-10"}
        >
            Emotion line graph
        </div>
    )
}
export default EmotionBox