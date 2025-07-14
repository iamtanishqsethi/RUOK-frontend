import {type Dispatch, type SetStateAction, useEffect, useState} from "react";
import type {Payload, Tag} from "@/utils/types.ts";
import { ChevronLeft, Plus, X} from "lucide-react";
import { useSelector } from "react-redux";

import {InteractiveHoverButton} from "@/components/magicui/interactive-hover-button.tsx";
import {Ripple} from "@/components/magicui/ripple.tsx";

interface TagsFormProps {
    setShowForm: (form: string) => void;
    setPayload: Dispatch<SetStateAction<Payload>>
    addCheckin: () => Promise<void>;
    isLoading:boolean
}

const TagsForm = ({ setShowForm, setPayload, addCheckin ,isLoading}: TagsFormProps) => {
    const [activityTag, setActivityTag] = useState("");
    const [peopleTag, setPeopleTag] = useState("");
    const [placeTag, setPlaceTag] = useState("");

    const [isActivityInput, setIsActivityInput] = useState(false);
    const [isPeopleInput, setIsPeopleInput] = useState(false);
    const [isPlaceInput,setIsPlaceInput] = useState(false);

    const [suggestions, setSuggestions] = useState({
        activityTags: [] as string[],
        peopleTags: [] as string[],
        placeTags: [] as string[]
    });

    const allActivityTags = useSelector((store: { tags: { activityTags: Tag[] | null } }) => store.tags.activityTags);
    const allPeopleTags = useSelector((store: {tags:{peopleTags:Tag[] | null}}) => store.tags.peopleTags);
    const allPlaceTags = useSelector((store:{tags:{placeTags:Tag[]|null}}) => store.tags.placeTags);


    useEffect(() => {
        setSuggestions({
            activityTags: allActivityTags?.map((t: Tag) => t.title) || [],
            peopleTags: allPeopleTags?.map((t: Tag) => t.title) || [],
            placeTags: allPlaceTags?.map((t: Tag) => t.title) || []
        });
    }, [allActivityTags, allPeopleTags, allPlaceTags]);

    const [shouldSubmit, setShouldSubmit] = useState(false);


    useEffect(() => {
        if (shouldSubmit) {
            setShouldSubmit(false);
            addCheckin();
        }
    }, [shouldSubmit, addCheckin]);


    const handleSubmit = async () => {
        setPayload((prev)=>(
            {
                ...prev,
                activityTag,
                peopleTag,
                placeTag
            }
        ));
        setShouldSubmit(true);
    };

    const handleGoBack = () => {
        setShowForm("description");
    };

    return (
        <div className="font-secondary w-full flex flex-col items-center justify-center min-h-screen relative ">
            <Ripple className={'bg-[]'} />
            <div className="flex flex-col justify-center max-w-2xl w-full  px-6 space-y-8">

                <h1 className={'text-3xl md:text-4xl  font-medium mb-12 font-mynabali-serif'}>
                    Choose or create tags for Check-In
                </h1>
                <div>
                    <h1 className="text-2xl italic font-medium mb-4 text-black dark:text-[#e6e6e6] font-mynabali-serif">
                        Activity
                    </h1>
                    <div className="flex flex-wrap gap-2 items-center">
                        {suggestions.activityTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setActivityTag(tag)}
                                className={`px-4 py-2 border rounded-full text-sm font-medium transition-all duration-200 ${
                                    activityTag === tag
                                        ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white'
                                        : 'bg-white dark:bg-black text-black dark:text-white border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black'
                                }`}
                            >
                                {tag}
                            </button>
                        ))}
                        <button
                            className="border border-black dark:border-white bg-white dark:bg-black hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-black dark:text-white rounded-full p-2 transition-all duration-200"
                            onClick={() => setIsActivityInput(!isActivityInput)}
                        >
                            {isActivityInput ? <X size={16} /> : <Plus size={16} />}
                        </button>
                    </div>
                    {isActivityInput && (
                        <input
                            type="text"
                            value={activityTag}
                            onChange={(e) => setActivityTag(e.target.value)}
                            placeholder="Add new activity"
                            className="w-full mt-3 bg-white dark:bg-black border-b-2 border-black dark:border-white outline-none py-2 px-1 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        />
                    )}
                </div>

                <div>
                    <h1 className="text-2xl italic font-medium mb-4 font-mynabali-serif">
                        Person
                    </h1>
                    <div className="flex flex-wrap gap-2 items-center">
                        {suggestions.peopleTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setPeopleTag(tag)}
                                className={`px-4 py-2 border rounded-full text-sm font-medium transition-all duration-200 ${
                                    peopleTag === tag
                                        ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white'
                                        : 'bg-white dark:bg-black text-black dark:text-white border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black'
                                }`}
                            >
                                {tag}
                            </button>
                        ))}
                        <button
                            className="border border-black dark:border-white bg-white dark:bg-black hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-black dark:text-white rounded-full p-2 transition-all duration-200"
                            onClick={() => setIsPeopleInput(!isPeopleInput)}
                        >
                            {isPeopleInput ? <X size={16} /> : <Plus size={16} />}
                        </button>
                    </div>
                    {isPeopleInput && (
                        <input
                            type="text"
                            value={peopleTag}
                            onChange={(e) => setPeopleTag(e.target.value)}
                            placeholder="Add new person"
                            className="w-full mt-3 bg-white dark:bg-black border-b-2 border-black dark:border-white outline-none py-2 px-1 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        />
                    )}
                </div>

                <div>
                    <h1 className="text-2xl italic font-medium mb-4 font-mynabali-serif">
                        Place
                    </h1>
                    <div className="flex flex-wrap gap-2 items-center">
                        {suggestions.placeTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setPlaceTag(tag)}
                                className={`px-4 py-2 border rounded-full text-sm font-medium transition-all duration-200 ${
                                    placeTag === tag
                                        ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white'
                                        : 'bg-white dark:bg-black text-black dark:text-white border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black'
                                }`}
                            >
                                {tag}
                            </button>
                        ))}
                        <button
                            className="border border-black dark:border-white bg-white dark:bg-black hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-black dark:text-white rounded-full p-2 transition-all duration-200"
                            onClick={() => setIsPlaceInput(!isPlaceInput)}
                        >
                            {isPlaceInput ? <X size={16} /> : <Plus size={16} />}
                        </button>
                    </div>
                    {isPlaceInput && (
                        <input
                            type="text"
                            value={placeTag}
                            onChange={(e) => setPlaceTag(e.target.value)}
                            placeholder="Add new place"
                            className="w-full mt-3 bg-white dark:bg-black border-b-2 border-black dark:border-white outline-none py-2 px-1 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        />
                    )}
                </div>
            </div>

            <div className="flex items-center justify-between z-20 absolute w-full bottom-24 md:bottom-10 px-12">
                <button
                    onClick={handleGoBack}
                    className="border w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg bg-black/40 backdrop-blur-2xl text-white transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"

                    aria-label="Back to description"
                >
                    <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 stroke-[2]" />
                </button>
                <InteractiveHoverButton
                    onClick={handleSubmit}
                    className={'text-lg'}
                    aria-label="Check in "
                    disabled={isLoading}
                >
                    {isLoading?'Checking in....':'Check in'}
                </InteractiveHoverButton>
            </div>
        </div>
    );
};

export default TagsForm;
