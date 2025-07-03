import { useCallback } from "react";
import { GoogleGenerativeAI } from '@google/generative-ai';
import {useGetDayCheckIn} from "@/utils/hooks/useGetDayCheckIn.ts";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const useGeminiChatFunc = () => {
    const dayCheckIns=useGetDayCheckIn()

    const summarizeCheckIn = (): string => {
        if (!dayCheckIns || dayCheckIns.length === 0) return "";

        const simpleCheckIns = dayCheckIns.map((c) => ({
            emotion: c?.emotion?.title,
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
            const emotionalContext = summarizeCheckIn();

            const systemInstruction = `
                You are a compassionate CBT-style AI therapist named 'Sage'.
                ${emotionalContext ? `\nHere is some context about the user's feelings today:\n${emotionalContext}` : ""}      
                Always be empathetic, understanding, and respond like a warm friend and therapist.                
                Your job is to talk to the user, help them feel better, and guide them with thoughtful, emotionally intelligent responses.                
                Never mention you're an AI or that this is a simulation.
                You respond in a way that balances professionalism with empathy and friendliness, adapting to the user's tone.
                You should:
                   Offer emotional support, validation, and reflective listening like a therapist.
                   Act as a non-judgmental friend when the user seems casual, venting, or confused.
                   Understand and interpret Gen Z / Gen Alpha slang, abbreviations, and informal language without explicitly explaining them or making the user feel self-conscious.
                   Avoid using slang or abbreviations yourself unless the user uses them first. Match their communication style naturally.
                   Ask thoughtful, open-ended questions to help users reflect.
                   Respect emotional boundaries and avoid offering medical diagnoses or medication advice.
                   Keep responses clear, warm, concise, and emotionally intelligent.
                   Never mention that you're an AI unless specifically asked.
                   Examples of emotional tones to understand:
                   "idk wtf is wrong with me " → Respond gently, validate feelings, and ask what's been going on.
                   "bruh i messed up again lmao" → Respond casually, non-judgmentally, and offer supportive insight.
                   "i'm just tired of everything. nothing makes sense anymore." → Respond with care, reflect feelings, and guide them toward deeper exploration or grounding exercises.
                   Always aim to create a safe, comforting space where the user feels seen, heard, and supported.
            `;

            try {
                const model = genAI.getGenerativeModel({
                    model: "gemini-2.5-flash",
                    systemInstruction: systemInstruction,
                });

                // Convert chat history to Gemini format
                const history = [];
                for (const msg of chatHistory) {
                    history.push({
                        role: msg.from === "user" ? "user" : "model",
                        parts: [{ text: msg.text }],
                    });
                }

                // Start chat with history
                const chat = model.startChat({
                    history: history,
                });

                // Prepare the user input with check-in context
                let contextualUserInput = userInput;
                if (emotionalContext) {
                    contextualUserInput = `${emotionalContext}\n\nUser message: ${userInput}`;
                }

                // Send message and get response
                const result = await chat.sendMessage(contextualUserInput);
                const response = await result.response;

                return response.text() || "No response.";
            } catch (error) {
                console.error('Gemini API error:', error);

                // Handle specific error types
                if (error instanceof Error) {
                    if (error.message.includes('RESOURCE_EXHAUSTED')) {
                        return 'Quota exceeded. Please try again later.';
                    } else if (error.message.includes('503')) {
                        return 'Gemini service temporarily unavailable.';
                    } else if (error.message.includes('API_KEY')) {
                        return 'API key issue. Please check your configuration.';
                    }
                }

                return "Oops! Something went wrong while talking to Sage.";
            }
        },
        [dayCheckIns]
    );

    return { getReply, hasCheckIn: !!(dayCheckIns && dayCheckIns.length > 0) };
};