import { type ChangeEvent, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Sparkles, Send, CheckCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import type { User } from "@/utils/types";
import { RainbowButton } from "@/components/magicui/rainbow-button.tsx";
import useFetchCheckIn from "@/utils/hooks/useFetchCheckIn.ts";
import { useGeminiChatFunc } from "@/utils/hooks/useGeminiChatFunc.ts";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button.tsx";
import BgAnimation from "@/components/AiDash/BgAnimation.tsx";

const AiDashBoard = () => {
    const getAllCheckin = useFetchCheckIn();

    useEffect(() => {
        getAllCheckin();
    }, []);

    const [messages, setMessages] = useState<{ from: "user" | "bot"; text: string }[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const navigate = useNavigate();

    const user = useSelector((state: { user: User | null }) => state.user);
    const [isGuest, setIsGuest] = useState(false);

    const { getReply, hasCheckIn } = useGeminiChatFunc();

    useEffect(() => {
        if (user?.isGuest) {
            setIsGuest(true);
            setMessages([
                {
                    from: "bot",
                    text: "Hey there! I'm Sage, your AI wellness companion. Log in / Create account to see what I can do for you",
                },
            ]);
            return;
        }

        const initiateChat = async () => {
            if (!hasCheckIn) {
                setMessages([
                    {
                        from: "bot",
                        text: "Hey there! Before we start, could you do a quick emotional check-in so I can understand you better?",
                    },
                ]);
            } else {
                setIsTyping(true);
                const firstMsg = await getReply("Start the conversation based on my last emotional check-in.", messages);
                setMessages([{ from: "bot", text: firstMsg }]);
                setIsTyping(false);
            }
        };

        initiateChat();
    }, [isGuest, hasCheckIn]);

    const handleSend = async () => {
        const userText = input.trim();
        if (!userText) return;

        setMessages((prev) => [...prev, { from: "user", text: userText }]);
        setInput("");
        setLoading(true);
        setIsTyping(true);

        try {
            const reply = await getReply(userText, messages);
            setMessages((prev) => [...prev, { from: "bot", text: reply }]);
        } catch {
            setMessages((prev) => [...prev, { from: "bot", text: "Oops! Something went wrong." }]);
        } finally {
            setLoading(false);
            setIsTyping(false);
        }
    };

    const adjustTextareaHeight = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = e.target;
        textarea.style.height = "auto";
        textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    return (
        <div className="flex flex-col h-screen w-full max-w-screen-md mx-auto px-2 transition-colors duration-300 font-secondary relative">
            {/* Background Animation */}
            <BgAnimation />

            {/* Header */}
            <div className="flex items-center justify-center py-4 px-4 border-b border-zinc-200 dark:border-zinc-700 backdrop-blur-sm sticky top-0 z-10">
                <div className="flex flex-col justify-center items-center">
                    <div className="flex items-center justify-between text-lg md:text-xl text-zinc-900 dark:text-zinc-100 gap-4">
                        <Sparkles className="h-6 w-6" />
                        <span className="font-mynabali-serif text-2xl md:text-3xl font-semibold tracking-wider">Sage</span>
                    </div>
                    <span className="text-sm text-muted-foreground dark:text-muted-foreground">Your Wellness Companion</span>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto px-2 py-6 space-y-6 relative z-10">
                {messages.map((msg, idx) => {
                    const isFirstBotMessage = msg.from === "bot" && idx === 0;

                    return (
                        <div
                            key={idx}
                            className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2 duration-500 my-3.5`}
                            style={{animationDelay: `${idx * 100}ms`}}
                        >
                            <div
                                key={idx}
                                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2 duration-500 my-3.5`}
                                style={{animationDelay: `${idx * 100}ms`}}
                            >
                                <div className={`flex ${msg.from === "user" ? "flex-row-reverse" : ""} items-end`}>
                                    {msg.from === "bot" ? (
                                        <div
                                            className="w-8 h-8 rounded-full bg-black/80 dark:bg-white/80 backdrop-blur-md flex items-center justify-center flex-shrink-0 m-2 shadow-md">
                                            <Sparkles className="h-5 w-5 text-white dark:text-black"/>
                                        </div>
                                    ) : (
                                        <Avatar className="h-8 w-8 border mx-2 shadow-md">
                                            <AvatarImage src={user?.photoUrl} alt="@shadcn"/>
                                            <AvatarFallback>{user?.firstName}</AvatarFallback>
                                        </Avatar>
                                    )}

                                    <div className="flex flex-col">
                                        <div
                                            className={`max-w-xs px-4 py-2.5 rounded-2xl text-sm ${msg.from === "user"
                                                ? "bg-white/10 text-zinc-100 backdrop-blur-xl border border-white/20 rounded-br-none shadow-sm"
                                                : "bg-blue-500/10 text-blue-100 backdrop-blur-xl border border-blue-300/20 rounded-bl-none shadow-sm"
                                            }`}
                                        >
                                            <p
                                                dangerouslySetInnerHTML={{
                                                    __html: msg.text.replace(/\\n/g, "<br />"),
                                                }}
                                            />
                                        </div>

                                        {isFirstBotMessage && !hasCheckIn && !isGuest && (
                                            <div className="mt-2">
                                                <RainbowButton
                                                    onClick={() => navigate("/main/checkin")}
                                                    className="rounded-full text-white font-secondary hover:scale-105 transition-transform ease-in-out duration-150"
                                                >
                                                    <CheckCircle/>
                                                    <span>Check In</span>
                                                </RainbowButton>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                        </div>
                    );
                })}

                {isTyping && (
                    <div className="flex justify-start animate-in slide-in-from-bottom-2 duration-500 my-2">
                        <div
                            className="w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center flex-shrink-0 m-2">
                            <Sparkles className="h-5 w-5 text-white dark:text-black"/>
                        </div>
                        <div className="max-w-xs px-4 py-2.5 rounded-2xl text-white bg-blue-500/10 text-blue-100 backdrop-blur-xl border border-blue-300/20 rounded-bl-none shadow-sm">
                            <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"
                                     style={{animationDelay: "0s"}}></div>
                                <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"
                                     style={{animationDelay: "0.1s"}}></div>
                                <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"
                                     style={{animationDelay: "0.2s"}}></div>
                            </div>
                        </div>
                    </div>
                )}

                {isGuest && (
                    <div className="flex justify-center mt-2">
                        <InteractiveHoverButton
                            onClick={() => navigate("/login")}
                            className="text-sm sm:text-base my-2 font-secondary font-medium border-2 border-zinc-600 dark:border-zinc-800"
                        >
                            Login to begin
                        </InteractiveHoverButton>
                    </div>
                )}

                <div ref={bottomRef}></div>
            </div>

            {/* Input Area */}
            <div className="border-zinc-200 dark:border-zinc-700 relative z-10">
                <div className="w-full">
                    {!isGuest ? (
                        <div
                            className="relative flex items-end gap-3 rounded-2xl border border-zinc-300 dark:border-zinc-600 shadow-sm hover:shadow-md transition-shadow duration-200 focus-within:ring-2 focus-within:ring-black/20 dark:focus-within:ring-white/20 focus-within:border-transparent">
                            <textarea
                                ref={textareaRef}
                                className="flex-1 min-h-[5em] max-h-[10em] px-4 py-3 bg-transparent text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 resize-none border-none outline-none"
                                value={input}
                                onChange={(e) => {
                                    setInput(e.target.value);
                                    adjustTextareaHeight(e);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSend();
                                    }
                                }}
                                placeholder="Message Sage..."
                                disabled={loading}
                                rows={1}
                            />
                            <button
                                onClick={handleSend}
                                disabled={loading || !input.trim()}
                                className={`m-2 p-2.5 rounded-full transition-all duration-200 flex items-center justify-center text-white bg-blue-500/30 text-blue-100 backdrop-blur-xl border border-blue-300/20 shadow-sm
                                    ${loading || !input.trim() ? "cursor-not-allowed" : "hover:scale-105 active:scale-95 shadow-sm"}`}
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <Send className="h-5 w-5 " />
                                )}
                            </button>
                        </div>
                    ) : (
                        <div className="text-sm px-6 sm:text-base bg-zinc-300/40 dark:bg-zinc-800/40 backdrop-blur-2xl rounded-2xl w-full min-h-[5rem] flex items-center justify-center text-center">
                            This feature is currently unavailable for guests. Please login to continue.
                        </div>
                    )}
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 my-4 text-center">
                        For professional mental health support, please consult a qualified healthcare provider.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AiDashBoard;