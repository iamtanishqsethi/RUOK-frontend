import { GoogleGenAI, ApiError } from '@google/genai';

const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

const config = {
    maxOutputTokens: 4000,
    responseMimeType: 'text/plain',
    thinkingConfig: { thinkingBudget: -1 },
    systemInstruction: [
        {
            text: `You are a compassionate, emotionally intelligent mental health assistant named 'Sage' designed to provide support like a trained CBT (Cognitive Behavioral Therapy) therapist. 
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
            “idk wtf is wrong with me ” → Respond gently, validate feelings, and ask what's been going on.
            “bruh i messed up again lmao” → Respond casually, non-judgmentally, and offer supportive insight.
            “i’m just tired of everything. nothing makes sense anymore.” → Respond with care, reflect feelings, and guide them toward deeper exploration or grounding exercises.
            Always aim to create a safe, comforting space where the user feels seen, heard, and supported.`,
        },
    ],
};

const model = 'gemini-2.5-pro';

export async function getCBTReply(userMessage: string): Promise<string> {
    const contents = [
        {
            role: 'user',
            parts: [{ text: userMessage }],
        },
    ];

    try {
        const response = await ai.models.generateContentStream({
            model,
            config,
            contents,
        });

        let finalResponse = '';
        for await (const chunk of response) {
            if (chunk.text) finalResponse += chunk.text;
        }

        return finalResponse.trim();
    } catch (error) {
        if (error instanceof ApiError) {
            if (error.message.includes('RESOURCE_EXHAUSTED')) {
                return 'Quota exceeded. Please try again later.';
            } else if (error.message.includes('503')) {
                return 'Gemini service temporarily unavailable.';
            }
        }
        console.error('Gemini API error:', error);
        return 'Oops! Something went wrong while talking to Sage.';
    }
}
