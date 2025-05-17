import { useEffect } from "react";
import "../components/styles/tutorialOverlay.css";
import { useSelector, useDispatch } from 'react-redux';
import { TutorialStepConfig } from "./common";

export const tutorial1Steps: TutorialStepConfig[] = [
  {
    step: 1,
    nextOnAnyClick: true,
    box: { top: 0, left: 0, width: 0, height: 0 },
    message: (
    <>
      <p>
        <span className="highlight">보유주식</span> 탭에서는 <br/> 보유한 주식의 정보를 확인할 수 있어요. 
      </p>
    </>
  ),
  messageContainerStyle: {
    top: '55%',
    left: '55%',
  }
  },
  {
    step: 2,
    nextOnAnyClick: true,
    box: { top: 0, left: 0, width: 0, height: 0 },
    message: (
    <>
      <p>
        <span className="highlight">수량</span>은 보유한 주식의 개수이고 <br/> 
        <span className="highlight">평가금액</span>은 현재 주가에 수량을 곱한 금액이에요. <br/>
        평가 금액은<span className="highlight">내가 가진 주식 자산의 가치</span>를 나타내요.<br/>
        현재 주가는 계속 변하기 때문에 평가금애고 함꼐 변하겠죠?
      </p>
    </>
  ),
  messageContainerStyle: {
    top: '55%',
    left: '55%',
  }
  },
  {
    step: 3,
    nextOnAnyClick: true,
    box: { top: 0, left: 0, width: 0, height: 0 },
    message: (
    <>
      <p>
        위의 값이 매입가, 아래의 값이 현재가에요. <br/>
        <span className="highlight">매입가</span>는 해당 주식을 <span className="highlight">1주</span> 구매할 때의 가격이고,
        <span className="highlight">현재가</span>는 현재 시장에서 <span className="highlight">1주당</span> 거래되는 가격이예요. <br/>  
      </p>
    </>
  ),
  messageContainerStyle: {
    top: '55%',
    left: '55%',
  }
  }
];