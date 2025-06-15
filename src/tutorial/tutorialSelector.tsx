// tutorialSelector.ts

import { tutorial0Steps } from "./level0";
import { tutorial1Steps } from "./level1";
import { TutorialStepConfig } from './common';

export const getTutorialSteps = (
  level: string,
  nickname: string
): TutorialStepConfig[] => {
  switch (level) {
    case 'ZERO':
      return tutorial0Steps(nickname);
    case 'ONE':
      return tutorial1Steps;
    default:
      return [];
  }
};