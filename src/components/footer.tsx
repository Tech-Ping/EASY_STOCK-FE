import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { GoHomeFill } from 'react-icons/go'; // React Icons
import './styles/footer.css'; // Ensure your styles are properly imported

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if the current path matches the button path
  const isActive = (path: string) => location.pathname === path;

  return (
    <footer className="footer-container">
      {/* Home Button */}
      <button
        className={`footer-button ${isActive('/') || isActive('/notification') ? 'active' : ''}`}
        onClick={() => navigate('/')}>
        <GoHomeFill className="icon" />
      </button>

      {/* Stock Button */}
      <button
        className={`footer-button ${isActive('/invest')|| isActive('/stocks/:stockName') ? 'active' : ''}`}
        onClick={() => navigate('/invest')}
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`icon ${isActive('/services') ? 'active' : ''}`}
        >
          <path
            d="M11.7611 15.4083L13.6389 17.2861C13.9037 17.5509 14.2407 17.6833 14.65 17.6833C15.0593 17.6833 15.3963 17.5509 15.6611 17.2861L19.7778 13.1694V14.0361C19.7778 14.4454 19.9164 14.7824 20.1938 15.0472C20.4701 15.312 20.813 15.4444 21.2222 15.4444C21.6315 15.4444 21.9743 15.3058 22.2507 15.0284C22.528 14.7521 22.6667 14.4093 22.6667 14V9.66667C22.6667 9.25741 22.528 8.91411 22.2507 8.63678C21.9743 8.36041 21.6315 8.22222 21.2222 8.22222H16.8528C16.4435 8.22222 16.1065 8.36041 15.8417 8.63678C15.5769 8.91411 15.4444 9.25741 15.4444 9.66667C15.4444 10.0759 15.5831 10.4187 15.8604 10.6951C16.1368 10.9724 16.4796 11.1111 16.8889 11.1111H17.7194L14.65 14.2167L12.7722 12.3389C12.5074 12.05 12.1704 11.9056 11.7611 11.9056C11.3519 11.9056 11.0148 12.05 10.75 12.3389L6.34444 16.7444C6.05556 17.0093 5.91111 17.3463 5.91111 17.7556C5.91111 18.1648 6.05556 18.5019 6.34444 18.7667C6.60926 19.0556 6.9463 19.2 7.35556 19.2C7.76481 19.2 8.10185 19.0556 8.36667 18.7667L11.7611 15.4083ZM3.88889 27C3.09444 27 2.41411 26.7174 1.84789 26.1521C1.28263 25.5859 1 24.9056 1 24.1111V3.88889C1 3.09444 1.28263 2.41411 1.84789 1.84789C2.41411 1.28263 3.09444 1 3.88889 1H24.1111C24.9056 1 25.5859 1.28263 26.1521 1.84789C26.7174 2.41411 27 3.09444 27 3.88889V24.1111C27 24.9056 26.7174 25.5859 26.1521 26.1521C25.5859 26.7174 24.9056 27 24.1111 27H3.88889Z"
            fill="currentColor"
            strokeWidth="0.2"
          />
        </svg>
      </button>

      {/* Profile Button */}
      <button
        className={`footer-button ${isActive('/mypage') ? 'active' : ''}`}
        onClick={() => navigate('/mypage')}
      >
        <span className="material-symbols-outlined">person</span>
      </button>
    </footer>
  );
};

export default Footer;
