import { useState, useRef, useEffect } from "react";
import API from "../api/api";

const renderFormattedMessage = (text) => {
  if (!text) return null;

  const lines = text.split("\n");
  return lines.map((line, lineIdx) => {
    const trimmed = line.trim();
    if (!trimmed) return <div key={lineIdx} style={{ height: "0.4rem" }} />;

    const isBullet = trimmed.startsWith("- ") || trimmed.startsWith("* ");
    const isNumber = /^\d+\.\s/.test(trimmed);
    const content = isBullet
      ? trimmed.substring(2)
      : isNumber
        ? trimmed.replace(/^\d+\.\s/, "")
        : line;

    // Parse **bold** text blocks
    const parts = content.split(/(\*\*.*?\*\*)/g);
    const parsedElements = parts.map((part, partIdx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={partIdx} className='fw-bold'>
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });

    if (isBullet) {
      return (
        <div key={lineIdx} className='d-flex align-items-start gap-2 my-1 ps-1'>
          <span
            className='text-primary fw-bold'
            style={{ fontSize: "0.9rem", lineHeight: "1.4" }}>
            •
          </span>
          <div>{parsedElements}</div>
        </div>
      );
    }

    if (isNumber) {
      const match = trimmed.match(/^(\d+\.)/);
      const numStr = match ? match[1] : "";
      return (
        <div key={lineIdx} className='d-flex align-items-start gap-2 my-1 ps-1'>
          <span
            className='text-primary fw-bold'
            style={{ fontSize: "0.85rem", lineHeight: "1.4" }}>
            {numStr}
          </span>
          <div>{parsedElements}</div>
        </div>
      );
    }

    return (
      <div key={lineIdx} className='my-1'>
        {parsedElements}
      </div>
    );
  });
};

const ChatBoat = () => {
  const [showModal, setShowModal] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    {
      type: "ai",
      text: "Hello! 👋 I'm your AI shopping assistant. How can I help you today?",
    },
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
      const res = await API.post("/ai/chat", { message: chatInput });

      const aiMessage = {
        type: "ai",
        text: res.data.reply || "No response from AI",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setError(
        "⚠️ Unable to generate response right now. Please try again shortly.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 🔘 Sleek Assistant Floating Button */}
      <button
        className='ai-chat-btn pulse-animation position-fixed bottom-0 end-0 m-4'
        onClick={() => setShowModal(true)}
        title='AI Assistant'>
        <span className='ai-badge'>AI</span>
        <span>✨</span>
      </button>

      {/* 🧠 MODAL / CHAT WINDOW */}
      {showModal && (
        <div
          className='modal fade show d-block'
          tabIndex='-1'
          style={{
            background: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(6px)",
          }}>
          <div
            className='modal-dialog modal-dialog-centered modal-sm'
            style={{ maxWidth: "420px" }}>
            <div className='modal-content border-0 shadow-lg rounded-4 overflow-hidden'>
              {/* Header */}
              <div className='modal-header bg-body-tertiary border-0 py-3'>
                <div className='d-flex align-items-center gap-2'>
                  {/* Emoji Wrapper */}
                  <div
                    className='bg-primary text-white rounded-circle p-2 d-flex align-items-center justify-content-center'
                    style={{
                      width: "32px",
                      height: "32px",
                      fontSize: "0.85rem",
                    }}>
                    ✨
                  </div>

                  {/* Text Context */}
                  <div>
                    <h6 className='modal-title fw-bold mb-0 text-body'>
                      AI Assistant
                    </h6>
                    <small
                      className='text-body-secondary'
                      style={{ fontSize: "0.75rem" }}>
                      Online • Direct Support
                    </small>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  className='btn-close text-reset'
                  onClick={() => setShowModal(false)}></button>
              </div>

              {/* Body */}
              <div
                className='modal-body bg-body-tertiary'
                style={{
                  height: "390px",
                  overflowY: "auto",
                  padding: "1.25rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.875rem",
                }}>
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`d-flex ${msg.type === "user" ? "justify-content-end" : "justify-content-start"}`}>
                    <div
                      className={`p-3 rounded-4 ${
                        msg.type === "user"
                          ? "bg-primary text-white rounded-bottom-end-0 shadow-sm"
                          : "bg-body text-body rounded-bottom-start-0 border shadow-sm"
                      }`}
                      style={{
                        maxWidth: "88%",
                        fontSize: "0.875rem",
                        lineHeight: "1.5",
                      }}>
                      {renderFormattedMessage(msg.text)}
                    </div>
                  </div>
                ))}

                {/* ⏳ Typing Indicator */}
                {loading && (
                  <div className='d-flex justify-content-start'>
                    <div className='bg-body text-body p-2 rounded-4 border px-3 shadow-sm'>
                      <div className='typing-dots'>
                        <span>•</span>
                        <span>•</span>
                        <span>•</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* ❌ Error */}
                {error && (
                  <div className='alert alert-danger py-2 small mb-0'>
                    {error}
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Footer */}
              <div className='modal-footer border-0 p-3 bg-body'>
                <div className='input-group shadow-sm'>
                  <input
                    className='form-control border-0 bg-body-secondary text-body rounded-start-pill px-3'
                    placeholder='Ask a question...'
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleChat()}
                  />
                  <button
                    className='btn btn-primary rounded-end-pill px-3'
                    onClick={handleChat}>
                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'>
                      <line x1='22' y1='2' x2='11' y2='13'></line>
                      <polygon points='22 2 15 22 11 13 2 9 22 2'></polygon>
                    </svg>
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
