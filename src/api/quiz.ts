import axios from "axios";
import axiosInstance from "./axiosInstance";

export const fetchQuizQuestion = async() => {
    try{
        const response = await axiosInstance.get( `${process.env.REACT_APP_API_URL}/api/quiz/problem-solve`);
        return response.data;
    }catch(error){
        console.error("퀴즈 문제 요청 실패: ", error);
        throw error;
    }
}

export const submitQuizAnswer = async (quizId: number, inputIndex: number) => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("토큰이 없습니다. 로그인 해주세요.");
  }
  const res =await axios.post(
    `${process.env.REACT_APP_API_URL}/api/quiz/${quizId}/submit`,
    { inputIndex },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        quizId: quizId, // ✅ URL에는 이미 있지만 서버가 "RequestParam"으로도 요구하면 이렇게 추가
      },
    }
  );
    return res.data;
};  