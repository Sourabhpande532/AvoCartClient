import axios from "axios";
import { useState, useRef, useEffect } from "react";

const ChatBoat = () => {
  const [showModal, setShowModal] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { type: "ai", text: "Hello! 👋 I'm your AI shopping assistant. How can I help you today?" }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (showModal) {
      scrollToBottom();
    }
  }, [messages, showModal]);

  const handleChat = async () => {
    if (!chatInput.trim()) return;

    const userMessage = { type: "user", text: chatInput };
    setMessages((prev) => [...prev, userMessage]);
    setChatInput("");
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "https://avo-cart-server.vercel.app/api/ai/chat",
        { message: chatInput }
      );

      const aiMessage = {
        type: "ai",
        text: res.data.reply || "No response from AI",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setError("⚠️ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 🔘 Attractive Floating Button */}
      <button
        className='ai-chat-btn pulse-animation position-fixed bottom-0 end-0 m-4'
        onClick={() => setShowModal(true)}>
        <span className="ai-badge">AI</span>
        <span role="img" aria-label="bot">🤖</span>
      </button>

      {/* 🧠 MODAL / CHAT WINDOW */}
      {showModal && (
        <div
          className='modal fade show d-block'
          tabIndex='-1'
          style={{ background: "rgba(0,0,0,0.4)", backdropFilter: 'blur(4px)' }}>
          <div className='modal-dialog modal-dialog-centered modal-sm' style={{ maxWidth: '400px' }}>
            <div className='modal-content border-0 shadow-lg rounded-4 overflow-hidden'>
              {/* Header */}
              <div className='modal-header bg-primary text-white border-0 py-3'>
                <div className="d-flex align-items-center gap-2">
                  <div className="bg-white bg-opacity-25 rounded-circle p-1">🤖</div>
                  <div>
                    <h6 className='modal-title fw-bold mb-0'>AI Assistant</h6>
                    <small className="opacity-75">Online • Ready to help</small>
                  </div>
                </div>
                <button
                  className='btn-close btn-close-white'
                  onClick={() => setShowModal(false)}></button>
              </div>

              {/* Body */}
              <div
                className='modal-body bg-body-tertiary'
                style={{
                  height: "400px",
                  overflowY: "auto",
                  padding: "1.5rem",
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}>
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`d-flex ${msg.type === "user" ? "justify-content-end" : "justify-content-start"}`}>
                    <div
                      className={`p-3 rounded-4 shadow-sm ${
                        msg.type === "user" 
                          ? "bg-primary text-white rounded-bottom-end-0" 
                          : "bg-card text-body rounded-bottom-start-0 border"
                      }`}
                      style={{
                        maxWidth: "85%",
                        fontSize: '0.9rem',
                        lineHeight: "1.5",
                      }}>
                      {msg.text}
                    </div>
                  </div>
                ))}

                {/* ⏳ Typing Indicator */}
                {loading && (
                  <div className='d-flex justify-content-start'>
                    <div className='bg-body-secondary text-body p-2 rounded-4 border px-3'>
                      <div className='typing-dots'>
                        <span>•</span><span>•</span><span>•</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* ❌ Error */}
                {error && (
                  <div className='alert alert-danger py-2 small'>{error}</div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Footer */}
              <div className='modal-footer border-0 p-3 bg-body'>
                <div className="input-group shadow-sm">
                  <input
                    className='form-control border-0 bg-body-secondary text-body rounded-start-pill px-4'
                    placeholder='Type your message...'
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleChat()}
                  />
                  <button className='btn btn-primary rounded-end-pill px-4' onClick={handleChat}>
                    <span>🚀</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBoat;
