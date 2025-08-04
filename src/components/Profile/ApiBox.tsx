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
const ApiBox = () => {

    const user = useSelector((state: { user: User | null }) => state.user);
    const [isGuest, setIsGuest] = useState(false);
    const [apiKey, setApiKey] = useState<string>('');
    const [selectedModel, setSelectedModel] = useState('');

    useEffect(() => {
        const savedApiKey = localStorage.getItem('gemini_api_key')
        const savedModel = localStorage.getItem('gemini_model')
        if(savedApiKey){
            setApiKey(savedApiKey)
        }
        if(savedModel){
            setSelectedModel(savedModel)
        }
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
        localStorage.setItem('gemini_model', value);
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
                    <SelectItem value="gemini-2.5-flash-preview-04-17">Gemini 2.5 Flash (Preview)</SelectItem>
                    <SelectItem value="gemini-2.0-flash">Gemini 2.0 Flash</SelectItem>
                    <SelectItem value="gemini-2.0-flash-lite">Gemini 2.0 Flash-Lite</SelectItem>
                    <SelectItem value="gemini-1.5-flash">Gemini 1.5 Flash</SelectItem>
                    <SelectItem value="gemini-1.5-pro">Gemini 1.5 Pro</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

export default ApiBox;
