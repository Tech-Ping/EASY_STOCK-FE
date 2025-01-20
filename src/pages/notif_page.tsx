import React, {useState} from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import '../style/notif_page.css';

const NotificationPage: React.FC = () => {
    const [activeButton, setActiveButton] = useState("unread");

    const handleClick = (buttonType: string) => {
        setActiveButton(buttonType);
      };

    return (
        <div className="notifications-page-container">
            <Header title="받은 알림" showPrevButton/>
            <main className="notification-container">
                <div className="notif-select-buttons">
                <button
                className={`notif-button ${activeButton === "unread" ? "active" : ""}`}
                onClick={() => handleClick("unread")}
      >
                        안읽은 알림
                </button>
                <button
                className={`notif-button ${activeButton === "all" ? "active" : ""}`}
                onClick={() => handleClick("all")}
                >     
                전체 알림
                </button>
                </div>
                <div className="notif-content">
                    {activeButton === "unread" && (
                        <div>
                            <p>안읽은 알림 내용</p> 
                        </div>
                    )}
                    {activeButton === "all" && (
                        <div>
                            <p>모든 알림 내용</p> 
                        </div>
                    )}
                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default NotificationPage;