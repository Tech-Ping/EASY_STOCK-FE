import React from 'react';

export interface TutorialStepConfig {
  step: number;
  box?: { top: number; left: number; width: number; height: number };
  nextOnAnyClick?: boolean;
  waitForAction?: boolean;
  message?: React.ReactNode;
  messageContainerStyle?: React.CSSProperties;
  navigateTo?: string;
  disableOverlay?: boolean;
}
