// components/TutorialWrapper.tsx
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { startTutorial } from '../store/tutorialSlice';
import TutorialOverlay from './tutorialOverlay';

const TutorialWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startTutorial(1)); // 시작은 항상 1단계로 초기화
  }, [dispatch]);

  return (
    <div style={{ position: 'relative' }}>
      {children}
      <TutorialOverlay /> {/* 단계별 오버레이 추가 */}
    </div>
  );
};

export default TutorialWrapper;
