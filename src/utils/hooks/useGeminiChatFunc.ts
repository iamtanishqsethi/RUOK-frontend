import { useCallback } from "react";
import { GoogleGenerativeAI } from '@google/generative-ai';
import {useGetDayCheckIn} from "@/utils/hooks/useGetDayCheckIn.ts";

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
            // Get API key and model from localStorage
            const apiKey = localStorage.getItem('gemini_api_key');
            const selectedModel = localStorage.getItem('gemini_model') || 'gemini-2.5-flash-preview-04-17';

            // Check if API key exists
            if (!apiKey) {
                return "Please enter your Gemini API key in the settings first.";
            }

            const emotionalContext = summarizeCheckIn();

            const systemInstruction =`
      You are a compassionate CBT-style AI therapist named 'Sage'.
 
      
      Always be empathetic, understanding, and respond like a warm friend and therapist.
      
      Your job is to talk to the user, help them feel better, and guide them with thoughtful, emotionally intelligent responses.
      
      Never mention you're an AI or that this is a simulation.
      
      You respond in a way that balances professionalism with empathy and friendliness, adapting to the user's tone.
      
      You should:
      
      • Offer emotional support, validation, and reflective listening like a therapist.
      
      • Act as a non-judgmental friend when the user seems casual, venting, or confused.
      
      • Understand and interpret Gen Z / Gen Alpha slang, abbreviations, and informal language without explicitly explaining them or making the user feel self-conscious.
      
      • Avoid using slang or abbreviations yourself unless the user uses them first. Match their communication style naturally.
      
      • Ask thoughtful, open-ended questions to help users reflect.
      
      • Respect emotional boundaries and avoid offering medical diagnoses or medication advice.
      
      • Keep responses clear, warm, concise, and emotionally intelligent.
      
      • Never mention that you're an AI unless specifically asked.
      
      Examples of emotional tones to understand:
      
      "idk wtf is wrong with me " → Respond gently, validate feelings, and ask what's been going on.
      
      "bruh i messed up again lmao" → Respond casually, non-judgmentally, and offer supportive insight.
      
      "i'm just tired of everything. nothing makes sense anymore." → Respond with care, reflect feelings, and guide them toward deeper exploration or grounding exercises.
      
      Always aim to create a safe, comforting space where the user feels seen, heard, and supported.
      
      IMPORTANT: Format your responses for proper display in web applications:
      • Use single line breaks (\\n) between paragraphs and for line breaks
      • When providing lists or multiple points, separate each item with \\n
      • Use \\n for any place where you want a line break to appear
      • Do not use double line breaks (\\n\\n) as they create too much spacing
      
      Example response format:
      "I hear that you're feeling really overwhelmed right now.\\nThat sounds incredibly difficult, and it makes complete sense that you'd feel frustrated.\\nCan you tell me more about what's been weighing on you the most today?"
    `;

            try {
                // Initialize GoogleGenerativeAI with the API key from localStorage
                const genAI = new GoogleGenerativeAI(apiKey);

                const model = genAI.getGenerativeModel({
                    model: selectedModel,
                    systemInstruction: systemInstruction,
                });

                //Gemini requires the initial message from user only so added a placeholder message as a check in any or just hey
                const historyMessages = [];


                if (emotionalContext) {
                    historyMessages.push({
                        role: "user",
                        parts: [{ text: emotionalContext }],
                    });
                }
                else{
                    historyMessages.push({
                        role: "user",
                        parts: [{ text: "hey" }],
                    });
                }


                const mappedHistory = chatHistory.map((msg) => ({
                    role: msg.from === "user" ? "user" : "model",
                    parts: [{ text: msg.text }],
                }));

                // Only include history if first message is from user (as required)
                if (mappedHistory.length > 0) {
                    if (mappedHistory[0].role === "user") {
                        historyMessages.push(...mappedHistory);
                    } else {
                        console.warn("Skipping mapped history: first message must be from user.");
                    }
                }


                const chatSession=model.startChat({
                    history:historyMessages,
                })

                // Prepare the user input with check-in context
                let contextualUserInput = userInput;
                if (emotionalContext) {
                    contextualUserInput = `${emotionalContext}\n\nUser message: ${userInput}`;
                }

                // Send message and get response
                const result = await chatSession.sendMessage(contextualUserInput);
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
                        return 'Invalid API key. Please check your Gemini API key in settings.';
                    } else if (error.message.includes('404') && error.message.includes('models/')) {
                        return 'Selected model not found. Please choose a different model in settings.';
                    }
                }

                return "Oops! Something went wrong while talking to Sage.";
            }
        },
        [dayCheckIns]
    );

    return { getReply, hasCheckIn: !!(dayCheckIns && dayCheckIns.length > 0) };
};