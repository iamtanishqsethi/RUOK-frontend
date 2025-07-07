import { useCallback } from "react";
import Groq from "groq-sdk";
import {useGetDayCheckIn} from "@/utils/hooks/useGetDayCheckIn.ts";

const groq = new Groq({
    apiKey: import.meta.env.VITE_GROQ_KEY,
    dangerouslyAllowBrowser: true,
});

export const useGroqChatFunc = () => {
    const dayCheckIns=useGetDayCheckIn()

    const summarizeCheckIn = (): string => {
        if (!dayCheckIns || dayCheckIns.length === 0) return "";

        const simpleCheckIns = dayCheckIns.map((c) => ({
            emotion: c?.emotion?.title ,
            description: c?.description || "",
            activityTag: c?.activityTag?.title || "",
            placeTag: c?.placeTag?.title || "",
            peopleTag: c?.peopleTag?.title || "",
        }));

        return `Here are the user's feelings and context from today:\n${JSON.stringify(simpleCheckIns, null, 2)}`;
    };

    type ChatMessage = {
        role: "user" | "system" | "assistant";
        content: string;
    };

    const getReply = useCallback(
        async (
            userInput: string,
            chatHistory: { from: "user" | "bot"; text: string }[]
        ): Promise<string> => {
            const emotionalContext = summarizeCheckIn();

            const prompt = `
      You are a compassionate CBT-style AI therapist named 'Sage'.
      ${emotionalContext ? `\n\nHere is some context about the user's feelings today:\n${emotionalContext}` : ""}
      
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
                const mappedHistory: ChatMessage[] = chatHistory.map((msg) => ({
                    role: msg.from === "user" ? "user" : "assistant",
                    content: msg.text,
                }));

                const formattedMessages: ChatMessage[] = [
                    { role: "system", content: prompt },
                    ...mappedHistory,
                    { role: "user", content: userInput },
                ];

                const completion = await groq.chat.completions.create({
                    model: "llama3-70b-8192",
                    messages: formattedMessages,
                });

                return completion.choices[0]?.message?.content?.trim() || "No response.";
            } catch (error) {
                console.error("Groq API Error:", error);
                return "Oops! Something went wrong while talking to Sage.";
            }
        },
        [dayCheckIns]
    );


    return { getReply, hasCheckIn: !!(dayCheckIns && dayCheckIns.length > 0) };
};
