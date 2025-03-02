import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL; // .env에 설정한 백엔드 도메인

// 회원가입 API 요청 함수
export const signUp = async (formData: {
  nickname: string;
  birthdate: string;
  username: string;
  password: string;
  passwordCheck: string;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/join`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("authentication successful:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("authentication failed:", error.response?.data || error.message);
    throw error;
  }
};

export const login = async (formData: { username: string; password: string }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      console.log("login successful:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("login failed:", error.response?.data || error.message);
      throw error;
    }
  };