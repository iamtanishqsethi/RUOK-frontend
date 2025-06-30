import { useEffect, useRef, useState } from "react";
import { getGroqCBTReply } from "@/components/AiDash/GroqChatFunc";
import {useSelector} from "react-redux";
import {Bot} from "lucide-react";


const AiDashBoard = () => {
    const [messages, setMessages] = useState<{ from: 'user' | 'bot'; text: string }[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);
    const user = useSelector((state: any) => state.user);

    const handleSend = async () => {
        const userText = input.trim();
        if (!userText) return;

        setMessages((prev) => [...prev, { from: 'user', text: userText }]);
        setInput('');
        setLoading(true);

        try {
            const reply = await getGroqCBTReply(userText);
            setMessages((prev) => [...prev, { from: 'bot', text: reply }]);
        } catch (err) {
            console.error(err);
            setMessages((prev) => [...prev, { from: 'bot', text: 'Oops! Something went wrong.' }]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    return (
        <div
            className="w-[50%] flex flex-col justify-between  mx-auto p-4  rounded-xl shadow-md ">
            {/*<div className={'flex flex-col justify-between m-5 items-center'}>*/}
            {/*    <h1 className={'text-4xl italic'}>Your AI Buddy!</h1>*/}
            {/*</div>*/}
            <div className="h-full  overflow-y-auto px-3 py-2 space-y-4 scroll-smooth">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`flex items-start gap-3 ${
                            msg.from === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                    >
                        {msg.from === 'bot' && (
                            <div
                                className="w-8 h-8 rounded-full border-white border flex items-center justify-center text-blue-600 font-bold">
                                <Bot className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200"/>

                            </div>
                        )}
                        <div
                            className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                                msg.from === 'user'
                                    ? 'bg-blue-500 text-white rounded-br-sm'
                                    : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                            }`}
                        >
                            {msg.text}
                        </div>
                        {msg.from === 'user' && (
                            <div className="w-8 h-8 rounded-full flex  ">
                                <img src={user.photoUrl} className={'rounded-full'}/>
                            </div>
                        )}
                    </div>
                ))}

                {loading && (
                    <div className="flex items-center gap-2 text-sm text-gray-500 pl-2">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
                    </div>
                )}

                <div ref={bottomRef}></div>
            </div>

            <div className="relative mt-4">
                  <textarea
                      className="w-full min-h-[6em] border border-gray-300 px-4 py-2 pr-12 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden"
                      value={input}
                      onChange={(e) => {
                          setInput(e.target.value);
                          e.target.style.height = 'auto';
                          e.target.style.height = `${e.target.scrollHeight}px`;
                      }}
                      onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSend();
                          }
                      }}
                      placeholder="Talk to me, I'm here for you..."
                      disabled={loading}
                      rows={1}
                  />

                <button
                    onClick={handleSend}
                    className="absolute bottom-2 right-2 bg-gray-300 hover:bg-gray-400 cursor-pointer text-black rounded-full w-10 h-10 flex items-center justify-center disabled:opacity-50"
                    disabled={loading}
                    title="Send"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 12h14M12 5l7 7-7 7"
                        />
                    </svg>
                </button>
            </div>

        </div>
    );
};

export default AiDashBoard;
