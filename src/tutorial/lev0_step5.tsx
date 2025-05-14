import React, { useEffect } from 'react';
import axios from 'axios';
import giftbox from "../images/tutorial_lv0present_img.png";

const Step5Message: React.FC = () => {
  useEffect(() => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    console.error("토큰이 없습니다. 로그인 해주세요.");
    return;
  }

  axios.post(`${process.env.REACT_APP_API_URL}/api/stoken`,{ stoken: 300 },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  )
      .then((res) => console.log('300 TOKEN 지급 완료'))
      .catch((err) => console.error('TOKEN 지급 실패', err));
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <img src={giftbox} alt="giftbox" style={{ width: 100, marginTop: 10 }} />
      <p className="main-content">정답이예요!<br />보상으로 300TOKEN을 드릴게요.</p>
    </div>
  );
};

export default Step5Message;
