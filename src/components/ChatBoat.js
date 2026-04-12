import axios from "axios";
import { useState } from "react";

const ChatBoat = () => {
  const [showModal, setShowModal] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
        {
          message: chatInput,
        },
      );

      const aiMessage = {
        type: "ai",
        text: res.data.reply || "No response from AI",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setError("⚠️ Something went wrong. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 🔘 Floating Button */}
      <button
        className='btn btn-dark position-fixed'
        style={{ bottom: "20px", right: "20px", borderRadius: "50%" }}
        onClick={() => setShowModal(true)}>
        💬
      </button>

      {/* 🧠 MODAL */}
      {showModal && (
        <div
          className='modal fade show d-block'
          tabIndex='-1'
          style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className='modal-dialog modal-dialog-centered'>
            <div className='modal-content'>
              {/* Header */}
              <div className='modal-header'>
                <h5 className='modal-title'>AI Assistant</h5>
                <button
                  className='btn-close'
                  onClick={() => setShowModal(false)}></button>
              </div>

              {/* Body */}
              <div
                className='modal-body'
                style={{
                  maxHeight: "400px",
                  overflowY: "auto",
                  padding: "10px",
                }}>
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`mb-2 ${
                      msg.type === "user" ? "text-end" : "text-start"
                    }`}>
                    <span
                      className={`p-2 rounded d-inline-block`}
                      style={{
                        maxWidth: "75%",
                        whiteSpace: "pre-wrap",
                        wordWrap: "break-word",
                        lineHeight: "1.5",
                      }}>
                      {msg.text.split("\n").map((line, i) => (
                        <p key={i} style={{ marginBottom: "6px" }}>
                          {line}
                        </p>
                      ))}
                    </span>
                  </div>
                ))}

                {/* ⏳ Typing Indicator */}
                {loading && (
                  <div className='text-start'>
                    <span className='bg-light p-2 rounded'>
                      <span className='typing-dots'>
                        <span>.</span>
                        <span>.</span>
                        <span>.</span>
                      </span>
                    </span>
                  </div>
                )}

                {/* ❌ Error */}
                {error && (
                  <div className='alert alert-danger mt-2'>{error}</div>
                )}
              </div>

              {/* Footer */}
              <div className='modal-footer'>
                <input
                  className='form-control'
                  placeholder='Ask something...'
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleChat()}
                />
                <button className='btn btn-dark' onClick={handleChat}>
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBoat;
