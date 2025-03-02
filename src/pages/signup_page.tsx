import React, { useState } from 'react';
import {signUp } from "../api/auth";
import '../style/signup.css';

const Signup: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPasswordEnabled, setConfirmPasswordEnabled] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    nickname: '',
    birthdate: '',
    username: '',
    password: '',
    passwordCheck: '',
  });
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setConfirmPasswordEnabled(newPassword.length > 0);
    setFormData({ ...formData, password: newPassword });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    if(id == 'passwordCheck' && formData.password !== value ) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setConfirmPasswordError('');
    }
  };


  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const { nickname, birthdate, username, password, passwordCheck } = formData;

    // Validation check
    if (!nickname || !birthdate || !username || !password || !passwordCheck) {
      alert('모든 정보를 입력해 주세요.');
      return;
    }

    if (!isChecked) {
      alert('개인정보 처리 방침에 동의해 주세요.');
      return;
    }
    setIsLoading(true);

    try {
      const response = await signUp(formData);
      console.log("회원가입 성공:", response);
    } catch (error) {
      console.error("회원가입 오류:", error);
    } finally {
      setIsLoading(false);
    }

    // If all fields are filled
    alert('회원가입이 완료되었습니다!');
  };

  return (
    <div className="signup-container">
      <h1>이지스톡 회원가입</h1>
      <p>만나서 반가워요! <br /> 몇 가지 정보를 알려주세요.</p>
      <form className="signup-form" onSubmit={handleSubmit}>
        {/* Nickname */}
        <div className="input-group">
          <label htmlFor="nickname">
            닉네임 <span className="required">*</span>
          </label>
          <br />
          <input
            type="text"
            id="nickname"
            placeholder="사용할 닉네임을 입력하세요"
            className="input-field"
            value={formData.nickname}
            onChange={handleInputChange}
          />
        </div>

        {/* Birthdate */}
        <div className="input-group">
          <label htmlFor="birthdate">
            생년월일 <span className="required">*</span>
          </label>
          <br />
          <input
            type="date"
            id="birthdate"
            placeholder="생년월일을 입력하세요"
            className="input-field"
            value={formData.birthdate}
            onChange={handleInputChange}
          />
        </div>

        {/* Username */}
        <div className="input-group">
          <label htmlFor="username">
            아이디 <span className="required">*</span>
          </label>
          <br />
          <input
            type="text"
            id="username"
            placeholder="사용할 아이디를 입력하세요"
            className="input-field"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>

        {/* Password */}
        <div className="input-group">
          <label htmlFor="password">
            비밀번호 <span className="required">*</span>
          </label>
          <br />
          <input
            type="password"
            id="password"
            placeholder="비밀번호를 입력하세요"
            className="input-field"
            onChange={handlePasswordChange}
          />
        </div>

        {/* Confirm Password */}
        <div className="input-group">
          <input
            type="password"
            id="passwordCheck"
            className={`input-field ${!confirmPasswordEnabled ? 'disabled-field' : ''}`}
            placeholder="비밀번호를 확인해주세요"
            disabled={!confirmPasswordEnabled}
            value={formData.passwordCheck}
            onChange={handleInputChange}
            style={{
              marginTop: -10,
            }}
          />
          {confirmPasswordError && (
            <p className='error-message'>{confirmPasswordError}</p>
          )}
        </div>

        {/* Privacy Policy */}
        <div className="checkbox-group">
          <input
            type="checkbox"
            id="privacyPolicy"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="privacyPolicy">
            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
              개인정보 처리 방침
            </a>
            에 동의합니다.
          </label>
        </div>

        {/* Submit Button */}
        <button type="submit" className="signup-button">
          회원가입
        </button>
      </form>
    </div>
  );
};

export default Signup;
