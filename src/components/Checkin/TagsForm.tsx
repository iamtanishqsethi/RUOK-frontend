import {type Dispatch, type SetStateAction, useEffect, useState} from "react";
import getAllTagsSeparately from "./getAllTagsSeparately.ts";
import type {Tag} from "@/utils/types.ts";


interface TagsFormProps {
    setShowForm: (form: string) => void;
    setPayload: Dispatch<SetStateAction<{
        emotion: string;
        placeTag?: string;
        peopleTag?: string;
        activityTag?: string;
        description?: string;
    }>>
    addCheckin: () => Promise<void>;
}

const TagsForm = ({ setShowForm, setPayload, addCheckin }: TagsFormProps) => {
    const [activityTag, setActivityTag] = useState("");
    const [peopleTag, setPeopleTag] = useState("");
    const [placeTag, setPlaceTag] = useState("");

    const [suggestions, setSuggestions] = useState({
        activityTags: [] as string[],
        peopleTags: [] as string[],
        placeTags: [] as string[]
    });

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const { allActivityTags, allPeopleTags, allPlaceTags } = await getAllTagsSeparately();
                setSuggestions({
                    activityTags: allActivityTags.map((t: Tag) => t.title),
                    peopleTags: allPeopleTags.map((t: Tag) => t.title),
                    placeTags: allPlaceTags.map((t: Tag) => t.title)
                });
            } catch (error) {
                console.error("Failed to fetch tags:", error);
            }
        };
        fetchTags();
    }, []);


    const handleSubmit = async () => {
        setPayload((prev)=>(
            {
                ...prev,
                activityTag,
                peopleTag,
                placeTag
            }
        ));
        await addCheckin()
    };

    const handleGoBack = () => {
        setShowForm("description");
    };

    return (
        <div className="w-full max-w-3xl text-white flex flex-col gap-10 mt-10 p-6 bg-black rounded-xl shadow-lg border border-violet-500">

            {/* Activity Tag */}
            <div className="flex flex-col gap-2 relative">
                <label className="text-pink-400 text-xl">What were you doing?</label>
                <input
                    type="text"
                    value={activityTag}
                    onChange={(e) => setActivityTag(e.target.value)}
                    placeholder="e.g., Studying, dancing, gaming..."
                    className="bg-black border-b-2 border-pink-500 outline-none py-2 px-1 text-white placeholder:text-violet-400"
                />
                <ul className="flex gap-2 mt-1 max-h-32 overflow-y-auto text-sm rounded-md bg-black">
                    {suggestions.activityTags
                        .filter(tag => tag.toLowerCase().includes(activityTag.toLowerCase()))
                        .map(tag => (
                            <li
                                key={tag}
                                onClick={() => setActivityTag(tag)}
                                className="px-4 py-1 border-2 hover:bg-violet-600 cursor-pointer rounded-4xl"
                            >
                                {tag}
                            </li>
                        ))}
                </ul>
            </div>

            {/* People Tag */}
            <div className="flex flex-col gap-2 relative">
                <label className="text-blue-400 text-xl">With whom were you doing it?</label>
                <input
                    type="text"
                    value={peopleTag}
                    onChange={(e) => setPeopleTag(e.target.value)}
                    placeholder="e.g., Alone, friends, family..."
                    className="bg-black border-b-2 border-blue-400 outline-none py-2 px-1 text-white placeholder:text-violet-400"
                />
                <ul className="flex gap-2 mt-1 max-h-32 overflow-y-auto text-sm rounded-md bg-black">
                    {suggestions.peopleTags
                        .filter(tag => tag.toLowerCase().includes(peopleTag.toLowerCase()))
                        .map(tag => (
                            <li
                                key={tag}
                                onClick={() => setPeopleTag(tag)}
                                className="px-4 py-1 border-2 hover:bg-violet-600 cursor-pointer rounded-4xl"
                            >
                                {tag}
                            </li>
                        ))}
                </ul>
            </div>

            {/* Place Tag */}
            <div className="flex flex-col gap-2 relative">
                <label className="text-purple-400 text-xl">Where were you doing it?</label>
                <input
                    type="text"
                    value={placeTag}
                    onChange={(e) => setPlaceTag(e.target.value)}
                    placeholder="e.g., Home, cafe, park..."
                    className="bg-black border-b-2 border-purple-400 outline-none py-2 px-1 text-white placeholder:text-violet-400"
                />
                <ul className="flex gap-2 mt-1 max-h-32 overflow-y-auto text-sm rounded-md bg-black">
                    {suggestions.placeTags
                        .filter(tag => tag.toLowerCase().includes(placeTag.toLowerCase()))
                        .map(tag => (
                            <li
                                key={tag}
                                onClick={() => setPlaceTag(tag)}
                                className="px-4 py-1 border-2 hover:bg-violet-600 cursor-pointer rounded-4xl"
                            >
                                {tag}
                            </li>
                        ))}
                </ul>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
                <button
                    onClick={handleGoBack}
                    className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
                >
                    ← Back to Description
                </button>
                <button
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
                >
                    Submit Check-in
                </button>
            </div>
        </div>
    );
};

export default TagsForm;
