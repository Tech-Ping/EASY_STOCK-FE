import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/chatbotButton.css"; // 새로운 스타일 추가

const ChatbotButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button className="chatbot-move-button" onClick={() => navigate("/chat")}>
      스토기
    </button>
  );
};

export default ChatbotButton;
