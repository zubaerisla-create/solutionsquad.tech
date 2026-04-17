"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2, Calendar, Sparkles } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content: "👋 Hi! I'm **Alex**, your Solution Squad AI assistant.\n\nI can answer any questions about our services, team, or portfolio — and I can even **book a free consultation call** directly in this chat!\n\nHow can I help you today?",
  timestamp: new Date(),
};

function formatMessage(text: string) {
  // Convert markdown-like bold text and newlines to HTML-like elements
  const parts = text.split(/(\*\*[^*]+\*\*|\n)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
    }
    if (part === "\n") {
      return <br key={i} />;
    }
    return <span key={i}>{part}</span>;
  });
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2.5 mb-4">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#63ffb4] to-[#38c9ff] flex items-center justify-center flex-shrink-0">
        <Bot className="w-3.5 h-3.5 text-[#020408]" />
      </div>
      <div className="bg-white/[0.07] border border-white/[0.08] rounded-2xl rounded-bl-sm px-4 py-3">
        <div className="flex gap-1 items-center h-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[#63ffb4]/70"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Typewriter({ text, speed = 15, onType, onComplete }: { text: string; speed?: number; onType?: () => void; onComplete?: () => void }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        onType?.(); // Trigger scroll on every character typed
        i++;
      } else {
        clearInterval(interval);
        setIsComplete(true);
        onComplete?.();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, onType]);

  return (
    <>
      {formatMessage(displayedText)}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
          className="inline-block w-1.5 h-4 ml-1 bg-[#63ffb4] align-middle"
        />
      )}
    </>
  );
}

