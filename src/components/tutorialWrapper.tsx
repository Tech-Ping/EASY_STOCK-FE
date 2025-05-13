// components/TutorialWrapper.tsx

import TutorialOverlay from './tutorialOverlay';

const TutorialWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ position: 'relative' }}>
      {children}
      <TutorialOverlay /> {/* 단계별 오버레이만 추가 */}
    </div>
  );
};

export default TutorialWrapper;
