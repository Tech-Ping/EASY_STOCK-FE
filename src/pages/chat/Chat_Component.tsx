import React, {useState, useRef, useEffect} from 'react';
import { classicNameResolver } from 'typescript';
import "./style/ChatComponents.css";


function Chat_Component({content, isUser}: any){//props로 받아올 데이터
  //name 상태 변수와 setname 함수 정의
  const [name, setname] = useState("");

  //isMe에 따라 이름 name설정
  useEffect(()=> {
    setname(isUser ? "사용자" : "스토기");
  }, [isUser]);

  return (
    <>
      {isUser ? (
        <div id="user" className="chat-wrapper user">
          <div className="chat-content">
            <div id="chatting" className="chatting user">
              <span dangerouslySetInnerHTML={{ __html: content }} /> {/* Render content with <br/> */}
            </div>
          </div>
        </div>
      ) : (
        <div id="bot" className="chat-wrapper bot">
          <div className="chat-content">
            <div id="chatting" className="chatting bot">
              <span dangerouslySetInnerHTML={{ __html: content }} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Chat_Component;