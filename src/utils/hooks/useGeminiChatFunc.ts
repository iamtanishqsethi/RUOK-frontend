import { useCallback } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useGetDayCheckIn } from "@/utils/hooks/useGetDayCheckIn.ts";
import { useSelector } from "react-redux";
import { cards } from "../../components/Tools/Cards.tsx";
import type { Feedback } from "@/utils/types.ts";

export const useGeminiChatFunc = () => {
    const dayCheckIns = useGetDayCheckIn();
    const feedbacks = useSelector((state: { feedback: Feedback[] | null }) => state.feedback || []);

    const summarizeCheckIn = (): string => {
        if (!dayCheckIns || dayCheckIns.length === 0) return "";

        const simpleCheckIns = dayCheckIns.map((c) => ({
            emotion: c?.emotion?.title || "",
            emotionType: c?.emotion?.type || "",
            description: c?.description || "",
            activityTag: c?.activityTag?.title || "",
            placeTag: c?.placeTag?.title || "",
            peopleTag: c?.peopleTag?.title || "",
        }));

        return `Here are the user's feelings and context from today:\n${JSON.stringify(simpleCheckIns, null, 2)}`;
    };

    const getReply = useCallback(
        async (
            userInput: string,
            chatHistory: { from: "user" | "bot"; text: string }[]
        ): Promise<string> => {
            const apiKey = localStorage.getItem("gemini_api_key");
            const selectedModel = localStorage.getItem("gemini_model") || "gemini-2.5-flash-preview-04-17";

            if (!apiKey) {
                return "Please enter your Gemini API key in the settings first.";
            }

            const emotionalContext = summarizeCheckIn();

            const systemInstruction = `
        You are a compassionate CBT-style AI therapist named 'Sage'.

        Always be empathetic, understanding, and respond like a warm friend and therapist.
        Never mention you're an AI or that this is a simulation.
        Respond in a way that balances professionalism with empathy and friendliness, adapting to the user's tone.
        You should:
        • Offer emotional support, validation, and reflective listening like a therapist.
        • Act as a non-judgmental friend when the user seems casual, venting, or confused.
        • Understand and interpret Gen Z / Gen Alpha slang, abbreviations, and informal language without explaining them or making the user feel self-conscious.
        • Avoid using slang or abbreviations unless the user uses them first. Match their communication style naturally.
        • Ask thoughtful, open-ended questions to help users reflect.
        • Respect emotional boundaries and avoid offering medical diagnoses or medication advice.
        • Keep responses clear, warm, concise, and emotionally intelligent.
        • Suggest specific tools from the provided list when relevant, based on the user's current emotional state and past feedback, using conversational phrasing.
        • Never mention that you're an AI unless specifically asked.

        Examples of emotional tones to understand:
        "idk wtf is wrong with me" → Respond gently, validate feelings, and ask what's been going on.
        "bruh i messed up again lmao" → Respond casually, non-judgmentally, and offer supportive insight.
        "i'm just tired of everything. nothing makes sense anymore." → Respond with care, reflect feelings, and guide toward deeper exploration or grounding exercises.

        Available tools and their categories:
        ${JSON.stringify(cards.map(({ title, category }) => ({ title, category })), null, 2)}

        Feedback history:
        ${JSON.stringify(
                feedbacks.map(({ toolName, rating, checkIn }) => ({
                    toolName,
                    rating,
                    checkIn: {
                        emotion: checkIn?.emotion?.title || "",
                        emotionType: checkIn?.emotion?.type || "",
                        description: checkIn?.description || null,
                        activityTag: checkIn?.activityTag?.title || null,
                        placeTag: checkIn?.placeTag?.title || null,
                        peopleTag: checkIn?.peopleTag?.title || null,
                    },
                })),
                null,
                2
            )}

        Your task is to:
        1. Respond to the user's input with empathy, validating their feelings and offering support.
        2. Analyze the feedback history to find the highest-rated tool for:
           - The specific emotion in the latest check-in (if available).
           - The emotion type in the latest check-in (if available).
           - The activity tag in the latest check-in (if present).
           - The place tag in the latest check-in (if present).
           - The people tag in the latest check-in (if present).
        3. Provide tailored tool suggestions for the latest check-in, phrased conversationally:
           - For the emotion: "Whenever you felt [emotion] and used [tool], it worked out great for you. Try it again!"
           - For the emotion type: "Whenever you felt [emotion type] emotions and used [tool], you felt better. Try it now to feel better!"
           - For activity (if tag present): "Whenever you felt [emotion type] emotions doing [activity] and used [tool], you felt better. Try it now to feel better!"
           - For place (if tag present): "Whenever you felt [emotion type] emotions at [place] and used [tool], you felt better. Try it now to feel better!"
           - For people (if tag present): "Whenever you felt [emotion type] emotions with [people] and used [tool], you felt better. Try it now to feel better!"
        4. If no feedback exists for a specific context, recommend a tool from the same emotion type category as the latest check-in, using the same phrasing.
        5. Omit suggestions for activity, place, or people if their tags are null in the latest check-in.
        6. Integrate suggestions naturally into the response, only when relevant to the user's input.

        Format your responses for proper display in web applications:
        • Use single line breaks (\\n) between paragraphs and for line breaks.
        • When providing lists or multiple points, separate each item with \\n.
        • Use \\n for any place where you want a line break to appear.
        • Do not use double line breaks (\\n\\n) as they create too much spacing.

        Example response format:
        I hear that you're feeling really overwhelmed right now.\\nThat sounds incredibly tough, and it's okay to feel this way sometimes.\\nWhenever you felt Sad and used Journaling, it worked out great for you. Try it again!\\nCan you share a bit more about what's been going on?

        Current emotional context:
        ${emotionalContext}
      `;

            try {
                const genAI = new GoogleGenerativeAI(apiKey);
                const model = genAI.getGenerativeModel({
                    model: selectedModel,
                    systemInstruction,
                });

                const historyMessages = [];

                if (emotionalContext) {
                    historyMessages.push({
                        role: "user",
                        parts: [{ text: emotionalContext }],
                    });
                } else {
                    historyMessages.push({
                        role: "user",
                        parts: [{ text: "hey" }],
                    });
                }

                const mappedHistory = chatHistory.map((msg) => ({
                    role: msg.from === "user" ? "user" : "model",
                    parts: [{ text: msg.text }],
                }));

                if (mappedHistory.length > 0 && mappedHistory[0].role === "user") {
                    historyMessages.push(...mappedHistory);
                } else if (mappedHistory.length > 0) {
                    console.warn("Skipping mapped history: first message must be from user.");
                }

                const chatSession = model.startChat({
                    history: historyMessages,
                });

                const contextualUserInput = emotionalContext
                    ? `${emotionalContext}\nUser message: ${userInput}`
                    : userInput;

                const result = await chatSession.sendMessage(contextualUserInput);
                const response = await result.response;

                return response.text() || "No response.";
            } catch (error) {
                console.error("Gemini API error:", error);
                if (error instanceof Error) {
                    if (error.message.includes("RESOURCE_EXHAUSTED")) {
                        return "Quota exceeded. Please try again later.";
                    } else if (error.message.includes("503")) {
                        return "Gemini service temporarily unavailable.";
                    } else if (error.message.includes("API_KEY")) {
                        return "Invalid API key. Please check your Gemini API key in settings.";
                    } else if (error.message.includes("404") && error.message.includes("models/")) {
                        return "Selected model not found. Please choose a different model in settings.";
                    }
                }
                return "Oops! Something went wrong while talking to Sage.";
            }
        },
        [dayCheckIns, feedbacks]
    );

    return { getReply, hasCheckIn: !!(dayCheckIns && dayCheckIns.length > 0) };
};