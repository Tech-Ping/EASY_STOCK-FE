import axios from "axios";
import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from "./firebase";

export const listenToForegroundMessages = () => {
  onMessage(messaging, (payload) => {
    console.log('foreground message:', payload);

    const { title, body } = payload.notification ?? {};
    if (title && body) {
      new Notification(title, { body });
    }
  });
};

const API_BASE_URL = process.env.REACT_APP_API_URL; // .env에 설정한 백엔드 도메인


export const requestNotificationPermission = async (): Promise<string | null> => {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("알림 권한 거부됨");
      return null;
    }
    const token = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_FCM_VAPID_KEY,
    });

    if (!token) {
      console.warn("FCM 토큰 발급 실패");
      return null;
    }

    //console.log("FCM 토큰:", token);
    return token;
  } catch (err) {
    console.error( err);
    return null;
  }
};

export const saveFcmTokenToServer = async (token: string) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    const res = await fetch(`${API_BASE_URL}/api/my/fcm`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ fcmToken: token }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`서버 오류: ${err}`);
    }

    console.log("FCM 토큰 저장 완료");
  } catch (err) {
    console.error( err);
  }
};

export const deleteFcmToken = async (fcmToken: string) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    const response = await fetch(`${API_BASE_URL}/api/my/fcm`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ fcmToken }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("FCM 토큰 삭제 실패:", errorText);
      return false;
    }

    console.log("FCM 토큰 삭제");
    return true;
  } catch (error) {
    console.error("F CM 토큰 삭제 중 오류:", error);
    return false;
  }
};


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
