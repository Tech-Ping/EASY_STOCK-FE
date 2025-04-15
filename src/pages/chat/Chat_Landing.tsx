import React from "react";
import { useNavigate } from "react-router-dom";
import "./style/ChatLanding.css";
import { ChevronLeft } from "react-feather";
import chatting_landing from '../../images/chatting_landing-clear.png';
import stocki from '../../images/stocky-clear.png';

const ChatLanding: React.FC = () => {
  const navigate = useNavigate();

  const handleCategorySelect = (category: string) => {
    //console.log("Navigating to /stocki with category:", category);
    navigate("/stocki/chat", { state: { category } });
  };

  return (
    <div className="chat-landing-screen">
    <div className="chat-landing-container">
        <div className="chat-header">
        <button className="go-back" onClick={() => navigate(-1)}>
            <ChevronLeft size={24} />
          </button>
          <p className="chat-title">
          <img src={stocki}className="stocki" alt="stoki-icon"
           style={{
            width: "30px",
            marginBottom: "-7px",
            marginRight: "2px"
           }}/>
            스토기</p>
        </div>
        <div className ="landing-content">
           <h2>테크핑님, 반가워요!</h2> {/*나중에 사용자 id로 변경*/} 
           <div className="welcome-message">
                <h1> 저는 당신의 AI 주식비서</h1>
                <div className="inline-heading">
                    <h1 className="highlight-text">스토기</h1>
                    <h1 className ="no-margin">에요.</h1>
                </div>
            </div>
           <img src={chatting_landing} className="landing-image" alt="Stoki"
            style={{
                width: "400px",
                height: "auto",
                maxWidth: "100%", 
              }}/>
        </div>
        <div className="category-selection">
  <div className="category-texts">
    <div className="category-item">
      <p>모르는 주식</p> <p>용어가 있다면?</p>
      <button
        className="category-button"
        onClick={() => handleCategorySelect("일반 질문")}
      >
        일반 질문 시작
      </button>
    </div>
    <div className="category-item">
      <p>특정 회사의 주식</p> <p>정보가 궁금하다면?</p>
      <button
        className="category-button"
        onClick={() => handleCategorySelect("주식 질문")}
      >
        주식 질문 시작
      </button>
    </div>
  </div>
</div>
    </div>
    </div>
  );
};

export default ChatLanding;