function MessageBubble({ message, onType }: { message: Message; onType?: () => void }) {
  const isUser = message.role === "user";
  const isWelcome = message.id === "welcome";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-end gap-2.5 mb-4 ${isUser ? "flex-row-reverse" : ""}`}
    >
      {/* Avatar */}
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${isUser
          ? "bg-gradient-to-br from-violet-500 to-purple-600"
          : "bg-gradient-to-br from-[#63ffb4] to-[#38c9ff]"
          }`}
      >
        {isUser ? (
          <User className="w-3.5 h-3.5 text-white" />
        ) : (
          <Bot className="w-3.5 h-3.5 text-[#020408]" />
        )}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${isUser
          ? "bg-gradient-to-br from-[#63ffb4]/20 to-[#38c9ff]/20 border border-[#63ffb4]/25 text-white/90 rounded-br-sm"
          : "bg-white/[0.06] border border-white/[0.08] text-white/75 rounded-bl-sm"
          }`}
      >
        {!isUser && !isWelcome ? (
          <Typewriter text={message.content} onType={onType} />
        ) : (
          formatMessage(message.content)
        )}
      </div>
    </motion.div>
  );
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(true);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Use useCallback to maintain a stable function reference, preventing 
  // secondary typing animations on old messages when the parent re-renders.
  const scrollToBottom = useCallback(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
      setHasNewMessage(false);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // Build conversation history for the API (excluding the welcome message)
      const history = [...messages, userMsg]
        .filter((m) => m.id !== "welcome")
        .map((m) => ({ role: m.role, content: m.content }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      const data = await response.json();

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message || "Sorry, I couldn't understand that. Could you try again?",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "I'm having a bit of trouble right now. Please try again in a moment.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickReplies = [
    "What services do you offer?",
    "I'd like to book a meeting",
    "Show me your portfolio",
    "Tell me about your team",
  ];

  const showQuickReplies = messages.length === 1; // Only show after welcome message

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              key="chat-button"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              onClick={() => setIsOpen(true)}
              id="chatbot-open-btn"
              className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#63ffb4] to-[#38c9ff] shadow-lg shadow-[#63ffb4]/25 flex items-center justify-center hover:scale-110 transition-transform duration-200"
              aria-label="Open chat assistant"
            >
              <MessageCircle className="w-6 h-6 text-[#020408]" strokeWidth={2.5} />

              {/* Pulse ring animation */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-[#63ffb4] to-[#38c9ff]"
                animate={{ scale: [1, 1.4, 1.4], opacity: [0.4, 0, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              />

              {/* Notification badge */}
              {hasNewMessage && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full flex items-center justify-center"
                >
                  <span className="text-[9px] text-white font-bold">1</span>
                </motion.div>
              )}
            </motion.button>
          )}
        </AnimatePresence>

        {/* Chat Window */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="chat-window"
              initial={{ opacity: 0, scale: 0.85, y: 30, transformOrigin: "bottom right" }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="w-[370px] h-[580px] max-h-[85vh] rounded-2xl overflow-hidden flex flex-col"
              style={{
                background: "linear-gradient(145deg, #0d1117 0%, #0a0f14 100%)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,255,180,0.08), 0 0 60px rgba(99,255,180,0.04)",
              }}
            >
              {/* Header */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.07] bg-white/[0.02]">
                {/* Bot avatar with animated glow */}
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#63ffb4] to-[#38c9ff] flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#020408]" strokeWidth={2.5} />
                  </div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#63ffb4] rounded-full border-2 border-[#0d1117]" />
                </div>

                <div className="flex-1">
                  <div className="font-semibold text-sm text-white/90">SSTech Agent</div>
                  <div className="text-[11px] text-[#63ffb4] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-[#63ffb4] rounded-full animate-pulse inline-block" />
                    Online • Typically replies instantly
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(false)}
                  id="chatbot-close-btn"
                  className="w-7 h-7 rounded-full bg-white/[0.06] hover:bg-white/[0.12] flex items-center justify-center transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-3.5 h-3.5 text-white/60" />
                </motion.button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {messages.map((msg) => (
                  <MessageBubble key={msg.id} message={msg} onType={scrollToBottom} />
                ))}

                {/* Quick replies */}
                {showQuickReplies && !isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="flex flex-wrap gap-2 mb-4"
                  >
                    {quickReplies.map((reply) => (
                      <button
                        key={reply}
                        onClick={async () => {
                          if (isLoading) return;
                          const userMsg: Message = {
                            id: Date.now().toString(),
                            role: "user",
                            content: reply,
                            timestamp: new Date(),
                          };
                          setMessages((prev) => [...prev, userMsg]);
                          setIsLoading(true);
                          try {
                            const history = [...messages, userMsg]
                              .filter((m) => m.id !== "welcome")
                              .map((m) => ({ role: m.role, content: m.content }));
                            const res = await fetch("/api/chat", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ messages: history }),
                            });
                            const data = await res.json();
                            setMessages((prev) => [...prev, {
                              id: (Date.now() + 1).toString(),
                              role: "assistant",
                              content: data.message || "Sorry, could you try again?",
                              timestamp: new Date(),
                            }]);
                          } catch {
                            setMessages((prev) => [...prev, {
                              id: (Date.now() + 1).toString(),
                              role: "assistant",
                              content: "I'm having a bit of trouble. Please try again.",
                              timestamp: new Date(),
                            }]);
                          } finally {
                            setIsLoading(false);
                          }
                        }}
                        className="text-[11px] px-3 py-1.5 rounded-full border border-[#63ffb4]/25 bg-[#63ffb4]/5 text-[#63ffb4] hover:bg-[#63ffb4]/15 hover:border-[#63ffb4]/50 transition-all duration-200"
                      >
                        {reply}
                      </button>
                    ))}
                  </motion.div>
                )}

                {isLoading && <TypingIndicator />}
                <div ref={endRef} />
              </div>

              {/* Input Area */}
              <div className="px-4 py-3 border-t border-white/[0.07] bg-white/[0.02]">
                <div className="flex items-center gap-2 bg-white/[0.05] border border-white/[0.09] rounded-xl px-3 py-2.5 focus-within:border-[#63ffb4]/40 transition-colors duration-200">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask me anything..."
                    id="chatbot-input"
                    disabled={isLoading}
                    className="flex-1 bg-transparent text-sm text-white/80 placeholder-white/25 outline-none disabled:opacity-50"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={sendMessage}
                    disabled={!input.trim() || isLoading}
                    id="chatbot-send-btn"
                    aria-label="Send message"
                    className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#63ffb4] to-[#38c9ff] flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
                  >
                    {isLoading ? (
                      <Loader2 className="w-3.5 h-3.5 text-[#020408] animate-spin" />
                    ) : (
                      <Send className="w-3.5 h-3.5 text-[#020408]" />
                    )}
                  </motion.button>
                </div>
                <p className="text-[10px] text-white/15 text-center mt-2">
                  Powered by Solution Squad AI
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
