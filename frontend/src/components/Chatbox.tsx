import { useState } from "react";
import axios from "axios";
import Button from "./ui/Button";
import { API_BASE } from "../api";
type Message = {
  sender: "user" | "ai";
  text: string;
};

function Chatbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user" as const, text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE}/ai/generate`,
        { prompt: input }
      )

      const data = res.data;

      const aiMsg = {
        sender: "ai" as const,
        text: `Crust: ${data.crust}\n
                Sauce: ${data.sauce}\n
                Cheese: ${data.cheese.join(", ")}\n
                Toppings: ${data.toppings.join(", ")}`,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Try again." },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
    <Button onClick={() => setIsOpen(!isOpen)} >
      ASK AI
    </Button>
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-[500px] h-[400px] bg-[#E5CA95] border-2 border-[#66422A] flex flex-col">
          <div className="p-2 text-center border-b-[2px] border-[#66422A]">
            PIZZA ASSISTANT
          </div>

          <div className="flex-1 p-2 overflow-y-auto text-[10px] space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 border whitespace-pre-line 
                ${msg.sender === "user"
                  ? "bg-[#423C3C] text-white text-right"
                  : "bg-[#f5e6cc]"}`}>
                {msg.text}
              </div>
            ))}

            {loading && <div className="text-xs">Loading...</div>}
          </div>

          <div className="flex border-t-[2px] border-[#66422A]">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 p-2 outline-none bg-[#f5e6cc]"
              placeholder="Describe your pizza..."/>
            <button
              onClick={sendMessage}
              className="px-3 bg-[#423C3C] text-amber-50">
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbox;