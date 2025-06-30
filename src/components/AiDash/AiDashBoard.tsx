import { useEffect, useRef, useState } from "react";
import { Bot, Send } from "lucide-react";
import { getGroqCBTReply } from "@/components/AiDash/GroqChatFunc";
import {useSelector} from "react-redux";

const AiDashBoard = () => {
    const [messages, setMessages] = useState([
        { from: 'bot', text: 'Hello! I\'m your AI therapist. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef(null);

    const user = useSelector((state: any) => state.user);
    
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

    const adjustTextareaHeight = (e: any) => {
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
            className="flex flex-col h-screen w-full max-w-screen-md mx-auto px-2 transition-colors duration-300  font-inter">
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
                  rel="stylesheet"/>
            <div
                className="flex items-center justify-center py-4 px-4 border-b border-gray-200 dark:border-gray-700 backdrop-blur-sm sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center">
                        <Bot className="h-5 w-5 text-white dark:text-black"/>
                    </div>
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">AI Mental Health Support</h1>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-2 py-6 space-y-6">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`flex gap-4 ${msg.from === 'user' ? 'justify-end' : 'justify-start'}
                        animate-in slide-in-from-bottom-2 duration-500`}
                        style={{animationDelay: `${idx * 100}ms`}}
                    >
                        {msg.from === 'bot' && (
                            <div
                                className="w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center flex-shrink-0 mt-1">
                                <Bot className="h-4 w-4 text-white dark:text-black"/>
                            </div>
                        )}
                        <div
                            className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap
                            transform transition-all duration-300 hover:scale-[1.02] border shadow-sm ${
                                msg.from === 'user'
                                    ? 'bg-gray-900 text-white rounded-br-md'
                                    : 'bg-transparent text-black dark:text-white border-gray-300 dark:border-gray-600 rounded-bl-md'
                            }`}
                            style={{
                                textShadow: '0 1px 4px rgba(0,0,0,0.08)'
                            }}
                        >
                            {msg.text}
                        </div>
                        {msg.from === 'user' && (
                            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mt-1">
                                <img src={user.photoUrl} alt="User Avatar" className="w-full h-full object-cover"/>
                            </div>
                        )}
                    </div>
                ))}

                {isTyping && (
                    <div className="flex gap-4 justify-start animate-in slide-in-from-bottom-2 duration-300">
                        <div
                            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <Bot className="h-4 w-4 text-white dark:text-black"/>
                        </div>
                        <div
                            className="px-4 py-3 rounded-2xl rounded-bl-md border border-gray-300 dark:border-gray-600">
                            <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                     style={{animationDelay: '0s'}}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                     style={{animationDelay: '0.1s'}}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                     style={{animationDelay: '0.2s'}}></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={bottomRef}></div>
            </div>

            <div className=" border-gray-200 dark:border-gray-700  ">
                <div className="w-full">
                    <div
                        className="relative flex items-end gap-3 rounded-2xl border border-gray-300 dark:border-gray-600 shadow-sm hover:shadow-md transition-shadow duration-200 focus-within:ring-2 focus-within:ring-black/20 dark:focus-within:ring-white/20 focus-within:border-transparent">
                        <textarea
                            ref={textareaRef}
                            className="flex-1 min-h-[5em] max-h-[10em] px-4 py-3 bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 resize-none border-none outline-none"
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
                            placeholder="Message AI Assistant..."
                            disabled={loading}
                            rows={1}
                        />
                        <button
                            onClick={handleSend}
                            disabled={loading || !input.trim()}
                            className={`m-2 p-2 rounded-lg transition-all duration-200 flex items-center justify-center
                                ${loading || !input.trim()
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'hover:bg-gray-800 dark:hover:bg-gray-200 hover:scale-105 active:scale-95 shadow-sm'
                            }`}
                        >
                            {loading ? (
                                <div
                                    className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <Send className="h-4 w-4"/>
                            )}
                        </button>
                    </div>

                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                        AI can make mistakes. Consider checking important information.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AiDashBoard;
