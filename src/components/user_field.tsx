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
        level: "ZERO",
        tokenBudget: 3000,
        xpGuage: 150,
    });

    const levelMapping: { [key: string]: { display: string; number: number } } = {
        ZERO: { display: "Lv. 0 주식 신생아", number: 0 },
        ONE: { display: "Lv. 1 주린이", number: 1 },
        TWO: { display: "Lv. 2 주식 초보자", number: 2 },
        THREE: { display: "Lv. 3 주식 중급자", number: 3 },
        FOUR: { display: "Lv. 4 주식 고수", number: 4 },
        FIVE: { display: "Lv. 5 주식 마니아", number: 5 },
        SIX: { display: "Lv. 6 주식 마스터", number: 6 },
    };

    const currentLevel = levelMapping[userData.level].number;
    const nextLevel = currentLevel + 1;
    //레벨 정책 fix 필요
    const remainingXp = 400-userData.xpGuage;

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
                    <span>Lv. {currentLevel}</span>
                    <span className="levels-next">Lv. {nextLevel}</span>
                </div>
                <div className="XP-guage">
                    <div className="XP-bar"
                        style={{
                        width: `${userData.xpGuage/ 400 *100}%`
                        }}>
                        <span className="xp-bar-text">{userData.xpGuage}XP</span>
                    </div>
                </div>
                <div className="xp-info-container">
                    <p className="level-up-info">
                    {levelMapping[Object.keys(levelMapping).find
                    (key => levelMapping[key].number === currentLevel + 1) as string]?.display}
                    (Lv.{nextLevel})</p>
                <p className="level-up-action">로 레벨업하기 위해서는, </p>
                <p className="xp-required">{remainingXp}XP의 경험치</p>
                <p className="level-up-remark">가 필요해요.</p>
                </div>
            </div>
        </div>
    );
};

export default UserField;