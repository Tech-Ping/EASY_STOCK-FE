import axios from "axios";
import axiosInstance from "./axiosInstance";

const API_BASE_URL = process.env.REACT_APP_API_URL; 

// 회원가입 API 요청 함수
export const signUp = async (formData: {
  nickname: string;
  birthDate: string;
  username: string;
  password: string;
  passwordCheck: string;
  isAgreed : boolean;
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
  
      //console.log("login successful:", response.data);
      console.log("login successful");
    const accessToken = response.data.result.accessToken;
    localStorage.setItem("accessToken", accessToken);
    return response.data;
  } catch (error: any) {
    console.error("login failed:", error.response?.data || error.message);
    throw error;
  }
};

  export const getUserProfile = async () => {
    const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/my/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,  // 토큰 필요 시
      },
    });
    return response.data;
  };

  export const registerFcmToken = async (fcmToken: string) => {
    return await axiosInstance.post("/api/my/fcm", { fcmToken });
  };