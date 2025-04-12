import React, { useEffect, useRef, useState } from "react";
import Chat_Component from "./Chat_Component";
import ChatType from "./Chat_type";
import "./style/ChatScreen.css";
import { ChevronLeft } from "react-feather";
import { useNavigate, useLocation } from "react-router-dom";
import stocki from '../../images/stocky-clear.png';
import { useChat } from "./Chat_Context";
import { handleApiError, sendGeneralQuestion, sendStockQuestion } from "../../api/chatbot";

const ChatScreen: React.FC = () => {
  const { chat, addMessage } = useChat();
  const navigate = useNavigate();
  const location = useLocation();


  const selectedCategory = location.state?.category || "";

  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  //
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  const handleSendMessage = async (serverData: any, displayMessage: string) => {
    addMessage({ id: chat.length + 1, content: displayMessage, isUser: true });

    try {
      const botMessage =
        selectedCategory === "주식 질문"
          ? await sendStockQuestion(serverData)
          : await sendGeneralQuestion({ prompt: serverData.prompt }); // "기타 질문" 처리

      addMessage({ id: chat.length + 2, content: botMessage, isUser: false });
    } catch (error: any) {
      const errorMessage = error.response
        ? handleApiError(error.response.status, error.response.data.error)
        : "네트워크 오류가 발생했습니다. 다시 시도해주세요.";

      addMessage({ id: chat.length + 2, content: errorMessage, isUser: false });
    }
  };

  return (
    <div className="chat-screen">
      <div className="chat-container">
        <div className="chat-header">
          <button className="go-back" onClick={() => navigate(-1)}>
            <ChevronLeft size={24} />
          </button>
          <p className="chat-title">
            <img
              src={stocki}
              className="stocki"
              alt="stoki-icon"
              style={{
                width: "30px",
                marginBottom: "-7px",
                marginRight: "2px",
              }}
            />
            스토기
          </p>
        </div>
        <div className="chat-comp">
          <div className="chat-messages" ref={chatContainerRef}>
            {chat.map((item) => (
              <Chat_Component key={item.id} content={item.content} isUser={item.isUser} />
            ))}
          </div>
        </div>
        <ChatType
          selectedCategory={selectedCategory}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default ChatScreen;