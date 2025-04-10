import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles/chatbotButton.css"; // 새로운 스타일 추가

const ChatbotButton: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  if(location.pathname.startsWith("/stocki") || location.pathname === "/"){
    return null;
  }

  return (
    <button className="chatbot-move-button" onClick={() => navigate("/stocki")}>
      스토기
    </button>
  );
};

export default ChatbotButton;
