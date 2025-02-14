import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles/header.css';

interface HeaderProps {
  title: React.ReactNode;
  showPrevButton?: boolean;
  backgroundColor?: string;
}

const Header: React.FC<HeaderProps> = ({ title, showPrevButton = false, backgroundColor }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/';
  const isMyPage = location.pathname === '/mypage';

  return (
    <header className="header-container"
    style={{
      backgroundColor: backgroundColor || '#FFFFF', // Default color if no custom color provided
    }}>
      {showPrevButton && (
        <span
          className="material-symbols-outlined"
          onClick={() => navigate(-1)} // Navigate to the previous page
        >
          arrow_back_ios
        </span>
      )}
      <h1 className='header-title'>{title}</h1>
        {(isHome || isMyPage )&& (
          <button
            className={`notif-button`}
            onClick={() => navigate('/notification')}
            style={{
              color: "#2A2738",
              opacity: isMyPage ? 0.51 : 1,
            }}  
          >
        <svg 
          width="19" 
          height="24" 
          viewBox="0 0 19 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg">
        <path d="M9.5 24C10.8062 24 11.875 22.8923 11.875 21.5385H7.125C7.125 22.8923 8.19375 24 9.5 24ZM16.625 16.6154V10.4615C16.625 6.68308 14.6894 3.52 11.2812 2.68308V1.84615C11.2812 0.824615 10.4856 0 9.5 0C8.51437 0 7.71875 0.824615 7.71875 1.84615V2.68308C4.3225 3.52 2.375 6.67077 2.375 10.4615V16.6154L0 19.0769V20.3077H19V19.0769L16.625 16.6154ZM14.25 17.8462H4.75V10.4615C4.75 7.40923 6.54313 4.92308 9.5 4.92308C12.4569 4.92308 14.25 7.40923 14.25 10.4615V17.8462Z" fill="#2A2738"/>
        </svg>
      </button>
      )} 
    </header>
  );
};

export default Header;
