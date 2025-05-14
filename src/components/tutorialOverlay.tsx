// components/TutorialOverlay.tsx
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { nextStep, endTutorial } from '../store/tutorialSlice';
import { tutorial0Steps } from '../tutorial/level0';
import "../components/styles/tutorialOverlay.css";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { getTutorialSteps } from '../tutorial/tutorialSelector';
import { completeTutorial, requestLevelUp } from '../api/mypage';

const TutorialOverlay = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { currentStep, dynamicBox, currentTutorialLevel } = useSelector(
    (state: RootState) => state.tutorial
  );
  const userInfo = useSelector((state: RootState) => state.user.userInfo);



  useEffect(() => {
    if (
      currentStep === 11 &&
      !location.pathname.startsWith('/tutorial/stocki')
    ) {
      navigate('/tutorial/stocki');
    }
  }, [currentStep, location.pathname, navigate]);

  if (!userInfo || !currentTutorialLevel) return null;

  const tutorialSteps = getTutorialSteps(currentTutorialLevel, userInfo.nickname);
  const stepConfig = tutorialSteps.find((s) => s.step === currentStep);
  if (!stepConfig) return null;

    const box = stepConfig.box || dynamicBox;

  const handleOverlayClick = () => {
    if (stepConfig.nextOnAnyClick) {
      advance();
    }
  };

  const advance = async () => {
    if (stepConfig.navigateTo) {
      navigate(stepConfig.navigateTo);
    }

    const isLastStep = currentStep >= tutorialSteps.length;

    if (isLastStep) {
      try {
        const [completeRes, levelUpRes] = await Promise.all([
          completeTutorial(),
          requestLevelUp()
        ]);
        if (completeRes?.isSuccess) {
          alert(completeRes.result.message);
        }
        dispatch(endTutorial());
      } catch (err) {
        console.error("튜토리얼 완료 API 실패", err);
      }
    } else {
      dispatch(nextStep());
    }
  };

  if (stepConfig.disableOverlay) {
  return (
    <>
      {stepConfig.message && (
        <div
          className={`tutorial-message-box step-${currentStep}`}
          style={{
            pointerEvents: 'auto',
            top: '35%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            ...stepConfig.messageContainerStyle,
          }}
        >
          {stepConfig.message}
        </div>
      )}
    </>
  );
}

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
          position: 'fixed',
          background: 'transparent',
          borderRadius: 8,
          boxShadow: '0 0 0 9999px rgba(0,0,0,0.8)',
          pointerEvents: stepConfig.waitForAction ? 'auto' : 'none',
          ...box,
        }}
        onClick={(e) => {
      e.stopPropagation();
      console.log('box clicked!');
      if (stepConfig.navigateTo) {
    navigate(stepConfig.navigateTo);
  }
  dispatch(nextStep());
}}
        
      />
    )}

      {stepConfig.message && (
  <div
  className={`tutorial-message-box step-${currentStep}`}
  style={{
    pointerEvents: 'none',
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
