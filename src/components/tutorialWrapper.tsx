// components/TutorialWrapper.tsx

import TutorialOverlay from './tutorialOverlay';

const TutorialWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ position: 'relative' }}>
      {children}
      <TutorialOverlay /> 
    </div>
  );
};

export default TutorialWrapper;
