import React, { useState } from "react";
import ChatInput from "./Chat_Input";
import ChatInput_stock from "./Chat_Input_stock";

const ChatType: React.FC<{
  selectedCategory: string;
  onSendMessage: (serverData: any, displayMessage: string) => void;
}> = ({ selectedCategory, onSendMessage }) => {
  // 상태 정의
  const [inputValue, setInputValue] = useState<string>("");

  // 입력값 업데이트 함수
  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  if (selectedCategory === "주식 질문") {
    return (
      <ChatInput_stock onSendMessage={onSendMessage} />
    );
  } else {
    return (
        <ChatInput
        onSendMessage={(prompt) => onSendMessage({ prompt }, prompt)} // "prompt"를 서버 데이터로 전달
        inputValue={inputValue} // 입력된 값을 전달
        setInputValue={handleInputChange} // 입력 상태 업데이트
      />
    );
  }
};

export default ChatType;
