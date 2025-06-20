const getFilteredEmotions = (mood,allEmotion) => {
    const filteredEmotion = allEmotion.filter(emotion => {
        if (emotion.type===mood){
            return emotion;
        }
    })
    return filteredEmotion
}
export default getFilteredEmotions