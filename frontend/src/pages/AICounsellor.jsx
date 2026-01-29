import { useState, useRef, useEffect } from "react";
import { sendChatMessage } from "../api/modules";
import "../styles/chat.css";

const AICounsellor = () => {
    const [messages, setMessages] = useState([
        { sender: "ai", text: "Hello! I am your AI Counsellor. I can help you find universities, improve your profile, or guide you through the application process. How can I help you today?" }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const endRef = useRef(null);

    const scrollToBottom = () => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { sender: "user", text: input };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        try {
            const res = await sendChatMessage(userMsg.text);
            setMessages((prev) => [...prev, { sender: "ai", text: res.response }]);
        } catch (error) {
            setMessages((prev) => [...prev, { sender: "ai", text: "Sorry, I encountered an error. Please try again." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="chat-page">
            <div className="chat-container">
                <div className="chat-header">
                    <h2>AI Counsellor</h2>
                    <p>Your personal guide to study abroad success.</p>
                </div>

                <div className="messages-area">
                    {messages.map((msg, i) => (
                        <div key={i} className={`message ${msg.sender}`}>
                            <div className="bubble">{msg.text}</div>
                        </div>
                    ))}
                    {loading && <div className="message ai"><div className="bubble typing">...</div></div>}
                    <div ref={endRef} />
                </div>

                <form className="input-area" onSubmit={handleSend}>
                    <input
                        type="text"
                        placeholder="Ask me anything..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button type="submit" disabled={loading}>Send</button>
                </form>
            </div>
        </div>
    );
};

export default AICounsellor;
