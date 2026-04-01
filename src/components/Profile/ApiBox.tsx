import { Input } from "../ui/input";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import {type ChangeEvent, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import type {User} from "@/utils/types.ts";
import mixpanelService from "@/services/MixpanelService.ts";
import {
    GEMINI_MODELS,
    GEMINI_MODEL_STORAGE_KEY,
    getStoredGeminiModel,
} from "@/utils/gemini.ts";
const ApiBox = () => {

    const user = useSelector((state: { user: User | null }) => state.user);
    const [isGuest, setIsGuest] = useState(false);
    const [apiKey, setApiKey] = useState<string>('');
    const [selectedModel, setSelectedModel] = useState('');

    useEffect(() => {
        const savedApiKey = localStorage.getItem('gemini_api_key')
        if(savedApiKey){
            setApiKey(savedApiKey)
        }
        setSelectedModel(getStoredGeminiModel())
    }, []);
    useEffect(() => {
        if(user?.isGuest){
            setIsGuest(true);
        }
    }, [user]);

    const handleApiKeyChange = (e:ChangeEvent<HTMLInputElement>) => {
        const newApiKey = e.target.value;
        setApiKey(newApiKey);
        mixpanelService.trackButtonClick('Api key changed', { location: 'Profile' });

        if (newApiKey.trim()) {
            localStorage.setItem('gemini_api_key', newApiKey);
        } else {
            localStorage.removeItem('gemini_api_key');
        }
    };

    const handleModelChange = (value:string) => {
        setSelectedModel(value);
        localStorage.setItem(GEMINI_MODEL_STORAGE_KEY, value);
    };

    return (
        <div className="bg-zinc-100 dark:bg-zinc-950 border-2 rounded-3xl p-6 w-full md:w-1/2 flex flex-col items-center gap-6">

            <Input
                type="password"
                placeholder="Enter Gemini API Key"
                className="w-full max-w-md"
                value={apiKey}
                onChange={handleApiKeyChange}
                disabled={isGuest}
            />

            <Select value={selectedModel} disabled={isGuest} onValueChange={handleModelChange}>
                <SelectTrigger className="w-full max-w-md">
                    <SelectValue placeholder="Select Gemini Model" />
                </SelectTrigger>
                <SelectContent>
                    {GEMINI_MODELS.map((model) => (
                        <SelectItem key={model.value} value={model.value}>
                            {model.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default ApiBox;
