import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const TutorialEntryPage = () => {
  const navigate = useNavigate();
  const completedLevel = useSelector((state: RootState) => state.tutorial.completedLevel);

  // 튜토리얼 단계별 경로 매핑 (컴포넌트 내부)
  const tutorialRouteByLevel = {
    1: '/tutorial/home',
    2: '/tutorial/invest',
    3: '/tutorial/stocks/:stockId',
  } as const;

  useEffect(() => {
    const nextLevel = completedLevel + 1;
    const nextPath = tutorialRouteByLevel[nextLevel as keyof typeof tutorialRouteByLevel];

    if (nextPath) {
      navigate(nextPath);
    } else {
      alert('모든 튜토리얼을 완료했습니다.');
      navigate('/');
    }
  }, [navigate, completedLevel]);

  return null;
};

export default TutorialEntryPage;
