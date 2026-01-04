import React, { useState, useRef, useEffect } from 'react';
import styles from './Chat.module.css';

const SESSION_ID = "customer-001";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          session_id: SESSION_ID
        })
      });

      const data = await res.json();
      const botMsg = { role: "bot", content: data.reply };

      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { role: "bot", content: "Server error. Please try again." }
      ]);
    }
  };

  return (
    <div className={styles.chatContainer}>
      <h2 className={styles.chatHeader}>Customer Support Chat</h2>

      <div className={styles.chatHistory}>
        {messages.map((m, i) => (
          <div key={i} className={`${styles.message} ${m.role === "user" ? styles.user : styles.bot}`}>
            {m.content}
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>

      <div className={styles.inputContainer}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={e => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
