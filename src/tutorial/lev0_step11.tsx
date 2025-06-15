// components/tutorial/Step11Message.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { nextStep } from '../store/tutorialSlice';
import { useNavigate } from 'react-router-dom';

const Step11Message: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(nextStep());
    navigate('/tutorial/home'); // 원하는 경로로 수정 가능
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <button
        onClick={handleClick}
        className="tutorial-next-button"
        style={{
          padding: '12px 24px',
          fontSize: '12px',
          fontWeight: '500',
          background: 'rgba(0,0,0,0.6)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        다음
      </button>
    </div>
  );
};

export default Step11Message;
