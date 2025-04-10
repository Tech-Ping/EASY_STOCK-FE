import React, { useState } from "react";
import "./style/ChatInput.css"
import { ArrowUp } from "react-feather";

interface ChatInputProps {
  onSendMessage: (prompt: string) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  inputValue,
  setInputValue,
}) => {
  const handleSend = () => {
    if (inputValue.trim() !== "") {
      onSendMessage(inputValue); // 입력값 전달
      setInputValue(""); // 입력 필드 초기화
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // 기본 동작(줄바꿈) 방지
      handleSend(); // 메시지 전송
    }
  };

  return (
    <div className="chat-input-container">
      <textarea
        className="chat-input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="스토기에게 무엇이든 물어보세요!"
      />
      <button className="send-button" onClick={handleSend}>
        <ArrowUp size={24}/>
      </button>
    </div>
  );
};

export default ChatInput;
