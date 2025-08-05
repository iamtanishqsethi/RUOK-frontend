import { useState, useRef, useMemo } from "react";
import { useSelector } from "react-redux";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { cards } from "../../components/Tools/Cards.tsx";
import type {CheckIn, Feedback} from "@/utils/types.ts";



function hashData(feedbacks: Feedback[], latestCheckIn: CheckIn | null) {
    const feedbackHash = JSON.stringify(
        feedbacks.map(({ toolName, rating, checkIn }) => ({
            toolName,
            rating,
            checkIn: {
                emotion: checkIn?.emotion || { title: "", type: "" },
                description: checkIn?.description || null,
                activityTag: checkIn?.activityTag || null,
                placeTag: checkIn?.placeTag || null,
                peopleTag: checkIn?.peopleTag || null,
            },
        }))
    );
    const checkInHash = latestCheckIn
        ? JSON.stringify({
            emotion: latestCheckIn.emotion,
            description: latestCheckIn.description || null,
            activityTag: latestCheckIn.activityTag || null,
            placeTag: latestCheckIn.placeTag || null,
            peopleTag: latestCheckIn.peopleTag || null,
        })
        : "";
    return feedbackHash + checkInHash;
}

export default function useGetFeedbackInsight() {
    const [insight, setInsight] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const lastHashRef = useRef<string | null>(null);

    const feedbacks = useSelector(
        (state: { feedback: Feedback[] | null }) => state.feedback || []
    );
    const latestCheckIn = useSelector(
        (state: { checkIns: { latestCheckIn: CheckIn | null } }) => state.checkIns.latestCheckIn
    );

    const getInsight = useMemo(
        () =>
            async function () {
                setError("");

                const apiKey = localStorage.getItem("gemini_api_key");
                const selectedModel = localStorage.getItem("gemini_model") || "gemini-2.5-flash";

                if (!apiKey) {
                    setError("Please enter your Gemini API key first.");
                    return;
                }

                if (!latestCheckIn) {
                    setError("No recent check-in found to generate suggestions.");
                    return;
                }

                if (!feedbacks || feedbacks.length === 0) {
                    setError("No feedback available. Please provide feedback on tools to receive tailored suggestions.");
                    return;
                }

                const currentHash = hashData(feedbacks, latestCheckIn);

                if (lastHashRef.current === currentHash && insight) return;

                setLoading(true);

                const SYSTEM_PROMPT = `
  You are an emotional insight engine for a mental health app, analyzing a user's feedback history and latest check-in to provide tailored, encouraging tool suggestions in a conversational tone.

  Each feedback includes:
  - toolName: the tool used (e.g., "Anchoring Happy Emotions")
  - rating: a score from 0-100 indicating effectiveness
  - checkIn: details of the emotional state, including:
    - emotion: the dominant feeling (e.g., Happy, Angry)
    - description: a user-written sentence or paragraph (optional, may be null)
    - activityTag: what the user was doing (e.g., cricket, optional, may be null)
    - placeTag: where they were (e.g., school, optional, may be null)
    - peopleTag: who they were with (e.g., alone, optional, may be null)
    - emotion.type: the emotion category (e.g., High Energy Pleasant)

  The latest check-in has the same structure as the checkIn in feedback but represents the user's current emotional state. Tags (activityTag, placeTag, peopleTag) and description may be null.

  Available tools and their categories:
  ${JSON.stringify(
                    cards.map(({ title, category }) => ({ title, category })),
                    null,
                    2
                )}

  Your task is to:
  1. Analyze all feedbacks to find the highest-rated tool for:
     - The specific emotion in the latest check-in
     - The emotion type in the latest check-in
     - The activity tag in the latest check-in (if present)
     - The place tag in the latest check-in (if present)
     - The people tag in the latest check-in (if present)
  2. Provide tailored suggestions for the latest check-in, phrased conversationally:
     - For the emotion: "Whenever you felt [emotion] and used [tool], it worked out great for you. Try it again!"
     - For the emotion type: "Whenever you felt [emotion type] emotions and used [tool], you felt better. Try it now to feel better!"
     - For activity (if tag present): "Whenever you felt [emotion type] emotions doing [activity] and used [tool], you felt better. Try it now to feel better!"
     - For place (if tag present): "Whenever you felt [emotion type] emotions at [place] and used [tool], you felt better. Try it now to feel better!"
     - For people (if tag present): "Whenever you felt [emotion type] emotions with [people] and used [tool], you felt better. Try it now to feel better!"
  3. If no feedback exists for a specific context, recommend a tool from the same emotion type category as the latest check-in, using the same conversational phrasing.
  4. Omit suggestions for activity, place, or people if their respective tags are null in the latest check-in.

  Return a JSON object with the following structure, including only relevant suggestion objects based on available tags in the latest check-in:
  {
    "emotionSuggestion": {
      "context": "string", // e.g., "Whenever you felt Happy and used Anchoring Happy Emotions, it worked out great for you. Try it again!"
      "tool": "string", // e.g., "Anchoring Happy Emotions"
      "rating": number // highest rating or 0 if no feedback
    },
    "emotionTypeSuggestion": {
      "context": "string", // e.g., "Whenever you felt High Energy Pleasant emotions and used Anchoring Happy Emotions, you felt better. Try it now to feel better!"
      "tool": "string",
      "rating": number
    },
    ...(include only if the corresponding tag exists in latest check-in:)
    "activitySuggestion": {
      "context": "string", // e.g., "Whenever you felt High Energy Pleasant emotions doing cricket and used Anchoring Happy Emotions, you felt better. Try it now to feel better!"
      "tool": "string",
      "rating": number
    },
    "placeSuggestion": {
      "context": "string", // e.g., "Whenever you felt High Energy Pleasant emotions at school and used Anchoring Happy Emotions, you felt better. Try it now to feel better!"
      "tool": "string",
      "rating": number
    },
    "peopleSuggestion": {
      "context": "string", // e.g., "Whenever you felt High Energy Pleasant emotions with alone and used Anchoring Happy Emotions, you felt better. Try it now to feel better!"
      "tool": "string",
      "rating": number
    }
  }

  Feedbacks:
  ${JSON.stringify(
                    feedbacks.map(({ toolName, rating, checkIn }) => ({
                        toolName,
                        rating,
                        checkIn: checkIn || { emotion: { title: "", type: "" }, description: null, activityTag: null, placeTag: null, peopleTag: null },
                    })),
                    null,
                    2
                )}

  Latest Check-in:
  ${JSON.stringify(latestCheckIn, null, 2)}
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
                } catch (err: any) {
                    console.error("Error fetching insight:", err);
                    if (err.message?.includes("API_KEY_INVALID")) {
                        setError("Invalid API key. Please check your Gemini API key.");
                    } else {
                        setError("Failed to generate insight: " + err.message);
                    }
                } finally {
                    setLoading(false);
                }
            },
        [feedbacks, latestCheckIn]
    );

    return { insight, loading, error, getInsight };
}