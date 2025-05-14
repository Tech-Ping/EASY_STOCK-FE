import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login_page';
import Signup from './pages/signup_page';
import NotificationPage from './pages/notif_page';
import Home from './pages/home';
import StockInv from './pages/invest_page';
import MyPage from './pages/mypage';
import Report from './pages/personal_report';
import StockDetails from './pages/stock_details';
import Quiz from './pages/quiz/quiz';
import QuizCorrect from './pages/quiz/quiz_result';
import ChatbotButton from './components/chatbotButton';
import ChatLanding from './pages/chat/Chat_Landing';
import ChatScreen from './pages/chat/Chat_Screen';
import { ChatProvider } from './pages/chat/Chat_Context';
import './api/fcm.ts';
import { listenToForegroundMessages, requestNotificationPermission } from './api/fcm';
import TutorialWrapper from './components/tutorialWrapper';
import Quiz_tutorial from './pages/quiz/tutorial_quiz';
import TutorialEntryPage from './pages/tutorialEntry';

const App: React.FC = () => {
  const [inAppMessage, setInAppMessage] = useState<{ title: string; body: string } | null>(null);

  useEffect(() => {
    requestNotificationPermission();

    listenToForegroundMessages((title, body) => {
      setInAppMessage({ title, body }); // 인앱 메시지 상태 저장
    });
  }, []);
  return (
     <>
      {/* 인앱 메시지 배너 */}
      {inAppMessage && (
        <div className="in-app-banner">
          <strong>{inAppMessage.title}</strong>
          <p>{inAppMessage.body}</p>
        </div>
      )}
      
    <ChatProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/notification" element={<NotificationPage />} />
        <Route path="/invest" element={<StockInv />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/report" element={<Report />} />
        <Route path="/stocks/:stockId" element={<StockDetails />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path ="quiz/result" element={<QuizCorrect />} />
        <Route path="/stocki" element={<ChatLanding />} />
        <Route
          path="/stocki/chat"
          element={
            
              <ChatScreen />
          }
        />
        
        <Route path = "/tutorial" element={<TutorialEntryPage />} />
        <Route path="/tutorial/home" element={
        <TutorialWrapper>
          <Home />
        </TutorialWrapper>
        } />
        <Route path="/tutorial/invest" element={
        <TutorialWrapper>
          <StockInv />
        </TutorialWrapper>
        } />
        <Route path="/tutorial/mypage" element={
        <TutorialWrapper>
          <MyPage />
        </TutorialWrapper>
        } />
        <Route path="/tutorial/quiz" element={
        <TutorialWrapper>
          <Quiz_tutorial />
        </TutorialWrapper>
        } />
        <Route path="/tutorial/stocki" element={
        <TutorialWrapper>
          <ChatLanding />
        </TutorialWrapper>
        } />
        <Route path="/tutorial/stocki/chat" element={
        <TutorialWrapper>
          <ChatScreen />
        </TutorialWrapper>
        } />
        <Route path="/tutorial/stocks/:stockId" element={
        <TutorialWrapper>
          <StockDetails />
        </TutorialWrapper>
        } />


      </Routes>
      <ChatbotButton/>
    </Router>
    </ChatProvider>
    </>
  );
};
/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/
export default App;
