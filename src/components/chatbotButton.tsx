import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { setTutorialBox } from "../store/tutorialSlice";
import "./styles/chatbotButton.css"; // 새로운 스타일 추가
import chatbuttonImage from "../images/chat-button-clear.png";

const ChatbotButton: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const { isTutorial, currentStep } = useSelector((state: RootState) => state.tutorial);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isTutorial && currentStep === 6 && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const padding = 15;
      dispatch(setTutorialBox({
        top: rect.top - padding,
        left: rect.left - padding,
        width: rect.width + padding * 2,
        height: rect.height + padding * 2,
      }));
    }
  }, [isTutorial, currentStep, dispatch]);

  if(location.pathname.startsWith("/stocki") || location.pathname === "/" || location.pathname === "/signup"
      || location.pathname.startsWith ("/tutorial/stocki")){
    return null;
  }

  return (
    <button className="chatbot-move-button" onClick={() => navigate("/stocki")} ref={btnRef}>
      <img src={chatbuttonImage} alt="chatbot button" className="chatbot-icon" />
    </button>
  );
};

export default ChatbotButton;
