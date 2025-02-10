import { useState } from "react";

const Chatbot = () => {
    const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
        if (!input.trim()) return;
        const userMessage = input;
        setInput("");
        
        setMessages([...messages, { user: userMessage, bot: "..." }]);

        const response = await fetch("http://localhost:5000/api/chatbot", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: userMessage })
        });

        const botReply = await response.text();
        setMessages([...messages, { user: userMessage, bot: botReply }]);
    };

    return (
        <div className="chat-container">
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index}>
                        <p><strong>Korisnik:</strong> {msg.user}</p>
                        <p><strong>Bot:</strong> {msg.bot}</p>
                    </div>
                ))}
            </div>
            <input value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={sendMessage}>Pošalji</button>
        </div>
    );
};

export default Chatbot;
