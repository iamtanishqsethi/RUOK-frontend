import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { CheckIn } from "@/utils/types.ts";

function hashCheckins(checkins: CheckIn[]) {
    return JSON.stringify(
        checkins.map(({ emotion, description, activityTag, placeTag, peopleTag }) => ({
            emotion,
            description,
            activityTag,
            placeTag,
            peopleTag,
        }))
    );
}

export default function useGetWrap() {
    const [insight, setInsight] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const lastHashRef = useRef<string | null>(null);

    const checkins = useSelector(
        (state: { checkIns: { allCheckIns: CheckIn[] | null } }) =>
            state.checkIns.allCheckIns
    );

    async function getInsight(): Promise<void> {
        setError("");

        const apiKey = localStorage.getItem('gemini_api_key');
        const selectedModel = localStorage.getItem('gemini_model') || 'gemini-2.5-flash';


        if (!apiKey) {
            setError("Please enter your Gemini API key first.");
            return;
        }

        if (!checkins || checkins.length === 0) {
            setError("Please add some check-ins to access this feature to full potential.");
            return;
        }

        const currentHash = hashCheckins(checkins);

        if (lastHashRef.current === currentHash && insight) return;

        setLoading(true);

        const SYSTEM_PROMPT = `
            You are an emotional insight engine that analyzes a user's emotional check-in history in a mental health app.
            
            Each check-in includes the following:
            - emotion: the dominant feeling (e.g., happy, angry, worried)
            - description: a short user-written sentence or paragraph describing the situation
            - activityTag: what the user was doing (e.g., studying, football, relaxing)
            - placeTag: where they were (e.g., home, PG, college)
            - peopleTag: who they were with or who was involved (e.g., mom, roommate, coach)
            
            Your task is to read all check-ins, analyze the emotional patterns, and return a structured summary in the form of 5 objects:
            1. A personality-based nickname and explanation [nickname: 1-2 words, catchy, quirky and friendly, explanation: should justify the nickname]
            2. Insights based on activity tags
            3. Insights based on place tags
            4. Insights based on people tags
            5. Tailored suggestions based on the above analysis
            
            You must consider both quantitative patterns (e.g., frequency of emotions per tag) and qualitative insights (context of the description). Be thoughtful, personal, and supportive.
            If at all there exists no tags, do not create that object. (eg: user never entered a place tag in any of the checkins, so there will be only 4 objects that excludes the place tag)
            
            In each tag object, mention the most frequent and triggering activities in the form of a sentences only.
                      
            Please return exactly the following JSON structure:
            
            [
              {
                "nickname": "string",
                "description": "string"
              },
              {
                "tag": "activity",
                "positiveHeadline": "string",
                "negativeHeadline": "string",
              },
              {
                "tag": "place",
                "positiveHeadline": "string",
                "negativeHeadline": "string",
              },
              {
                "tag": "people",
                "positiveHeadline": "string",
                "negativeHeadline": "string",
              },
              {
                "tag": "suggestions",
                "activitySuggestions": ["string"],
                "placeSuggestions": ["string"],
                "peopleSuggestions": ["string"],
                "generalSuggestions": ["string"]
              }
            ]

            All Check-ins are as follows:
            ${JSON.stringify(checkins, null, 2)}
        `;

        try {

            const genAI = new GoogleGenerativeAI(apiKey);

            const model = genAI.getGenerativeModel({
                model: selectedModel,
                systemInstruction: SYSTEM_PROMPT,
            });

            const result = await model.generateContent(SYSTEM_PROMPT);
            const response = await result.response;
            const outputText = await response.text();

            const cleaned = outputText.replace(/```json|```/g, "").trim();
            const parsed = JSON.parse(cleaned);

            setInsight(parsed);
            lastHashRef.current = currentHash;
        } catch (err:any) {
            console.error("Error fetching insight:", err);
            if (err.message?.includes('API_KEY_INVALID')) {
                setError("Invalid API key. Please check your Gemini API key.");
            } else {
                setError("Failed to generate insight: " + err);
            }
        } finally {
            setLoading(false);
        }
    }

    return { insight, loading, error, getInsight };
}