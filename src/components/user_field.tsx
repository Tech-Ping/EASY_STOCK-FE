import React, { useState } from "react";
import profile_img from "../images/user_img.png";
import Stoken from "./stocken";
import './styles/user_field.css';

interface UserProfile {
    nickname: string;
    level: string;
    tokenBudget: number;
    xpGuage: number;
}

const UserField: React.FC = () => {
    //API연결 전 더미데이터
    const [userData, setUserData] = useState<UserProfile> ({
        nickname:"테크핑",
        level: "ONE",
        tokenBudget: 3000,
        xpGuage: 150,
    });

    const levelMapping: { [key: string]: { display: string; level: number; minXP: number; maxXP: number } } = {
        ZERO: { display: "Lv. 0 주식 신생아", level: 0, minXP:0, maxXP:49 },
        ONE: { display: "Lv. 1 주린이", level: 1, minXP:50, maxXP:199 },
        TWO: { display: "Lv. 2 주식 초보자", level: 2, minXP:200, maxXP:600 },
        THREE: { display: "Lv. 3 주식 중급자", level: 3, minXP:601, maxXP:999 },
        FOUR: { display: "Lv. 4 주식 고수", level: 4, minXP:1000, maxXP:2000 },
        FIVE: { display: "Lv. 5 주식 마니아", level: 5, minXP:2001, maxXP:3499 },
        SIX: { display: "Lv. 6 주식 마스터", level: 6, minXP:3500, maxXP:Infinity },
    };

    const currentLevelObj = levelMapping[userData.level] || levelMapping.ZERO;
    const nextLevelObj = Object.values(levelMapping).find(lvl => lvl.level === currentLevelObj.level + 1);
    //레벨 정책 fix 필요
    const remainingXp = nextLevelObj ? nextLevelObj.minXP - userData.xpGuage : 0;
    const progressPercentage = ((userData.xpGuage - currentLevelObj.minXP) / (currentLevelObj.maxXP - currentLevelObj.minXP)) * 100;

    return(
        <div className="user-field-container">
            <div className="img-lv-name-stoken">
            <div className="profile-image container">
            {/*프로필 사진 어떻게 할지 논의 필요 -> 사진 배정으로 가정*/}
            <img src={profile_img}
                alt="profile image"
                className="profile-img"
                style={{
                    borderRadius:100,
                    width: 70,

                }}/>
            </div>
            <div className="lv-name-stoken">
                <h3 className="level-display">{levelMapping[userData.level].display}</h3>
                <div className="name-stoken">
                    <h2 className="nickname">{userData.nickname}</h2>
                    <Stoken stokenValue={3000}/>
                    </div>
                </div>
            </div>
            <div className="XP-gauge-container">
                <div className="levels">
                    <span>Lv. {currentLevelObj.level}</span>
                    {nextLevelObj && <span className="levels-next">Lv. {nextLevelObj.level}</span>}
                </div>
                <div className="XP-guage">
                    <div className="XP-bar"
                        style={{
                         width: `${progressPercentage}%`
                        }}>
                        <span className="xp-bar-text">{userData.xpGuage}XP</span>
                    </div>
                </div>
                {nextLevelObj && (
                <div className="xp-info-container">
                <p className="level-up-info">{nextLevelObj.display} (Lv.{nextLevelObj.level})</p>
                <p className="level-up-action">로 레벨업하기 위해서는, </p>
                <p className="xp-required">{remainingXp}XP의 경험치</p>
                <p className="level-up-remark">가 필요해요.</p>
                </div>
                )}
            </div>
        </div>
    );
};

export default UserField;