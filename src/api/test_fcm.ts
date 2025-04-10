import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL; // .env에 설정한 백엔드 도메인

// FCM 푸시 알림 테스트 API 호출 함수
export const sendTestPushNotification = async (fcmToken: string) => {
  try {
    const accessToken = localStorage.getItem("accessToken"); // 인증 토큰 가져오기 (예제)

    const response = await axios.post(
      `${API_BASE_URL}/api/notifications/test`,
      { fcmToken }, // Request Body
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // 인증 헤더
          "Content-Type": "application/json",
        },
      }
    );

    console.log("푸시 알림 테스트 성공:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("푸시 알림 테스트 실패:", error.response?.data || error.message);
    throw error;
  }
};
