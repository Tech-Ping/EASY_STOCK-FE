import axios from "axios";


const token = localStorage.getItem("accessToken");
  
export const sendStockQuestion = async (data: {
    company_name: string;
    date: string;
    stock_field: string;
  }) => {
    try {
      
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/flask/stock-info`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          withCredentials: false // 대부분의 Bearer 인증 방식에서는 false
        }
      );
  
      return response.data.message;
    } catch (error: any) {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 404 && data.error) {
            return data.error;  // ← 에러 메시지를 그대로 응답
          }
        }
        return "요청 중 오류가 발생했습니다.";
      }
    };


export const sendGeneralQuestion = async (data: { prompt: string }) => {
    console.log("보내는 데이터:", data); // 여기에 prompt 제대로 들어갔는지 확인
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/flask/ask`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      return response.data.response;
    } catch (error: any) {
      console.error("에러 응답:", error.response?.data);
      throw new Error("요청 실패");
    }
  };
  
// errorHandler.ts
export const handleApiError = (status: number, errorMessage: string): string => {
    if (status === 400) {
      return `잘못된 요청: ${errorMessage}`;
    } else if (status === 404) {
      return `${errorMessage}`;
    } else if (status === 500) {
      return `서버 오류: ${errorMessage}`;
    }
    return "알 수 없는 오류가 발생했습니다.";
  };
  

