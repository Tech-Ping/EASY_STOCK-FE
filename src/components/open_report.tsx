import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './styles/open_report.css';

interface UserProfile {
    nickname: string;
}

const Open_Report: React.FC = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState<UserProfile>(
        {
            nickname: "테크핑"
        }
    )
    const handleNavigation = () => {
        navigate('/report');  // '/report' 경로로 이동
    };
    return(
        <div className="open-report-container">
            <div className="contents">
                <div className="img">
                <div className="circle"></div>
                </div>
                <div className="text">
                    <h3 className="title">
                    이번 달의 투자 리포트
                    </h3>
                    <p className="description">
                        이번 달 {userData.nickname}님만의 투자 리포트가 도착했어요!<br />
                        지금 바로 확인해보세요.
                    </p>
                </div>
                

            </div>
            <p className="link" onClick={handleNavigation}>
                    확인하러 가기
                </p>
        </div>
    )
}
export default Open_Report;