import React, { useState } from 'react';
import { login } from '../api/auth';
import '../style/login.css';
import { useNavigate } from 'react-router-dom';
import stocki from '../images/stocky-clear.png';
import { requestNotificationPermission, saveFcmTokenToServer } from '../api/fcm';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async(e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Reset error message

    if (!username) {
      alert('아이디를 입력해주세요.');
      return;
    }

    if (!password) {
      alert('비밀번호를 입력해주세요.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await login({ username, password });

      if (response.isSuccess) {
        // 토큰 저장
        localStorage.setItem("accessToken", response.result.tokenResponse.accessToken);
        localStorage.setItem("refreshToken", response.result.tokenResponse.refreshToken);

        const fcmToken = await requestNotificationPermission();
        if (fcmToken) {
          await saveFcmTokenToServer(fcmToken); // 이때 accessToken 존재!
        }

        // 로그인 후 페이지 이동
        navigate("/home");
      } else {
        alert("아이디나 비밀번호가 옳지 않습니다.");
      }
    } catch (error) {
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <img
        src={stocki}
        className="stocki"
        alt="stoki-icon"
        style={{
          width: 210,
          marginTop: -90,
          marginBottom: -10,
        }}
      />
      <h1>
        이지스톡에 오신 것을
        <br /> 환영합니다!
      </h1>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="아이디를 입력하세요"
          className="input-field"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호를 입력하세요"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="login-button">
          로그인
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <p className="forgot-password">비밀번호를 잊어버렸다면?</p>
      <button className="signup-button" onClick={() => navigate('/signup')}>
        이지스톡 회원가입
      </button>
    </div>
  );
};

export default Login;

