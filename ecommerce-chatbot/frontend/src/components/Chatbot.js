import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Chatbot() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chat_messages");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const username = "guest";

  useEffect(() => {
    localStorage.setItem("chat_messages", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const timestamp = new Date().toLocaleTimeString();
    const userMsg = { from: "user", text: input, timestamp };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await axios.post("http://localhost:5000/api/chat/", {
        message: input,
        username,
      });

      const botMsg = {
        from: "bot",
        text: res.data.response,
        products: res.data.products || [],
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const errorMsg = {
        from: "bot",
        text: "Sorry, something went wrong.",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    }

    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div style={styles.outer}>
      <div style={styles.container}>
        <h2 style={styles.header}>Sales Chatbot</h2>

        <div style={styles.chatBox}>
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                ...styles.message,
                alignSelf: m.from === "user" ? "flex-end" : "flex-start",
                backgroundColor: m.from === "user" ? "#dcf8c6" : "#f1f0f0",
              }}
            >
              <div>
                <b>{m.from === "user" ? "You" : "Bot"}</b>{" "}
                <span style={{ fontSize: "0.8em", color: "gray" }}>
                  {m.timestamp}
                </span>
              </div>
              <div>{m.text}</div>
              {m.products && m.products.length > 0 && (
                <ul style={{ marginTop: "5px" }}>
                  {m.products.map((p) => (
                    <li key={p.id}>
                      <button
                        onClick={() => setSelectedProduct(p)}
                        style={styles.productLink}
                      >
                        {p.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div style={styles.inputContainer}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            style={styles.input}
            placeholder="Ask me something..."
          />
          <button onClick={sendMessage} style={styles.button}>
            Send
          </button>
        </div>

        <button onClick={() => {
          setMessages([]);
          localStorage.removeItem("chat_messages");
        }} style={styles.resetButton}>
          Reset Chat
        </button>
      </div>

      {selectedProduct && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3>{selectedProduct.name}</h3>
            <p><b>Category:</b> {selectedProduct.category}</p>
            <p><b>Price:</b> ₹{selectedProduct.price}</p>
            <p><b>Description:</b> {selectedProduct.description}</p>
            <button
              onClick={() => setSelectedProduct(null)}
              style={styles.closeButton}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  outer: {
    minHeight: "100vh",
    padding: "40px 0",
    background: "linear-gradient(to bottom right, #008080, #000000)", // teal to black
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
    maxWidth: "600px",
    width: "90%",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    textAlign: "center",
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  },
  chatBox: {
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "10px",
    height: "400px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    backgroundColor: "#fdfdfd",
  },
  message: {
    padding: "10px 14px",
    borderRadius: "16px",
    maxWidth: "75%",
  },
  inputContainer: {
    marginTop: "12px",
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  resetButton: {
    marginTop: "15px",
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    width: "100%",
  },
  productLink: {
    background: "none",
    color: "#007bff",
    textDecoration: "underline",
    border: "none",
    cursor: "pointer",
    padding: 0,
    fontSize: "0.95em",
  },
  modal: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex", justifyContent: "center", alignItems: "center",
    zIndex: 10,
  },
  modalContent: {
    background: "#fff",
    padding: "25px",
    borderRadius: "10px",
    width: "90%",
    maxWidth: "400px",
    textAlign: "center",
  },
  closeButton: {
    marginTop: "15px",
    background: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};
