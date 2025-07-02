import {type ChangeEvent, useEffect, useRef, useState} from "react";
import { Send, Sparkles} from "lucide-react";
import { getGroqCBTReply } from "@/components/AiDash/GroqChatFunc";
import {useSelector} from "react-redux";
import type {User} from "@/utils/types.ts";
import {Avatar, AvatarFallback, AvatarImage} from "../ui/avatar";

const AiDashBoard = () => {
    const [messages, setMessages] = useState<{ from: 'user' | 'bot'; text: string }[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef(null);
    const [isGuest,setIsGuest] = useState<boolean>(false);

    const user=useSelector((store:{user:null|User})=>store.user)
    useEffect(() => {
        if(user?.isGuest){
            setIsGuest(true)
        }
    }, []);
    
    const handleSend = async () => {
        const userText = input.trim();
        if (!userText) return;

        setMessages((prev) => [...prev, { from: 'user', text: userText }]);
        setInput('');
        setLoading(true);
        setIsTyping(true);

        try {
            const reply = await getGroqCBTReply(userText);
            setMessages((prev) => [...prev, { from: 'bot', text: reply }]);
        } catch (err) {
            console.error(err);
            setMessages((prev) => [...prev, { from: 'bot', text: 'Oops! Something went wrong.' }]);
        } finally {
            setLoading(false);
            setIsTyping(false);
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            setMessages([{ from: 'bot', text: 'Hello! I\'m Sage , your AI therapist. How can I help you today?' }]);
        }, 300);
        return () => clearTimeout(timeout);
    }, []);
    const adjustTextareaHeight = (e:ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = e.target;
        textarea.style.height = 'auto';
        const newHeight = Math.min(textarea.scrollHeight, 200);
        textarea.style.height = `${newHeight}px`;
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    return (
        <div
            className="flex flex-col h-screen w-full max-w-screen-md mx-auto px-2 transition-colors duration-300 font-secondary ">
            <div
                className="flex items-center justify-center py-4 px-4 border-b border-zinc-200 dark:border-zinc-700 backdrop-blur-sm sticky top-0 z-10">
                <div className="flex items-center">

                    <div className=" flex items-center justify-between text-lg md:text-xl  text-zinc-900 dark:text-zinc-100 gap-4">
                        <Sparkles className="h-6 w-6"/>
                        <span className={'font-mynabali-serif text-2xl md:text-3xl font-semibold tracking-wider'}>Sage</span> Your Wellness Companion
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-2 py-6 space-y-6">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`flex  ${msg.from === 'user' ? 'justify-end' : 'justify-start'}
                        animate-in slide-in-from-bottom-2 duration-500 my-3.5`}
                        style={{animationDelay: `${idx * 100}ms`}}
                    >
                        <div className={`flex ${msg.from === 'user' ? 'flex-row-reverse ' : ''} items-end`}>
                            {msg.from==='bot' ? (
                                <div
                                    className="w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center flex-shrink-0 m-2">
                                    <Sparkles  className="h-5 w-5 text-white dark:text-black"/>
                                </div>
                            ):(
                                <Avatar className={"h-8 w-8 border mx-2"}>
                                    <AvatarImage src={user?.photoUrl} alt="@shadcn" />
                                    <AvatarFallback>{user?.firstName}</AvatarFallback>
                                </Avatar>
                            )}

                            <div
                                className={`max-w-xs px-4 py-2.5 rounded-2xl text-white ${
                                    msg.from !== 'user' ? 'bg-[#273adf] rounded-bl-none ' : 'bg-zinc-700 rounded-br-none'
                                }`}
                            >
                                <p className={'text-sm'}>
                                    {msg.text}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex  justify-start animate-in slide-in-from-bottom-2 duration-500 my-2">
                        <div
                            className="w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center flex-shrink-0 m-2">
                            <Sparkles  className="h-5 w-5 text-white dark:text-black"/>
                        </div>
                        <div
                            className="max-w-xs px-4 py-2.5 rounded-2xl text-white bg-[#273adf] rounded-bl-none">
                            <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"
                                     style={{animationDelay: '0s'}}></div>
                                <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"
                                     style={{animationDelay: '0.1s'}}></div>
                                <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"
                                     style={{animationDelay: '0.2s'}}></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={bottomRef}></div>
            </div>

            <div className=" border-zinc-200 dark:border-zinc-700  ">
                <div className="w-full">
                    {!isGuest? (<div
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
                                if (e.key === 'Enter' && !e.shiftKey) {
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
                            className={`m-2 p-2.5 rounded-full transition-all duration-200 flex items-center justify-center text-white bg-[#273adf]
                                ${loading || !input.trim()
                                ? ' cursor-not-allowed'
                                : ' hover:scale-105 active:scale-95 shadow-sm'
                            }`}
                        >
                            {loading ? (
                                <div
                                    className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <Send className="h-5 w-5"/>
                            )}
                        </button>
                    </div>):(
                        <div className={'bg-zinc-300/40 dark:bg-zinc-800/40 backdrop-blur-2xl rounded-2xl  w-full min-h-[5rem] flex items-center justify-center '}>
                             Create an Account to access this feature
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
