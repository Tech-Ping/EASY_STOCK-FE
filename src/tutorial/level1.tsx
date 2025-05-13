import { useEffect } from "react";
import "../components/styles/tutorialOverlay.css";
import { useSelector, useDispatch } from 'react-redux';
import { TutorialStepConfig } from "./common";

export const tutorial1Steps: TutorialStepConfig[] = [
  {
    step: 1,
    nextOnAnyClick: true,
    box: { top: 0, left: 0, width: 0, height: 0 },
    message: <p>레벨1 시작!</p>
  },
  // ...
];