import React, { useEffect, useRef, useState } from "react";
import "./style/ChatInput.css"
import { ArrowUp } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { setTutorialBox } from "../../store/tutorialSlice";

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

  const inputRef = useRef<HTMLDivElement>(null);
  const stockBtnRef = useRef<HTMLDivElement>(null);
  const { isTutorial, currentStep } = useSelector((state: RootState) => state.tutorial);
  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
  let targetRef: React.RefObject<HTMLDivElement> | null = null;

  if (isTutorial) {
    if (currentStep === 10) targetRef = inputRef;
  }

  if (targetRef?.current) {
    const rect = targetRef.current.getBoundingClientRect();
    const padding = 3;
    dispatch(setTutorialBox({
      top: rect.top,
      left: rect.left,
      width: rect.width - padding * 2,
      height: rect.height - padding * 2,
    }));
  }
}, [isTutorial, currentStep, dispatch]);

  return (
    <div className="chat-input-container" ref={inputRef}>
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
