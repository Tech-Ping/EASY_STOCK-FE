// TutorialEntryPage.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { startTutorial } from '../store/tutorialSlice';
import type { TutorialLevel } from '../store/tutorialSlice';

const TutorialEntryPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLevel = useSelector((state: RootState) => state.user.userInfo?.level);
  const completedLevels = useSelector((state: RootState) => state.tutorial.completedLevels);

  const tutorialStartRoutes: Record<TutorialLevel, string> = {
    ZERO: '/tutorial/home',
    ONE: '/tutorial/invest',
    TWO: '/tutorial/stocks/1',
  };

  useEffect(() => {
    if (!userLevel || !(userLevel in tutorialStartRoutes)) {
      navigate('/home');
      return;
    }

    const level = userLevel as TutorialLevel;

    if (completedLevels.includes(level)) {
      navigate('/home');
    } else {
      dispatch(startTutorial(level));
      navigate(tutorialStartRoutes[level]);
    }
  }, [userLevel, completedLevels, dispatch, navigate]);

  return null;
};

export default TutorialEntryPage;
