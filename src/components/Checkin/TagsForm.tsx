import {type Dispatch, type SetStateAction, useEffect, useState} from "react";
import type {Payload, Tag} from "@/utils/types.ts";
import {ArrowRight, ChevronLeft, Plus, X} from "lucide-react";
import { useSelector } from "react-redux";

interface TagsFormProps {
    setShowForm: (form: string) => void;
    setPayload: Dispatch<SetStateAction<Payload>>
    addCheckin: () => Promise<void>;
}

const TagsForm = ({ setShowForm, setPayload, addCheckin }: TagsFormProps) => {
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
        <div className="w-full flex flex-col items-center justify-center min-h-screen relative bg-[#f2f2f2] dark:bg-[#050505]">

            <div className="flex flex-col justify-center max-w-2xl w-full  px-6 space-y-8">
                <h1 className={'text-4xl  font-medium mb-[90px]'}>Choose or create tags for Check-In</h1>
                <div>
                    <h1 className="text-3xl italic font-medium mb-4 text-black dark:text-[#e6e6e6]">
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
                    <h1 className="text-3xl italic font-medium mb-4 text-black dark:text-white">
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
                    <h1 className="text-3xl italic font-medium mb-4 text-black dark:text-white">
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

            <div className="flex items-center justify-between z-20 absolute w-full bottom-10 px-12">
                <button
                    onClick={handleGoBack}
                    className="w-18 h-18 rounded-full flex items-center justify-center shadow-lg bg-zinc-900 dark:bg-white text-white dark:text-black
                     transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                    aria-label="Back to Chart"
                >
                    <ChevronLeft className="w-10 h-10 stroke-[2]" />
                </button>
                <button
                    onClick={handleSubmit}
                    className="w-36 h-18 rounded-full flex items-center justify-center shadow-lg bg-zinc-900 dark:bg-white text-white dark:text-black
                     transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer font-medium text-lg"
                    aria-label="Next to Tags"
                >
                    Check in <ArrowRight />
                </button>
            </div>
        </div>
    );
};

export default TagsForm;
