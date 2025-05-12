import { useEffect } from "react";
import "../components/styles/tutorialOverlay.css";
import Step5Message from "./lev0_step5";
import { useSelector, useDispatch } from 'react-redux';
import Step11Message from "./lev0_step11";

export interface TutorialStepConfig {
  step: number;
  box?: { top: number; left: number; width: number; height: number }; // 뚫을 위치
  nextOnAnyClick?: boolean;  // true면 화면 아무데나 클릭 시 next
  waitForAction?: boolean;   // true면 버튼 클릭 시 nextStep() 호출해야 함
  message?: React.ReactNode; // 단계별 안내 메시지
  messageContainerStyle?: React.CSSProperties;
  navigateTo?: string;
  disableOverlay?: boolean;
}

export const tutorialSteps = (nickname: string): TutorialStepConfig[] => [
  {
  step: 1,
  box: { top: 0, left: 0, width: 0, height: 0 },
  nextOnAnyClick: true,
  message: (
    <>
      <p className="main-content">안녕하세요!</p>
      <p>
        <span className="highlight">이지스톡</span>의 여정을 찾아주신 <span className="highlight">{nickname}</span>님<br />
        만나 뵙게 되어서 정말 반가워요.
      </p>
    </>
  ),
  messageContainerStyle: {
    top: '55%',
    left: '55%',
  }
},
  {
  step: 2,
  waitForAction: true,
  navigateTo: '/tutorial/quiz',
  nextOnAnyClick: false,
  message: (
    <>
      <p className="main-content">
        <span className="highlight">이지스톡</span>은 튜토리얼과 퀴즈로<br />
        <span className="highlight">경험치</span>를 얻으면서 주식 공부를 해요.
      </p>
      <p>우선 간단한 퀴즈 한 문제 풀어볼까요?<br />퀴즈 풀기 버튼을 눌러주세요.</p>
    </>
  ),
  messageContainerStyle: {
    top: '60%',
    left: '50%',
    width: '80%'
  }
},
{
    step: 3,
    nextOnAnyClick: true, // 화면 아무데나 클릭하면 다음으로 넘어감
    message: (
    <>
      <p className="main-content">
        문제를 읽고,<br/> 차분하게 답을 생각해보세요.
      </p>
    </>
  ),
  messageContainerStyle: {
    top: '60%',
    left: '50%',
    width: '80%'
  }
  },
{
    step: 4,
    waitForAction: true,
    nextOnAnyClick: false, 
    message: (
    <>
      <p className="main-content">
        선지 중, <span className="highlight">정답이라는 생각</span>이 드는 답을 골라 보세요
      </p>
      <p>이번에는 정답을 알려드리지만,<br />실전에서 <span className="highlight-sub">기회는 총 2번</span> 주어져요!</p>
    </>
  ),
  messageContainerStyle: {
    top: '40%',
    left: '50%',
    width: '80%'
  }
  },
  {
  step: 5,
    nextOnAnyClick: true,
    navigateTo: '/tutorial/home',
    box: { top: 0, left: 0, width: 0, height: 0 },
    message: <Step5Message />,
    messageContainerStyle: {
    top: '50%',
    left: '50%',
    width: '80%'
  }
},
  {
  step: 6,
  waitForAction: true,
  navigateTo: '/tutorial/stocki',
  nextOnAnyClick: false,
  message: (
    <>
      <p className="main-content">많이 어려워도 걱정 마세요! <br/>
        <span className="highlight">우측 하단</span>에 항상 든든한 <span className="highlight">도우미 챗봇,</span><br />
        <span className="highlight">스토기</span>가 대기하고 있으니까요!
      </p>
      <p>한 번 스토기를 터치해서 불러볼까요?</p>
    </>
  ),
  messageContainerStyle: {
    top: '60%',
    left: '50%',
    width: '80%'
  }
},
{
  step: 7,
    nextOnAnyClick: true,
    message: (
    <>
      <p className="main-content">스토기에게 <span className="highlight">특정 회사의 주식 정보</span>나</p>
    </>
  ),
  messageContainerStyle: {
    top: '85%',
    left: '50%',
    width: '80%',
    textAlign: 'center',
  }
},
{
  step: 8,
    nextOnAnyClick: true,
    message: (
    <>
      <p className="main-content">주식 용어 등,<br/> 주식과 관련된 <span className="highlight">일반 질문</span>을 할 수 있어요!</p>
    </>
  ),
  messageContainerStyle: {
    top: '85%',
    left: '50%',
    width: '80%',
    textAlign: 'center',
  }
},
{
  step: 9,
  waitForAction: true,
    nextOnAnyClick: false,
    navigateTo: '/tutorial/stocki/chat',
    message: (
    <>
      <p className="main-content">버튼을 클릭해서 스토기와 <br/> 채팅을 시작해보세요!</p>
    </>
  ),
  messageContainerStyle: {
    top: '85%',
    left: '50%',
    width: '80%',
    textAlign: 'center',
  }
},
{
  step: 10,
    nextOnAnyClick: true,
    message: (
    <>
      <p className="main-content"><span className="highlight">주식 관련 무엇이든 질문</span>해보세요! </p>
      <p>스토기는 공신력 있는 정보를 기반으로<br/> 정확한 정보를 제공해줘요.</p>
    </>
  ),
  messageContainerStyle: {
    top: '70%',
    left: '50%',
    width: '80%',
  }
},
{
  step: 11,
  disableOverlay: true,
  nextOnAnyClick: false,
  waitForAction: true,
  box: {
    top: 0,
    left: 0,
    width: window.innerWidth,
    height: window.innerHeight
  },
  message: <Step11Message />,
  messageContainerStyle: {
    top: '10%',
    left: '80%',
    transform: 'translate(-50%, -50%)',
  }
},
{
  step: 12,
  nextOnAnyClick: true,
  message: (
    <>
      <p className="main-content"><span className="highlight">뉴스 탭</span>에서는 주식 관련 최신 정보를 담은 뉴스 목록을 볼 수 있어요. </p>
      <p>클릭하면 각 주식 뉴스 링크로 접속해요!</p>
    </>
  ),
  messageContainerStyle: {
    top: '30%',
    left: '50%',
    width: '80%',
  }
},
{
  step: 13,
  nextOnAnyClick: true,
  message: (
    <>
      <p className="main-content">어라, <span className="highlight">레벨 1로 올라가려면,</span>경험치 XP가 모자란 상황이네요. </p>
      <p>어서 경험치를 올려봐요!</p>
    </>
  ),
  messageContainerStyle: {
    top: '30%',
    left: '50%',
    width: '80%',
  }
},
{
  step: 14,
  nextOnAnyClick: true,
  navigateTo: '/home',
  message: (
    <>
      <p className="main-content"><span className="highlight">튜토리얼</span>을 통해 경험치를 올려볼까요? <br/> {nickname}님의 여정을 응원해요! </p>
    </>
  ),
  messageContainerStyle: {
    top: '45%',
    left: '50%',
    width: '80%',
  }
},
  
];
