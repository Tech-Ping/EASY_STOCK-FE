import "../components/styles/tutorialOverlay.css";

export interface TutorialStepConfig {
  step: number;
  box?: { top: number; left: number; width: number; height: number }; // 뚫을 위치
  nextOnAnyClick?: boolean;  // true면 화면 아무데나 클릭 시 next
  waitForAction?: boolean;   // true면 버튼 클릭 시 nextStep() 호출해야 함
  message?: React.ReactNode; // 단계별 안내 메시지
  messageContainerStyle?: React.CSSProperties;
}

export const tutorialSteps = (nickname: string): TutorialStepConfig[] => [
  {
  step: 1,
  box: { top: 0, left: 0, width: 0, height: 0 },
  nextOnAnyClick: true,
  message: (
    <>
      <p><strong>안녕하세요!</strong></p>
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
    box: { top: 180, left: 60, width: 100, height: 40 },
    nextOnAnyClick: true, // 화면 아무데나 클릭하면 다음으로 넘어감
    message: '잘하셨어요! 다음 단계로 넘어갑니다.',
  },
  {
  step: 3,
  waitForAction: true,
  message: (
    <>
      <p>
        <span className="highlight">이지스톡</span>은 튜토리얼과 퀴즈로<br />
        <span className="highlight">경험치</span>를 얻으면서 주식 공부를 해요.
      </p>
      <p>우선 간단한 퀴즈 한 문제 풀어볼까요?<br />퀴즈 풀기 버튼을 눌러주세요.</p>
    </>
  ),
  messageContainerStyle: {
    top: '60%',
    left: '50%',
    transform: 'translate(-50%, -20%)',
    textAlign: 'center',
  }
},
{
    step: 4,
    box: { top: 180, left: 60, width: 100, height: 40 },
    nextOnAnyClick: true, // 화면 아무데나 클릭하면 다음으로 넘어감
    message: '잘하셨어요! 다음 단계로 넘어갑니다.',
  },
  {
    step: 5,
    nextOnAnyClick: true,
    message: '튜토리얼이 끝났어요!',
  },
  
];
