// components/TutorialOverlay.tsx
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { nextStep, endTutorial } from '../store/tutorialSlice';
import { fetchUserProfile } from "../store/userSlice";
import { tutorialSteps } from '../tutorial/level0';
import "../components/styles/tutorialOverlay.css";

const TutorialOverlay = () => {
const { currentStep, dynamicBox } = useSelector((state: RootState) => state.tutorial);
const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const dispatch = useDispatch();
if (!userInfo) return null;

  const tutoriallevel = tutorialSteps(userInfo.nickname);
  const stepConfig = tutoriallevel.find(s => s.step === currentStep);
  if (!stepConfig) return null;

  const handleOverlayClick = () => {
    if (stepConfig.nextOnAnyClick) {
      advance();
    }
  };

  const advance = () => {
    if (currentStep >= tutoriallevel.length) {
      dispatch(endTutorial());
    } else {
      dispatch(nextStep());
    }
  };
  const box = stepConfig.box || dynamicBox;

return (
  <div
    style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      zIndex: 9999,
      pointerEvents: 'auto',
    }}
    onClick={handleOverlayClick}
  >
    {box && (
      <div
        style={{
          position: 'absolute',
          background: 'transparent',
          borderRadius: 8,
          boxShadow: '0 0 0 9999px rgba(0,0,0,0.8)',
          ...box,
        }}
        onClick={(e) => e.stopPropagation()}
      />
    )}

      {stepConfig.message && (
  <div
  className={`tutorial-message-box step-${currentStep}`}
  style={{
    top: '35%',
    left: '50%',
    transform: 'translate(-50%, -50%)', // 기본 위치
    ...stepConfig.messageContainerStyle, // 여기에 덮어쓰기 or override
  }}
>
  {stepConfig.message}
</div>
)}
    </div>
  );
};

export default TutorialOverlay;
