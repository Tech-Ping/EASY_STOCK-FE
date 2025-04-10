// apiService.ts
import axios from "axios";

export const sendStockQuestion = async (data: {
  company_name: string;
  date: string;
  stock_field: string;
}) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/flask/stock-info`, data);
    //const response = await axios.post("http://127.0.0.1:5000/stock-info", data);
    
  return response.data.message;
};

export const sendGeneralQuestion = async (data: { prompt: string }): Promise<string> => {
    console.log("Sending data to server:", data); // 디버그 출력
    try {
       // const response = await axios.post("http://127.0.0.1:5000/ask", data);
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/flask/ask`, data);
      return response.data.response; // 서버 응답 반환
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;
        throw new Error(`Error ${status}: ${data.error || "Unknown error"}`);
      }
      throw new Error("네트워크 오류가 발생했습니다.");
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
  
  export {};
